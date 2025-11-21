export default function Tools() {
  return (
    <div className="bg-gray-950 text-white min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold mb-8 text-center">
          Developer <span className="gradient-text">Tools</span>
        </h1>
        <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
          Everything you need to build, test, and deploy on Suprana
        </p>

        {/* CLI Tools */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8">Command Line Tools</h2>
          <div className="space-y-6">
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
              <h3 className="text-2xl font-bold mb-4">suprana</h3>
              <p className="text-gray-300 mb-4">
                Main CLI tool for interacting with the Suprana blockchain.
              </p>
              <div className="bg-gray-800 p-4 rounded-lg mb-4">
                <pre className="text-sm overflow-x-auto"><code className="text-gray-300">{`# Install (add to PATH)
export PATH="$HOME/suprana/bin:$PATH"

# Configure
suprana config set --url http://localhost:8899

# Check balance
suprana balance

# Transfer SUP
suprana transfer <ADDRESS> 10`}</code></pre>
              </div>
              <a
                href="https://github.com/Suprana-Labs/suprana/blob/main/docs/CLI_REFERENCE.md"
                target="_blank"
                className="text-purple-400 hover:text-purple-300"
              >
                Full CLI Reference →
              </a>
            </div>

            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
              <h3 className="text-2xl font-bold mb-4">suprana-keygen</h3>
              <p className="text-gray-300 mb-4">
                Generate and manage keypairs for Suprana wallets.
              </p>
              <div className="bg-gray-800 p-4 rounded-lg mb-4">
                <pre className="text-sm overflow-x-auto"><code className="text-gray-300">{`# Generate new keypair
suprana-keygen new

# Recover from seed phrase
suprana-keygen recover

# Display public key
suprana-keygen pubkey wallet.json`}</code></pre>
              </div>
            </div>

            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
              <h3 className="text-2xl font-bold mb-4">suprana-test-validator</h3>
              <p className="text-gray-300 mb-4">
                Local validator for testing and development.
              </p>
              <div className="bg-gray-800 p-4 rounded-lg mb-4">
                <pre className="text-sm overflow-x-auto"><code className="text-gray-300">{`# Start test validator
./bin/suprana-test-validator

# With custom configuration
suprana-test-validator --reset --quiet`}</code></pre>
              </div>
            </div>
          </div>
        </section>

        {/* Token Tools */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8">Token Tools</h2>
          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
            <h3 className="text-2xl font-bold mb-4">spl-token</h3>
            <p className="text-gray-300 mb-4">
              Create and manage SPL tokens on Suprana.
            </p>
            <div className="bg-gray-800 p-4 rounded-lg mb-4">
              <pre className="text-sm overflow-x-auto"><code className="text-gray-300">{`# Install
cargo install spl-token-cli

# Create token
spl-token create-token

# Create token account
spl-token create-account <TOKEN_MINT>

# Mint tokens
spl-token mint <TOKEN_MINT> 1000

# Transfer tokens
spl-token transfer <TOKEN_MINT> 100 <RECIPIENT>`}</code></pre>
            </div>
            <a
              href="https://github.com/Suprana-Labs/suprana/blob/main/docs/TOKEN_CREATION.md"
              target="_blank"
              className="text-purple-400 hover:text-purple-300"
            >
              Token Creation Guide →
            </a>
          </div>
        </section>

        {/* Development Frameworks */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8">Development Frameworks</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
              <h3 className="text-2xl font-bold mb-4">Anchor</h3>
              <p className="text-gray-300 mb-4">
                The most popular framework for Suprana program development.
              </p>
              <div className="bg-gray-800 p-4 rounded-lg mb-4">
                <pre className="text-sm overflow-x-auto"><code className="text-gray-300">{`# Install Anchor
cargo install --git https://github.com/coral-xyz/anchor avm
avm install latest
avm use latest

# Create new project
anchor init my_project

# Build
anchor build

# Test
anchor test

# Deploy
anchor deploy`}</code></pre>
              </div>
              <a
                href="https://github.com/Suprana-Labs/suprana/blob/main/docs/SMART_CONTRACTS.md"
                target="_blank"
                className="text-purple-400 hover:text-purple-300"
              >
                Smart Contracts Guide →
              </a>
            </div>

            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
              <h3 className="text-2xl font-bold mb-4">@solana/web3.js</h3>
              <p className="text-gray-300 mb-4">
                JavaScript/TypeScript SDK for Suprana applications.
              </p>
              <div className="bg-gray-800 p-4 rounded-lg mb-4">
                <pre className="text-sm overflow-x-auto"><code className="text-gray-300">{`# Install
npm install @solana/web3.js

# Usage
import { Connection, PublicKey } from '@solana/web3.js';

const connection = new Connection('http://localhost:8899');
const balance = await connection.getBalance(publicKey);`}</code></pre>
              </div>
              <a
                href="https://github.com/Suprana-Labs/suprana/blob/main/docs/DEVELOPER_GUIDE.md"
                target="_blank"
                className="text-purple-400 hover:text-purple-300"
              >
                Developer Guide →
              </a>
            </div>
          </div>
        </section>

        {/* Build Tools */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8">Build Tools</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-bold mb-3">cargo build-bpf</h3>
              <p className="text-gray-400 mb-4 text-sm">
                Compile Rust programs to BPF bytecode for Suprana.
              </p>
              <code className="text-xs text-gray-500">cargo build-bpf</code>
            </div>

            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-bold mb-3">solana-test-validator</h3>
              <p className="text-gray-400 mb-4 text-sm">
                Local blockchain for testing and development.
              </p>
              <code className="text-xs text-gray-500">Test environment</code>
            </div>

            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-bold mb-3">anchor test</h3>
              <p className="text-gray-400 mb-4 text-sm">
                Run automated tests for your programs.
              </p>
              <code className="text-xs text-gray-500">Testing framework</code>
            </div>
          </div>
        </section>

        {/* Documentation */}
        <section className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 p-8 rounded-xl border border-purple-700">
          <h2 className="text-3xl font-bold mb-4 text-center">Documentation</h2>
          <p className="text-gray-300 text-center mb-8 max-w-2xl mx-auto">
            Comprehensive guides to help you build on Suprana
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              href="https://github.com/Suprana-Labs/suprana/blob/main/docs/BUILD_GUIDE.md"
              target="_blank"
              className="bg-gray-900 hover:bg-gray-800 p-4 rounded-lg transition"
            >
              <h4 className="font-bold mb-2">Build Guide</h4>
              <p className="text-gray-400 text-sm">Build Suprana from source</p>
            </a>
            <a
              href="https://github.com/Suprana-Labs/suprana/blob/main/docs/DEPLOYMENT_GUIDE.md"
              target="_blank"
              className="bg-gray-900 hover:bg-gray-800 p-4 rounded-lg transition"
            >
              <h4 className="font-bold mb-2">Deployment Guide</h4>
              <p className="text-gray-400 text-sm">Deploy validators and networks</p>
            </a>
            <a
              href="https://github.com/Suprana-Labs/suprana/blob/main/docs/DEVELOPER_GUIDE.md"
              target="_blank"
              className="bg-gray-900 hover:bg-gray-800 p-4 rounded-lg transition"
            >
              <h4 className="font-bold mb-2">Developer Guide</h4>
              <p className="text-gray-400 text-sm">Get started building dApps</p>
            </a>
            <a
              href="https://github.com/Suprana-Labs/suprana/blob/main/docs/SMART_CONTRACTS.md"
              target="_blank"
              className="bg-gray-900 hover:bg-gray-800 p-4 rounded-lg transition"
            >
              <h4 className="font-bold mb-2">Smart Contracts</h4>
              <p className="text-gray-400 text-sm">Write on-chain programs</p>
            </a>
            <a
              href="https://github.com/Suprana-Labs/suprana/blob/main/docs/TOKEN_CREATION.md"
              target="_blank"
              className="bg-gray-900 hover:bg-gray-800 p-4 rounded-lg transition"
            >
              <h4 className="font-bold mb-2">Token Creation</h4>
              <p className="text-gray-400 text-sm">Create custom tokens</p>
            </a>
            <a
              href="https://github.com/Suprana-Labs/suprana/blob/main/docs/CLI_REFERENCE.md"
              target="_blank"
              className="bg-gray-900 hover:bg-gray-800 p-4 rounded-lg transition"
            >
              <h4 className="font-bold mb-2">CLI Reference</h4>
              <p className="text-gray-400 text-sm">Complete command reference</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
