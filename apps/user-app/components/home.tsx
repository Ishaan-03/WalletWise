'use client'

import Image from 'next/image'
import { signIn, signOut } from 'next-auth/react'
import { User } from 'next-auth'

interface DashboardProps {
  user: User | null | undefined
}

export default function Dashboard({ user }: DashboardProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="sticky top-0 z-50 bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">WalletWise</div>
          <div className="space-x-4">
            {user ? (
              <>
                <span className="text-gray-600">Welcome, {user.name}!</span>
                <button
                  onClick={() => signOut()}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => signIn()}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Log in
                </button>
                <button
                  onClick={() => signIn('merchant')}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Merchant Login
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="container mx-auto px-4 py-12 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                Fast, Secure, and Smart Payments
              </h1>
              <p className="text-xl text-gray-600">
                WalletWise helps you send, receive, and manage your payments with ease. Join millions of users today.
              </p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold px-8 py-3 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
                Get WalletWise
              </button>
            </div>
            <div className="space-y-6">
              <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out">
                <Image
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Happy group of friends"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4 transform hover:scale-105 transition duration-300 ease-in-out">
                <Image
                  src="https://images.unsplash.com/photo-1534614971-6be99a7a3ffd?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="User profile"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-lg font-semibold text-gray-800">You paid Ishaan</p>
                  <p className="text-sm text-gray-500">for Coffee ☕</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Choose WalletWise?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Fast Transactions', description: 'Send and receive money in seconds.' },
                { title: 'Secure Payments', description: 'Bank-level encryption for all transactions.' },
                { title: 'Smart Management', description: 'Easily track and manage your finances.' },
              ].map((feature, index) => (
                <div key={index} className="bg-blue-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 WalletWise. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            <a href="#" className="hover:text-blue-400 transition duration-300">Terms</a>
            <a href="#" className="hover:text-blue-400 transition duration-300">Privacy</a>
            <a href="#" className="hover:text-blue-400 transition duration-300">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}