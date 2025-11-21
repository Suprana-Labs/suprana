export default function Network() {
  return (
    <div className="bg-gray-950 text-white min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold mb-8 text-center">
          Suprana <span className="gradient-text">Networks</span>
        </h1>
        <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
          Connect to Suprana testnet for development or mainnet for production deployments
        </p>

        {/* Testnet Section */}
        <section id="testnet" className="mb-20">
          <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 p-8 rounded-xl border border-purple-700">
            <h2 className="text-4xl font-bold mb-6">🧪 Testnet</h2>
            <p className="text-gray-300 mb-8">
              The Suprana testnet is a fully functional network for testing and development. Get free test SUP tokens
              and experiment with all features risk-free.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Connection Details</h3>
                <div className="space-y-3">
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">RPC Endpoint</div>
                    <code className="text-purple-400">http://localhost:8899</code>
                  </div>
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">WebSocket</div>
                    <code className="text-purple-400">ws://localhost:8900</code>
                  </div>
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Chain ID</div>
                    <code className="text-purple-400">testnet</code>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">Quick Start</h3>
                <div className="bg-gray-900 p-4 rounded-lg mb-4">
                  <pre className="text-sm overflow-x-auto">
                    <code className="text-gray-300">{`# Start test validator
./bin/suprana-test-validator

# Configure CLI
suprana config set --url http://localhost:8899

# Request airdrop
suprana airdrop 10

# Check balance
suprana balance`}</code>
                  </pre>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="font-bold mb-2">✓ Free Test Tokens</h4>
                <p className="text-sm text-gray-400">Get unlimited test SUP via faucet</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="font-bold mb-2">✓ Full Feature Parity</h4>
                <p className="text-sm text-gray-400">Same features as mainnet</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="font-bold mb-2">✓ Fast Reset</h4>
                <p className="text-sm text-gray-400">Clean state for testing</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mainnet Section */}
        <section id="mainnet" className="mb-20">
          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-800/30 p-8 rounded-xl border border-blue-700">
            <h2 className="text-4xl font-bold mb-6">🚀 Mainnet</h2>
            <p className="text-gray-300 mb-8">
              The Suprana mainnet is the production network with real economic value. Deploy your applications
              with confidence on enterprise-grade infrastructure.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Connection Details</h3>
                <div className="space-y-3">
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">RPC Endpoint</div>
                    <code className="text-cyan-400">Coming Soon</code>
                  </div>
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">WebSocket</div>
                    <code className="text-cyan-400">Coming Soon</code>
                  </div>
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Explorer</div>
                    <code className="text-cyan-400">Coming Soon</code>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">Mainnet Status</h3>
                <div className="bg-gray-900 p-6 rounded-lg">
                  <div className="text-center">
                    <div className="text-5xl mb-4">⏳</div>
                    <p className="text-gray-300 mb-4">Mainnet launch coming soon</p>
                    <p className="text-sm text-gray-400">
                      Currently in final testing and validator onboarding phase
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="font-bold mb-2">✓ High Availability</h4>
                <p className="text-sm text-gray-400">99.9% uptime guarantee</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="font-bold mb-2">✓ Enterprise Support</h4>
                <p className="text-sm text-gray-400">Priority technical assistance</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="font-bold mb-2">✓ Production Ready</h4>
                <p className="text-sm text-gray-400">Battle-tested infrastructure</p>
              </div>
            </div>
          </div>
        </section>

        {/* Network Comparison */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-8 text-center">Network Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-gray-900 rounded-xl overflow-hidden">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left">Feature</th>
                  <th className="px-6 py-4 text-left">Testnet</th>
                  <th className="px-6 py-4 text-left">Mainnet</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-800">
                  <td className="px-6 py-4">Purpose</td>
                  <td className="px-6 py-4 text-gray-300">Development & Testing</td>
                  <td className="px-6 py-4 text-gray-300">Production</td>
                </tr>
                <tr className="border-t border-gray-800">
                  <td className="px-6 py-4">SUP Tokens</td>
                  <td className="px-6 py-4 text-gray-300">Test tokens (no value)</td>
                  <td className="px-6 py-4 text-gray-300">Real SUP tokens</td>
                </tr>
                <tr className="border-t border-gray-800">
                  <td className="px-6 py-4">Faucet</td>
                  <td className="px-6 py-4 text-green-400">✓ Available</td>
                  <td className="px-6 py-4 text-gray-500">✗ Not available</td>
                </tr>
                <tr className="border-t border-gray-800">
                  <td className="px-6 py-4">Reset</td>
                  <td className="px-6 py-4 text-green-400">Can be reset</td>
                  <td className="px-6 py-4 text-gray-300">Permanent</td>
                </tr>
                <tr className="border-t border-gray-800">
                  <td className="px-6 py-4">Uptime</td>
                  <td className="px-6 py-4 text-gray-300">Best effort</td>
                  <td className="px-6 py-4 text-gray-300">99.9% SLA</td>
                </tr>
                <tr className="border-t border-gray-800">
                  <td className="px-6 py-4">Support</td>
                  <td className="px-6 py-4 text-gray-300">Community</td>
                  <td className="px-6 py-4 text-gray-300">Enterprise</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Documentation */}
        <section className="bg-gray-900 p-8 rounded-xl border border-gray-800">
          <h2 className="text-3xl font-bold mb-6">📚 Network Documentation</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold mb-3">For Developers</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="https://github.com/Suprana-Labs/suprana/blob/main/docs/DEVELOPER_GUIDE.md" target="_blank" className="text-purple-400 hover:underline">
                    → Developer Guide
                  </a>
                </li>
                <li>
                  <a href="https://github.com/Suprana-Labs/suprana/blob/main/docs/CLI_REFERENCE.md" target="_blank" className="text-purple-400 hover:underline">
                    → CLI Reference
                  </a>
                </li>
                <li>
                  <a href="https://github.com/Suprana-Labs/suprana/blob/main/docs/SMART_CONTRACTS.md" target="_blank" className="text-purple-400 hover:underline">
                    → Smart Contracts Guide
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">For Validators</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="https://github.com/Suprana-Labs/suprana/blob/main/docs/DEPLOYMENT_GUIDE.md" target="_blank" className="text-purple-400 hover:underline">
                    → Deployment Guide
                  </a>
                </li>
                <li>
                  <a href="https://github.com/Suprana-Labs/suprana/blob/main/docs/BUILD_GUIDE.md" target="_blank" className="text-purple-400 hover:underline">
                    → Build Guide
                  </a>
                </li>
                <li>
                  <a href="https://github.com/Suprana-Labs/suprana/blob/main/docs/TROUBLESHOOTING.md" target="_blank" className="text-purple-400 hover:underline">
                    → Troubleshooting
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
