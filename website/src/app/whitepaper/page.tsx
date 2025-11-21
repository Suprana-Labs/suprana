export default function Whitepaper() {
  return (
    <div className="bg-gray-950 text-white min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold mb-8">
          <span className="gradient-text">Suprana</span> Whitepaper
        </h1>

        <div className="prose prose-invert max-w-none">
          {/* Abstract */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Abstract</h2>
            <p className="text-gray-300 leading-relaxed">
              Suprana is a high-performance blockchain protocol designed for scalable decentralized applications.
              With ~400ms block times and a fixed supply of 10 billion SUP tokens, Suprana provides the infrastructure
              for the next generation of Web3 applications.
            </p>
          </section>

          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">1. Introduction</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              The blockchain industry requires high-performance infrastructure capable of supporting mainstream
              adoption. Suprana addresses this need through innovative consensus mechanisms and optimized
              architecture.
            </p>
            <h3 className="text-2xl font-bold mb-3 mt-6">1.1 Vision</h3>
            <p className="text-gray-300 leading-relaxed">
              To provide developers with a blockchain platform that doesn't compromise on speed, security,
              or decentralization.
            </p>
          </section>

          {/* Technical Architecture */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">2. Technical Architecture</h2>

            <h3 className="text-2xl font-bold mb-3 mt-6">2.1 Consensus Mechanism</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Suprana employs a hybrid consensus mechanism combining Proof of History (PoH) with Proof of Stake (PoS):
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
              <li><strong>Proof of History (PoH)</strong>: Provides cryptographic timestamps for ordering transactions</li>
              <li><strong>Proof of Stake (PoS)</strong>: Ensures network security through validator staking</li>
              <li><strong>Tower BFT</strong>: Byzantine Fault Tolerance optimized for PoH</li>
            </ul>

            <h3 className="text-2xl font-bold mb-3 mt-6">2.2 Block Production</h3>
            <p className="text-gray-300 leading-relaxed">
              Blocks are produced approximately every 400 milliseconds, enabling high transaction throughput
              and near-instant finality for users.
            </p>

            <h3 className="text-2xl font-bold mb-3 mt-6">2.3 Network Architecture</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Turbine: Block propagation protocol</li>
              <li>Gulf Stream: Mempool-less transaction forwarding</li>
              <li>Sealevel: Parallel smart contract runtime</li>
              <li>Pipelining: Transaction processing optimization</li>
            </ul>
          </section>

          {/* Token Economics */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">3. Token Economics</h2>

            <h3 className="text-2xl font-bold mb-3 mt-6">3.1 SUP Token</h3>
            <div className="bg-gray-800 p-6 rounded-lg mb-4">
              <ul className="space-y-2 text-gray-300">
                <li><strong>Symbol:</strong> SUP</li>
                <li><strong>Total Supply:</strong> 10,000,000,000 (10 Billion)</li>
                <li><strong>Decimals:</strong> 9</li>
                <li><strong>Smallest Unit:</strong> 1 lamport = 0.000000001 SUP</li>
                <li><strong>Supply Model:</strong> Fixed (no inflation)</li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold mb-3 mt-6">3.2 Token Utility</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Transaction fees</li>
              <li>Validator staking</li>
              <li>Governance participation</li>
              <li>Smart contract execution</li>
              <li>Storage rent</li>
            </ul>

            <h3 className="text-2xl font-bold mb-3 mt-6">3.3 Distribution</h3>
            <p className="text-gray-300 leading-relaxed">
              The 10 billion SUP tokens are allocated to support network growth, development, and ecosystem expansion.
            </p>
          </section>

          {/* Smart Contracts */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">4. Smart Contracts & Programs</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Suprana supports Turing-complete smart contracts (called "programs") written in Rust, C, or C++.
              Programs are compiled to BPF bytecode and executed in a secure runtime environment.
            </p>

            <h3 className="text-2xl font-bold mb-3 mt-6">4.1 Program Model</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Stateless programs with account-based storage</li>
              <li>Cross-program invocations (CPI)</li>
              <li>Program Derived Addresses (PDAs)</li>
              <li>Anchor framework support</li>
            </ul>
          </section>

          {/* Network Specifications */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">5. Network Specifications</h2>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                <div>
                  <h4 className="font-bold mb-2">Performance</h4>
                  <ul className="space-y-1 text-sm">
                    <li>Block Time: ~400ms</li>
                    <li>Slot Time: ~400ms</li>
                    <li>Epoch Length: Configurable</li>
                    <li>TPS: 50,000+</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Network</h4>
                  <ul className="space-y-1 text-sm">
                    <li>Testnet: Available</li>
                    <li>Mainnet: Planned</li>
                    <li>Validator Requirements: High</li>
                    <li>RPC: HTTP + WebSocket</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Validator Network */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">6. Validator Network</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Suprana's security is maintained by a decentralized network of validators who stake SUP tokens
              and participate in consensus.
            </p>

            <h3 className="text-2xl font-bold mb-3 mt-6">6.1 Validator Requirements</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Minimum stake requirement</li>
              <li>High-performance hardware (12+ core CPU, 128GB+ RAM, NVMe SSD)</li>
              <li>High-bandwidth network connection (1Gbps+)</li>
              <li>99.9% uptime commitment</li>
            </ul>

            <h3 className="text-2xl font-bold mb-3 mt-6">6.2 Rewards</h3>
            <p className="text-gray-300 leading-relaxed">
              Validators earn rewards from transaction fees and optional staking rewards.
            </p>
          </section>

          {/* Security */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">7. Security</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Byzantine Fault Tolerance (BFT)</li>
              <li>Economic security through staking</li>
              <li>Slashing for malicious behavior</li>
              <li>Regular security audits</li>
              <li>Bug bounty program</li>
            </ul>
          </section>

          {/* Roadmap */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">8. Roadmap</h2>

            <div className="space-y-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-bold text-green-400 mb-2">✓ Phase 1: Foundation (Complete)</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>- Core blockchain development</li>
                  <li>- CLI tools and SDK</li>
                  <li>- Documentation</li>
                  <li>- Testnet launch</li>
                </ul>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-bold text-blue-400 mb-2">→ Phase 2: Ecosystem (In Progress)</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>- Block explorer</li>
                  <li>- Wallet application</li>
                  <li>- Developer tools</li>
                  <li>- Community building</li>
                </ul>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-bold text-purple-400 mb-2">○ Phase 3: Mainnet (Planned)</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>- Security audits</li>
                  <li>- Validator onboarding</li>
                  <li>- Mainnet launch</li>
                  <li>- DeFi ecosystem</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">9. Conclusion</h2>
            <p className="text-gray-300 leading-relaxed">
              Suprana represents a significant advancement in blockchain technology, providing the performance
              and scalability needed for mainstream adoption while maintaining security and decentralization.
              With a fixed supply of 10 billion SUP tokens and cutting-edge technical architecture, Suprana
              is positioned to be a leading platform for decentralized applications.
            </p>
          </section>

          {/* References */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">10. References</h2>
            <ul className="text-gray-300 space-y-2">
              <li>[1] Suprana Documentation: <a href="https://github.com/Suprana-Labs/suprana/tree/main/docs" className="text-purple-400 hover:underline" target="_blank">GitHub</a></li>
              <li>[2] Technical Specifications: Available in repository</li>
              <li>[3] Source Code: <a href="https://github.com/Suprana-Labs/suprana" className="text-purple-400 hover:underline" target="_blank">GitHub Repository</a></li>
            </ul>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-12 p-8 bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-xl border border-purple-700">
          <h3 className="text-2xl font-bold mb-4">Start Building on Suprana</h3>
          <p className="text-gray-300 mb-6">
            Ready to build high-performance applications? Check out our documentation and get started today.
          </p>
          <a
            href="https://github.com/Suprana-Labs/suprana/tree/main/docs"
            target="_blank"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition"
          >
            View Documentation
          </a>
        </div>
      </div>
    </div>
  )
}
