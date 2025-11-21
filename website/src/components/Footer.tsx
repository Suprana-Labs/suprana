import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <h3 className="text-2xl font-bold gradient-text mb-4">SUPRANA</h3>
            <p className="text-gray-400 text-sm">
              High-performance blockchain with 10 billion SUP native tokens.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="https://github.com/Suprana-Labs/suprana/tree/main/docs" target="_blank" className="text-gray-400 hover:text-white transition text-sm">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/whitepaper" className="text-gray-400 hover:text-white transition text-sm">
                  Whitepaper
                </Link>
              </li>
              <li>
                <Link href="https://github.com/Suprana-Labs/suprana" target="_blank" className="text-gray-400 hover:text-white transition text-sm">
                  GitHub
                </Link>
              </li>
            </ul>
          </div>

          {/* Network */}
          <div>
            <h4 className="text-white font-semibold mb-4">Network</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/network#testnet" className="text-gray-400 hover:text-white transition text-sm">
                  Testnet
                </Link>
              </li>
              <li>
                <Link href="/network#mainnet" className="text-gray-400 hover:text-white transition text-sm">
                  Mainnet
                </Link>
              </li>
              <li>
                <Link href="/ecosystem#explorer" className="text-gray-400 hover:text-white transition text-sm">
                  Explorer
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-white font-semibold mb-4">Community</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://github.com/Suprana-Labs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition text-sm">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  Discord (Coming Soon)
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  Twitter (Coming Soon)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Suprana Labs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
