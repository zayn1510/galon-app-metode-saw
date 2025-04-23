'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const breadcrumbs = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const name = segment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  
    return (
      <span key={href} className="text-sm text-gray-700 font-medium">
        <Link href={href} className="hover:text-indigo-600 hover:underline transition-colors duration-150 capitalize">
          {name}
        </Link>
        {index < segments.length - 1 && <span className="mx-1 text-gray-400">/</span>}
      </span>
    );
  });
  

  return (
    <header className="bg-white shadow-sm w-full">
      <div className="px-4 lg:pl-6 pr-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h1 className="text-base font-semibold text-gray-800">
            {segments.length === 0 ? 'Dashboard' : breadcrumbs}
          </h1>
        </div>
        <div className="flex items-center ml-auto space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <div className="flex items-center">
          <div className="relative h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
            <Image
              src="/icon/219983.png"
              alt="User profile"
              fill
              className="object-cover"
               sizes="(max-width: 768px) 32px, 40px"
            />
          </div>
          <span className="ml-2 text-sm font-medium text-gray-700">John Doe</span>
        </div>

        </div>
      </div>
    </header>
  );
}
