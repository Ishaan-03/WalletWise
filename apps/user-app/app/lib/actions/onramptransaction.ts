"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function onrampTnxn(amount: number, provider: string) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
        throw new Error("User not logged in, please login");
    }

    const userId = Number(session.user.id);
    const token = Math.random().toString(); 

    

    await prisma.onRampTransaction.create({
        data: {
            userId: userId,  
            amount: amount * 100, 
            status: "Processing",
            startTime: new Date(),
            provider: provider,
            token: token,
        },
    });

    return {
        message: "On-ramp transaction added",
    };
}
