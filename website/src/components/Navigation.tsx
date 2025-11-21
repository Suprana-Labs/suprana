'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold gradient-text">SUPRANA</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition">
              Home
            </Link>
            <Link href="/whitepaper" className="text-gray-300 hover:text-white transition">
              Whitepaper
            </Link>
            <Link href="/network" className="text-gray-300 hover:text-white transition">
              Network
            </Link>
            <Link href="/ecosystem" className="text-gray-300 hover:text-white transition">
              Ecosystem
            </Link>
            <Link href="/tools" className="text-gray-300 hover:text-white transition">
              Tools
            </Link>
            <Link
              href="https://github.com/Suprana-Labs/suprana"
              target="_blank"
              className="text-gray-300 hover:text-white transition"
            >
              GitHub
            </Link>
            <Link
              href="https://github.com/Suprana-Labs/suprana/tree/main/docs"
              target="_blank"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md">
              Home
            </Link>
            <Link href="/whitepaper" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md">
              Whitepaper
            </Link>
            <Link href="/network" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md">
              Network
            </Link>
            <Link href="/ecosystem" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md">
              Ecosystem
            </Link>
            <Link href="/tools" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md">
              Tools
            </Link>
            <Link href="https://github.com/Suprana-Labs/suprana" target="_blank" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md">
              GitHub
            </Link>
            <Link href="https://github.com/Suprana-Labs/suprana/tree/main/docs" target="_blank" className="block px-3 py-2 bg-purple-600 text-white hover:bg-purple-700 rounded-md text-center">
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
