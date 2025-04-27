'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Power, Bell, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { UsersResource } from '@/types/users';

type Props = {
  user:UsersResource
}
export default function Header({user}:Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const segments = pathname.split('/').filter(Boolean);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const breadcrumbs = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const name = segment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  
    return (
      <span key={href} className="flex items-center">
        <Link 
          href={href} 
          className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors duration-200 capitalize"
        >
          {name}
        </Link>
        {index < segments.length - 1 && (
          <span className="mx-2 text-gray-300">/</span>
        )}
      </span>
    );
  });

  const handleLogout = async () => {
    try {
      // Call API route to clear server-side cookies
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'same-origin', // Important for cookies
      });
  
      if (response.ok) {
        // Redirect to login page with cache clearing
        router.push('/login');
        router.refresh(); // Important to clear client cache
      } else {
        console.error('Logout failed');
        // Consider adding toast notification here
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
      <div className="px-6 py-3 flex justify-between items-center">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2">
          <h1 className="text-lg font-semibold text-gray-800 flex items-center">
            {segments.length === 0 ? (
              'Dashboard'
            ) : (
              <nav className="flex items-center space-x-2">
                <Link href="/" className="text-indigo-600 hover:text-indigo-800">
                  Home
                </Link>
                <span className="text-gray-300">/</span>
                {breadcrumbs}
              </nav>
            )}
          </h1>
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-4">
          {/* Notification Bell */}
          <button 
            className="p-2 rounded-full hover:bg-gray-50 relative transition-colors duration-200"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5 text-gray-500" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {/* User Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              className="flex items-center space-x-2 focus:outline-none"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="relative h-8 w-8 rounded-full bg-gradient-to-br from-indigo-100 to-blue-100 overflow-hidden">
                <Image
                  src="/icon/219983.png"
                  alt="User profile"
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              </div>
              <span className="hidden sm:inline-block text-sm font-medium text-gray-700">{user.name}</span>
              <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-100">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm text-gray-700">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
                <Link
                  href="/dashboard/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                >
                  Profile Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 flex items-center"
                >
                  <Power className="h-4 w-4 mr-2 text-red-500" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}