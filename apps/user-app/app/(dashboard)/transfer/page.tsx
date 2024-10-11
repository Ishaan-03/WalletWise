import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { AddMoney } from "../../../components/AddMoneyCard";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return <div>Please log in to view your balance and transactions.</div>;
  }

  const userId = Number(session.user.id);

  const balance = await prisma.balance.findUnique({
    where: { userId: userId },
  });

  const transactions = await prisma.onRampTransaction.findMany({
    where: { userId: userId },
    orderBy: { startTime: 'desc' },
    take: 10, // Limit to the 10 most recent transactions
  });

  return (
    <div className="container mx-auto p-4">
      <div className="my-4">
        <AddMoney />
      </div>
     
    </div>
  );
}