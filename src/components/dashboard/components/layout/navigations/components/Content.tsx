// components/MainContent.tsx
'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface MainContentProps {
  children: ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
  const pathname = usePathname();

  return (
    <main className="flex flex-1 bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="lg:block hidden w-72 bg-gradient-to-b from-blue-900 to-blue-950 text-white">
        {/* Sidebar content */}
        {/* Bisa memanggil Sidebar yang sudah kita buat */}
      </aside>

      {/* Main Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="mb-5">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          <p className="text-gray-500">Welcome back, admin</p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-md p-5">{children}</div>
      </div>
    </main>
  );
}
