import Link from 'next/link'

export default function Home() {
  return (
    <div className="bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Build on <span className="gradient-text">Suprana</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              High-performance blockchain with ~400ms block times and 10 billion SUP native tokens
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://github.com/Suprana-Labs/suprana/tree/main/docs"
                target="_blank"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition"
              >
                Get Started
              </Link>
              <Link
                href="/whitepaper"
                className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition"
              >
                Read Whitepaper
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text">~400ms</div>
              <div className="text-gray-400 mt-2">Block Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text">10B</div>
              <div className="text-gray-400 mt-2">Total Supply</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text">PoH + PoS</div>
              <div className="text-gray-400 mt-2">Consensus</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text">9</div>
              <div className="text-gray-400 mt-2">Decimals</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">
            Why Choose <span className="gradient-text">Suprana</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
              <div className="text-purple-500 text-4xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold mb-4">Lightning Fast</h3>
              <p className="text-gray-400">
                Experience ~400ms block times with Proof of History consensus, enabling high-throughput applications.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
              <div className="text-blue-500 text-4xl mb-4">🔒</div>
              <h3 className="text-2xl font-bold mb-4">Secure & Decentralized</h3>
              <p className="text-gray-400">
                Built on battle-tested architecture with Proof of Stake security and validator network.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
              <div className="text-cyan-500 text-4xl mb-4">🛠️</div>
              <h3 className="text-2xl font-bold mb-4">Developer Friendly</h3>
              <p className="text-gray-400">
                Full SDK support, comprehensive documentation, and tools for building scalable dApps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Network Section */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">
            Network <span className="gradient-text">Infrastructure</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 p-8 rounded-xl border border-purple-700">
              <h3 className="text-2xl font-bold mb-4">🧪 Testnet</h3>
              <p className="text-gray-300 mb-6">
                Test your applications in a risk-free environment with full feature parity to mainnet.
              </p>
              <ul className="space-y-2 text-gray-400 mb-6">
                <li>• Free test SUP tokens via faucet</li>
                <li>• Full RPC and WebSocket access</li>
                <li>• Same performance as mainnet</li>
                <li>• Perfect for development</li>
              </ul>
              <Link
                href="/network#testnet"
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition"
              >
                Connect to Testnet
              </Link>
            </div>
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-800/30 p-8 rounded-xl border border-blue-700">
              <h3 className="text-2xl font-bold mb-4">🚀 Mainnet</h3>
              <p className="text-gray-300 mb-6">
                Deploy production applications on the live Suprana network with real value.
              </p>
              <ul className="space-y-2 text-gray-400 mb-6">
                <li>• Production-ready infrastructure</li>
                <li>• High availability and uptime</li>
                <li>• Real SUP token economics</li>
                <li>• Enterprise support</li>
              </ul>
              <Link
                href="/network#mainnet"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
              >
                Connect to Mainnet
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">
            Ecosystem <span className="gradient-text">Tools</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition">
              <h3 className="text-xl font-bold mb-2">🔍 Explorer</h3>
              <p className="text-gray-400 text-sm mb-4">
                View blocks, transactions, and accounts on the Suprana blockchain.
              </p>
              <Link href="/ecosystem#explorer" className="text-purple-400 hover:text-purple-300">
                Learn More →
              </Link>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition">
              <h3 className="text-xl font-bold mb-2">💼 Wallet</h3>
              <p className="text-gray-400 text-sm mb-4">
                Secure wallet for managing SUP tokens and interacting with dApps.
              </p>
              <Link href="/ecosystem#wallet" className="text-purple-400 hover:text-purple-300">
                Learn More →
              </Link>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition">
              <h3 className="text-xl font-bold mb-2">⚙️ CLI Tools</h3>
              <p className="text-gray-400 text-sm mb-4">
                Command-line tools for validators, developers, and power users.
              </p>
              <Link href="/tools" className="text-purple-400 hover:text-purple-300">
                Learn More →
              </Link>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition">
              <h3 className="text-xl font-bold mb-2">📚 Documentation</h3>
              <p className="text-gray-400 text-sm mb-4">
                Comprehensive guides for building on Suprana.
              </p>
              <a
                href="https://github.com/Suprana-Labs/suprana/tree/main/docs"
                target="_blank"
                className="text-purple-400 hover:text-purple-300"
              >
                Read Docs →
              </a>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition">
              <h3 className="text-xl font-bold mb-2">🔧 Developer SDK</h3>
              <p className="text-gray-400 text-sm mb-4">
                JavaScript/TypeScript SDK for building dApps.
              </p>
              <a
                href="https://github.com/Suprana-Labs/suprana/blob/main/docs/DEVELOPER_GUIDE.md"
                target="_blank"
                className="text-purple-400 hover:text-purple-300"
              >
                Get Started →
              </a>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition">
              <h3 className="text-xl font-bold mb-2">🏗️ Smart Contracts</h3>
              <p className="text-gray-400 text-sm mb-4">
                Build and deploy programs using Anchor framework.
              </p>
              <a
                href="https://github.com/Suprana-Labs/suprana/blob/main/docs/SMART_CONTRACTS.md"
                target="_blank"
                className="text-purple-400 hover:text-purple-300"
              >
                Learn More →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900 to-blue-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Build?</h2>
          <p className="text-xl text-gray-200 mb-8">
            Join the Suprana ecosystem and start building high-performance applications today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://github.com/Suprana-Labs/suprana/blob/main/docs/DEVELOPER_GUIDE.md"
              target="_blank"
              className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition"
            >
              Start Building
            </Link>
            <Link
              href="https://github.com/Suprana-Labs/suprana"
              target="_blank"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-purple-900 text-white px-8 py-4 rounded-lg text-lg font-semibold transition"
            >
              View on GitHub
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
