import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions, Session, User } from "next-auth";
import bcrypt from "bcrypt";
import { z } from "zod";

const CredentialsSchema = z.object({
    phone: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number too long"),
    password: z.string().min(6, "Password must be at least 6 characters")
});

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                phone: { label: "Phone number", type: "text", placeholder: "1231231231", required: true },
                password: { label: "Password", type: "password", required: true }
            },
            async authorize(credentials) {
                if (!credentials) return null;

                const parsedCredentials = CredentialsSchema.safeParse(credentials);

                if (!parsedCredentials.success) {
                    throw new Error("Invalid credentials format");
                }

                const { phone, password } = parsedCredentials.data;

                const existingUser = await db.user.findFirst({
                    where: {
                        number: phone
                    }
                });

                if (existingUser) {
                    const passwordValidation = await bcrypt.compare(password, existingUser.password);
                    if (passwordValidation) {
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.number 
                        };
                    }
                    return null;
                }

               
                const hashedPassword = await bcrypt.hash(password, 10);

                try {
                    const newUser = await db.user.create({
                        data: {
                            number: phone,
                            password: hashedPassword
                        }
                    });

                    return {
                        id: newUser.id.toString(),
                        name: newUser.name,
                        email: newUser.number
                    };
                } catch (e) {
                    console.error(e);
                    return null;
                }
            },
        }),
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async session({ token, session }: { token: any; session: Session }) {
            if (session?.user) {
                session.user.id = token.sub ;
            }
            return session;
        },
        async jwt({ token, user }: { token: any; user?: User }) {
            if (user) {
                token.sub = user.id;
            }
            return token;
        }
    }
};
