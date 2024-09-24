"use client"

import Head from 'next/head';
import { signIn, signOut } from 'next-auth/react';

const Dashboard = ({ user }: { user: any }) => {
  return (
    <>
      <Head>
        <title>WalletWise - Fast & Secure Payments</title>
        <meta name="description" content="Send and receive payments quickly with WalletWise" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-white shadow-md">
        <div className="text-2xl font-bold text-blue-600">WalletWise</div>
        <div className="space-x-4">
          {user ? (
            <>
              <span className="text-gray-600">Welcome, {user.name}!</span>
              <button
                onClick={() => signOut()}
                className="bg-red-600 text-white px-4 py-2 rounded-full"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => signIn()}
                className="text-blue-600 hover:underline"
              >
                Log in
              </button>
              <button
                onClick={() => signIn('merchant')}
                className="bg-blue-600 text-white px-4 py-2 rounded-full"
              >
                Merchant Login
              </button>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col md:flex-row justify-between items-center bg-blue-50 p-10">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold text-black mb-4">
            Fast, Secure, and Smart Payments
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            WalletWise helps you send, receive, and manage your payments with ease. Join millions of users today.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700">
            Get WalletWise
          </button>
        </div>

        <div className="mt-10 md:mt-0">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Happy group of friends"
            className="rounded-lg shadow-lg"
          />
          <div className="mt-4 p-4 bg-white rounded-lg shadow-md flex items-center space-x-4">
            <img
              src="https://images.unsplash.com/photo-1534614971-6be99a7a3ffd?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="User profile"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="text-lg font-medium">You paid Ishaan</p>
              <p className="text-sm text-gray-500">for Coffee ☕</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center p-6 mt-10">
        <p className="text-gray-600">&copy; 2024 WalletWise. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Dashboard;
