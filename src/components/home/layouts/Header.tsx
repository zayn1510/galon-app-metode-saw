"use client"

import Link from 'next/link'
import { FaUser, FaSignOutAlt } from 'react-icons/fa'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { jwtDecode } from 'jwt-decode'
import { TokenResource, UserToken } from '@/types/login'
import { UseAuthUser } from '@/hooks/useAuthUser'

export default function Header({ decoded }: { decoded:UserToken| null }) {
  const [username, setUsername] = useState<string | null>(null)
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Decode user_token saat komponen mount atau user_token berubah
  useEffect(() => {
    if (decoded) {
      try {
        setUsername(decoded.username)
      } catch (error) {
        console.error('Gagal decode token:', error)
      }
    } else {
      setUsername(null)
    }
  }, [decoded])

  // Close dropdown ketika klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  type DropdownItem = {
    label: string
    href?: string
    onClick?: () => void
    icon?: React.ReactNode
  }

  const dropdownItems: DropdownItem[] = [
    { 
      label: 'Profil Saya', 
      href: '/profil', 
      icon: <FaUser className="mr-2 text-blue-500" /> 
    },
    {
      label: 'Keluar',
      onClick: () => {
        // Handle logout logic
        setShowDropdown(false)
      },
      icon: <FaSignOutAlt className="mr-2 text-gray-500" />
    }
  ]

  const handleLogout = async () => {
      const {logout} = UseAuthUser();
      try {
        const res = await logout();
        if (res.success) {
            window.location.href="/";
        }
      } catch (error) {
        console.error(error);
      }
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-300"
            aria-label="Beranda GalonBest"
          >
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              GalonBest
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="#produk">Produk</NavLink>
            <NavLink href="#testimoni">Testimoni</NavLink>
            <NavLink href="#kontak">Kontak</NavLink>

            {username ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 focus:outline-none group"
                  aria-label="Menu pengguna"
                  aria-expanded={showDropdown}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center border border-blue-200 shadow-sm hover:shadow-md transition-all duration-200 group-hover:ring-2 group-hover:ring-blue-100">
                    <span className="text-blue-600 font-medium">
                      {username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700 hidden lg:inline">
                    {username}
                  </span>
                </button>

                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-1 z-50 border border-gray-100 overflow-hidden"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-blue-100">
                        <p className="text-sm font-medium text-gray-900">Halo, {username}</p>
                      </div>
                      {dropdownItems.map((item, index) => (
                        item.href ? (
                          <Link
                            key={index}
                            href={item.href}
                            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            onClick={() => setShowDropdown(false)}
                          >
                            {item.icon}
                            <span>{item.label}</span>
                          </Link>
                        ) : (
                          <button
                            key={index}
                            onClick={() => {
                              item.onClick?.()
                              handleLogout()
                            }}
                            className="flex items-center w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            {item.icon}
                            <span>{item.label}</span>
                          </button>
                        )
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="px-4 py-2 text-blue-600 border border-blue-100 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium hover:shadow-sm"
                >
                  Masuk
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:opacity-90 transition-all text-sm font-medium shadow-md hover:shadow-lg"
                >
                  Daftar
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-100"
            aria-label="Toggle menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-4 md:hidden flex flex-col space-y-2 overflow-hidden"
            >
              <MobileNavLink href="#produk">Produk</MobileNavLink>
              <MobileNavLink href="#testimoni">Testimoni</MobileNavLink>
              <MobileNavLink href="#kontak">Kontak</MobileNavLink>

              {username ? (
                <div className="flex flex-col space-y-2 mt-2 pt-2 border-t border-gray-100">
                  {dropdownItems.map((item, index) =>
                    item.href ? (
                      <Link
                        key={index}
                        href={item.href}
                        className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    ) : (
                      <button
                        key={index}
                        onClick={() => {
                          item.onClick?.()
                          handleLogout()
                          setIsMobileMenuOpen(false)
                        }}
                        className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-left"
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </button>
                    )
                  )}
                </div>
              ) : (
                <div className="flex flex-col space-y-3 mt-4 pt-4 border-t border-gray-100">
                  <Link
                    href="/login"
                    className="px-4 py-3 text-blue-600 border border-blue-100 rounded-lg hover:bg-blue-50 transition-colors text-center font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Masuk
                  </Link>
                  <Link
                    href="/signup"
                    className="px-4 py-3 text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:opacity-90 transition-opacity text-center font-medium shadow-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Daftar
                  </Link>
                </div>
              )}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

// Component Types
type NavLinkProps = {
  href: string
  children: React.ReactNode
}

const NavLink = ({ href, children }: NavLinkProps) => (
  <Link
    href={href}
    className="relative text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium text-sm after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full group"
  >
    {children}
    <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
  </Link>
)

const MobileNavLink = ({ href, children }: NavLinkProps) => (
  <Link
    href={href}
    className="px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
  >
    {children}
  </Link>
)