import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { Suspense } from "react";

async function getBalanceAndTransactions(userId: number) {
  const balance = await prisma.balance.findUnique({
    where: { userId: userId },
  });

  const transactions = await prisma.onRampTransaction.findMany({
    where: { userId: userId },
    orderBy: { startTime: 'desc' },
    take: 20, 
  });

  return { balance, transactions };
}

function LoadingState() {
  return <div className="text-center py-8">Loading...</div>;
}

function ErrorState({ error }: { error: string }) {
  return <div className="text-center py-8 text-red-500">{error}</div>;
}

export default async function TransactionsPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return <ErrorState error="Please log in to view your transactions." />;
  }

  const userId = Number(session.user.id);

  try {
    const { balance, transactions } = await getBalanceAndTransactions(userId);

    return (
      <div className="container mx-auto p-4 space-y-6">
        <h1 className="text-2xl font-bold text-center mb-6">Your Transactions</h1>
        
        <Suspense fallback={<LoadingState />}>
          <BalanceCard 
            amount={balance?.amount || 0} 
            locked={balance?.locked || 0} 
          />
        </Suspense>

        <Suspense fallback={<LoadingState />}>
          <OnRampTransactions 
            transactions={transactions.map(t => ({
              time: t.startTime,
              amount: t.amount,
              status: t.status,
              provider: t.provider
            }))} 
          />
        </Suspense>

        {transactions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No transactions found. Start by adding money to your account!
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error fetching balance and transactions:", error);
    return <ErrorState error="Failed to load transactions. Please try again later." />;
  }
}