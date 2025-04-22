// components/Sidebar.tsx
'use client';

import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ChevronDown, ChevronUp, Menu, Bell, X } from 'lucide-react';
import { useMenu } from '../hooks/useMenu';
import { useEffect, useState } from 'react';

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { menuItems, activeMenu, openSubmenu, toggleSubmenu } = useMenu();
  const [isOpen, setIsOpen] = useState(false);

  // Handle resize dan navigasi
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Tutup sidebar saat navigasi
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-6 left-6 z-40 p-2.5 rounded-md bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-40 w-72 h-screen bg-gradient-to-b from-blue-900 to-blue-950 shadow-xl transform transition-transform duration-300 ease-in-out 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:z-30 text-white`}
      >
        {/* Header Sidebar */}
        <div className="flex items-center justify-between p-5 border-b border-blue-800/50">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center text-white font-bold border border-white/10">
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">DP</span>
            </div>
            <span className="text-xl font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              DepotBest
            </span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Menu Navigasi */}
        <nav className="p-4 overflow-y-auto h-[calc(100vh-120px)] custom-scrollbar">
          <ul className="space-y-1.5">
            {menuItems.map((item) => (
              <li key={item.path || item.name}>
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(item.name)}
                      className={`flex items-center justify-between w-full p-3 rounded-lg transition-all
                        ${openSubmenu === item.name ? 'bg-white/5' : 'hover:bg-white/5'}
                        ${activeMenu.startsWith('/data-master') ? 'border-l-2 border-blue-400' : ''}`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-1 rounded-md ${openSubmenu === item.name ? 'bg-blue-500/20' : 'bg-white/5'}`}>
                          {item.icon}
                        </div>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      {openSubmenu === item.name ? (
                        <ChevronUp className="w-4 h-4 text-blue-300" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-blue-300" />
                      )}
                    </button>
                    {openSubmenu === item.name && (
                      <ul className="ml-3 mt-1 space-y-1 pl-7 border-l border-blue-800/30 animate-submenu">
                        {item.submenu.map((subItem) => (
                          <li key={subItem.path}>
                            <button
                              onClick={() => {
                                handleNavigation(subItem.path);
                                setIsOpen(false); // Tutup sidebar setelah navigasi di mobile
                              }}
                              className={`flex items-center w-full p-2.5 rounded-lg transition-all group
                                ${activeMenu === subItem.path
                                  ? 'bg-blue-500/10 text-white border-l-2 border-blue-400'
                                  : 'hover:bg-white/5 text-blue-100'}`}
                            >
                              <span className="mr-3 opacity-80 group-hover:opacity-100">
                                {subItem.icon}
                              </span>
                              <span className="text-sm font-medium">{subItem.name}</span>
                              {activeMenu === subItem.path && (
                                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                              )}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => {
                      if (item.path) {
                        handleNavigation(item.path);
                        setIsOpen(false); // Tutup sidebar setelah navigasi di mobile
                      }
                    }}
                    className={`flex items-center w-full p-3 rounded-lg transition-all hover:bg-white/5 space-x-3
                      ${activeMenu === item.path 
                        ? 'bg-white/5 text-white border-l-2 border-blue-400' 
                        : 'text-blue-100'}`}
                  >
                    <div className={`p-1 rounded-md ${activeMenu === item.path ? 'bg-blue-500/20' : 'bg-white/5'}`}>
                      {item.icon}
                    </div>
                    <span className="font-medium">{item.name}</span>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer Sidebar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-800/50 bg-blue-900/30 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/20">
              <Image 
                src="/user-avatar.jpg" 
                alt="User profile" 
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-medium text-white">John Doe</p>
              <p className="text-xs text-blue-300/80">Super Admin</p>
            </div>
          </div>
        </div>
      </aside>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-submenu {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </>
  );
}
