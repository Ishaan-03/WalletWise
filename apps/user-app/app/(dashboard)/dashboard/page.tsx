export default function Home() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <header>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to WalletWise</h1>
        <p className="text-xl text-gray-600 mb-8">Your trusted partner for simple, secure, and fast payments.</p>
      </header>

      <main>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">About Our Service</h2>
          <p className="text-gray-600 mb-4">
            WalletWise is a cutting-edge payment platform designed to simplify your financial transactions. 
            Whether you're a business owner or an individual, our service provides a seamless experience 
            for sending and receiving money.
          </p>
          <p className="text-gray-600 mb-4">
            With state-of-the-art security measures and lightning-fast processing times, WalletWise ensures 
            that your money is always safe and your transactions are completed swiftly.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Instant transfers between WalletWise accounts</li>
            <li>Secure international money transfers</li>
            <li>Low fees and competitive exchange rates</li>
            <li>User-friendly mobile app for on-the-go payments</li>
            <li>Integration with major e-commerce platforms</li>
            <li>24/7 customer support</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose WalletWise?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Security", description: "Bank-grade encryption and fraud protection measures." },
              { title: "Convenience", description: "Send money with just a few clicks or taps." },
              { title: "Global Reach", description: "Transfer money to over 200 countries worldwide." },
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}