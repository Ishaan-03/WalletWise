import { getServerSession } from "next-auth/next";
import { authOptions } from "./lib/auth";
import Dashboard from "../components/home";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return <Dashboard user={session?.user ?? null} />;
}