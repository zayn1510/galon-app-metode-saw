"use client"

import Link from 'next/link'
import { FaUser } from 'react-icons/fa'
import { useState } from 'react'

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)

  type DropdownItem = {
    label: string
    href?: string
    onClick?: () => void
  }

  const dropdownItems: DropdownItem[] = [
    { label: 'Profil Saya', href: '/profil' },
    { label: 'Pesanan', href: '/pesanan' },
    {
      label: 'Keluar',
      onClick: () => {
        setIsLoggedIn(false)
        setShowDropdown(false)
      }
    }
  ]

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
            aria-label="Beranda GalonBest"
          >
            GalonBest
          </Link>

          {/* Navigasi Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="#produk">Galon</NavLink>
            <NavLink href="#testimoni">Testimoni</NavLink>
            <NavLink href="#kontak">Kontak</NavLink>

            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                  aria-label="Menu pengguna"
                  aria-expanded={showDropdown}
                >
                  <UserAvatar />
                </button>

                <DropdownMenu
                  isOpen={showDropdown}
                  items={dropdownItems}
                  onClose={() => setShowDropdown(false)}
                />
              </div>
            ) : (
              <AuthButtons />
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            aria-label="Toggle menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="mt-4 md:hidden flex flex-col space-y-2">
            <NavLink href="#produk">Produk</NavLink>
            <NavLink href="#testimoni">Testimoni</NavLink>
            <NavLink href="#kontak">Kontak</NavLink>

            {isLoggedIn ? (
              <div className="flex flex-col space-y-2">
                {dropdownItems.map((item, index) =>
                  item.href ? (
                    <Link
                      key={index}
                      href={item.href}
                      className="text-gray-700 hover:text-blue-600 px-4 py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      key={index}
                      onClick={() => {
                        item.onClick?.()
                        setIsMobileMenuOpen(false)
                      }}
                      className="text-gray-700 hover:text-blue-600 px-4 py-2 text-left"
                    >
                      {item.label}
                    </button>
                  )
                )}
              </div>
            ) : (
              <AuthButtons />
            )}
          </nav>
        )}
      </div>
    </header>
  )
}

// === Komponen Tambahan ===

type NavLinkProps = {
  href: string
  children: React.ReactNode
}

const NavLink = ({ href, children }: NavLinkProps) => (
  <Link
    href={href}
    className="text-gray-700 hover:text-blue-600 transition-colors"
    passHref
  >
    {children}
  </Link>
)

const UserAvatar = () => (
  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
    <FaUser className="text-gray-600" aria-hidden="true" />
  </div>
)

type DropdownItem = {
  label: string
  href?: string
  onClick?: () => void
}

type DropdownMenuProps = {
  isOpen: boolean
  items: DropdownItem[]
  onClose: () => void
}

const DropdownMenu = ({ isOpen, items, onClose }: DropdownMenuProps) => {
  if (!isOpen) return null

  return (
    <div
      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100"
      onClick={(e) => e.stopPropagation()}
    >
      {items.map((item, index) =>
        item.href ? (
          <Link
            key={index}
            href={item.href}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={onClose}
          >
            {item.label}
          </Link>
        ) : (
          <button
            key={index}
            onClick={() => {
              item.onClick?.()
              onClose()
            }}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            {item.label}
          </button>
        )
      )}
    </div>
  )
}

const AuthButtons = () => (
  <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
    <Link
      href="/login"
      className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-center"
    >
      Masuk
    </Link>
    <Link
      href="/signup"
      className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors text-center"
    >
      Daftar
    </Link>
  </div>
)
