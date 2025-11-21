export default function Ecosystem() {
  return (
    <div className="bg-gray-950 text-white min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold mb-8 text-center">
          Suprana <span className="gradient-text">Ecosystem</span>
        </h1>
        <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
          Explore the tools and applications built for the Suprana blockchain
        </p>

        {/* Explorer */}
        <section id="explorer" className="mb-16">
          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
            <div className="flex items-start mb-6">
              <div className="text-5xl mr-6">🔍</div>
              <div>
                <h2 className="text-3xl font-bold mb-4">Block Explorer</h2>
                <p className="text-gray-300 mb-6">
                  View and search blocks, transactions, accounts, and programs on the Suprana blockchain.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Features</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Real-time block and transaction viewing</li>
                  <li>• Account balance lookups</li>
                  <li>• Program deployment tracking</li>
                  <li>• Token analytics</li>
                  <li>• Network statistics</li>
                </ul>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Status</h3>
                <div className="text-yellow-400 font-semibold mb-3">⏳ Coming Soon</div>
                <p className="text-gray-300 text-sm">
                  The Suprana block explorer is currently in development.
                  Check back soon for updates!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Wallet */}
        <section id="wallet" className="mb-16">
          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
            <div className="flex items-start mb-6">
              <div className="text-5xl mr-6">💼</div>
              <div>
                <h2 className="text-3xl font-bold mb-4">PAILET Wallet</h2>
                <p className="text-gray-300 mb-6">
                  Secure browser extension wallet for managing SUP tokens and interacting with Suprana dApps.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-bold mb-2">🔐 Secure</h4>
                <p className="text-sm text-gray-400">Password-encrypted private keys</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-bold mb-2">💱 Multi-Token</h4>
                <p className="text-sm text-gray-400">Support for SUP and SPL tokens</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-bold mb-2">🔄 Swap</h4>
                <p className="text-sm text-gray-400">Built-in token swap interface</p>
              </div>
            </div>

            <div className="bg-purple-900/30 p-6 rounded-lg border border-purple-700">
              <h3 className="text-xl font-bold mb-3">Features</h3>
              <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                <ul className="space-y-2">
                  <li>✓ Send and receive SUP</li>
                  <li>✓ Token account management</li>
                  <li>✓ QR code support</li>
                  <li>✓ Transaction history</li>
                </ul>
                <ul className="space-y-2">
                  <li>✓ Multiple network support</li>
                  <li>✓ Airdrop requests (testnet)</li>
                  <li>✓ dApp connectivity</li>
                  <li>✓ Hardware wallet support (planned)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Developer Tools */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8 text-center">Developer Tools</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="text-xl font-bold mb-3">CLI Tools</h3>
              <p className="text-gray-400 mb-4">
                Command-line interface for interacting with Suprana network.
              </p>
              <a
                href="https://github.com/Suprana-Labs/suprana/blob/main/docs/CLI_REFERENCE.md"
                target="_blank"
                className="text-purple-400 hover:text-purple-300 text-sm"
              >
                View Documentation →
              </a>
            </div>

            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-xl font-bold mb-3">Web3.js SDK</h3>
              <p className="text-gray-400 mb-4">
                JavaScript/TypeScript SDK for building dApps on Suprana.
              </p>
              <a
                href="https://github.com/Suprana-Labs/suprana/blob/main/docs/DEVELOPER_GUIDE.md"
                target="_blank"
                className="text-purple-400 hover:text-purple-300 text-sm"
              >
                Get Started →
              </a>
            </div>

            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
              <div className="text-4xl mb-4">🏗️</div>
              <h3 className="text-xl font-bold mb-3">Anchor Framework</h3>
              <p className="text-gray-400 mb-4">
                Rust framework for building secure Suprana programs.
              </p>
              <a
                href="https://github.com/Suprana-Labs/suprana/blob/main/docs/SMART_CONTRACTS.md"
                target="_blank"
                className="text-purple-400 hover:text-purple-300 text-sm"
              >
                Learn More →
              </a>
            </div>

            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
              <div className="text-4xl mb-4">🪙</div>
              <h3 className="text-xl font-bold mb-3">SPL Token CLI</h3>
              <p className="text-gray-400 mb-4">
                Create and manage tokens on Suprana blockchain.
              </p>
              <a
                href="https://github.com/Suprana-Labs/suprana/blob/main/docs/TOKEN_CREATION.md"
                target="_blank"
                className="text-purple-400 hover:text-purple-300 text-sm"
              >
                Create Tokens →
              </a>
            </div>

            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
              <div className="text-4xl mb-4">🐍</div>
              <h3 className="text-xl font-bold mb-3">Python SDK</h3>
              <p className="text-gray-400 mb-4">
                Python library for Suprana blockchain integration.
              </p>
              <div className="text-gray-500 text-sm">Coming soon</div>
            </div>

            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
              <div className="text-4xl mb-4">🦀</div>
              <h3 className="text-xl font-bold mb-3">Rust Crates</h3>
              <p className="text-gray-400 mb-4">
                Native Rust libraries for building with Suprana.
              </p>
              <a
                href="https://github.com/Suprana-Labs/suprana"
                target="_blank"
                className="text-purple-400 hover:text-purple-300 text-sm"
              >
                View Source →
              </a>
            </div>
          </div>
        </section>

        {/* Infrastructure */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8 text-center">Infrastructure</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
              <h3 className="text-2xl font-bold mb-4">🌐 RPC Nodes</h3>
              <p className="text-gray-300 mb-4">
                High-performance RPC endpoints for connecting to Suprana network.
              </p>
              <div className="bg-gray-800 p-4 rounded-lg">
                <code className="text-purple-400">http://localhost:8899</code>
                <div className="text-sm text-gray-400 mt-2">Testnet RPC</div>
              </div>
            </div>

            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
              <h3 className="text-2xl font-bold mb-4">🔌 WebSocket</h3>
              <p className="text-gray-300 mb-4">
                Real-time blockchain updates via WebSocket connections.
              </p>
              <div className="bg-gray-800 p-4 rounded-lg">
                <code className="text-purple-400">ws://localhost:8900</code>
                <div className="text-sm text-gray-400 mt-2">Testnet WebSocket</div>
              </div>
            </div>
          </div>
        </section>

        {/* Get Involved */}
        <section className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 p-8 rounded-xl border border-purple-700">
          <h2 className="text-3xl font-bold mb-4 text-center">Build on Suprana</h2>
          <p className="text-gray-300 text-center mb-8 max-w-2xl mx-auto">
            Join the growing Suprana ecosystem. Build the next generation of decentralized applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/Suprana-Labs/suprana/tree/main/docs"
              target="_blank"
              className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition text-center"
            >
              Read Documentation
            </a>
            <a
              href="https://github.com/Suprana-Labs/suprana"
              target="_blank"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-purple-900 px-8 py-3 rounded-lg font-semibold transition text-center"
            >
              View on GitHub
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
