"use client";

import {TrashIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { UsersResource } from "@/types/users";

type Props = {
  data: UsersResource[];
  refreshData: () => void;
  message: { text: string; status: boolean | null };
  setMessage: (message: { text: string; status: boolean | null }) => void;
  currentPage:number;
  itemsPerPage:number;
  onPageChange: (page: number) => void;
};

export default function UsersCard({ data,currentPage,itemsPerPage }:Props) {
    const [loading, setLoading] = useState(true);
  

    const [, setIsModalConfirm] = useState(false);
    
    const [, setItemToDelete] = useState<UsersResource | null>(null);
    const startIndex = (currentPage - 1) * itemsPerPage;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
if (loading) {
    return (
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full border border-gray-200 bg-white shadow-sm rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b text-center text-sm font-semibold text-gray-700">#</th>
              <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Name</th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Email</th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Username</th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Role</th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-4 py-2 border-b text-center text-sm font-semibold text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {Array(5).fill(0).map((_, index) => (
              <tr key={index} className="animate-pulse">
                <td className="px-4 py-2 border-b">
                  <div className="w-10 h-4 bg-gray-300 text-center rounded"></div>
                </td>
                <td className="px-4 py-2 border-b text-center">
                  <div className="w-24 h-6 bg-gray-300 rounded-full"></div>
                </td>
                <td className="px-4 py-2 border-b text-center">
                  <div className="w-24 h-6 bg-gray-300 rounded-full"></div>
                </td>
                <td className="px-4 py-2 border-b text-center">
                  <div className="w-24 h-6 bg-gray-300 rounded-full"></div>
                </td>
                <td className="px-4 py-2 border-b text-center">
                  <div className="w-24 h-6 bg-gray-300 rounded-full"></div>
                </td>
                <td className="px-4 py-2 border-b text-center">
                  <div className="w-24 h-6 bg-gray-300 rounded-full"></div>
                </td>
                <td className="px-4 py-2 border-b text-center">
                  <div className="w-24 h-6 bg-gray-300 rounded-full"></div>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  const handleConfirmDelete = (item: UsersResource) => {
    setItemToDelete(item);
    setIsModalConfirm(true);
};

if (data.length === 0) {
return (
  <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md shadow">
    Tidak ada data pengguna tersedia.
  </div>
);
}

  return (
      <table className="min-w-full border border-gray-200 bg-white shadow-sm rounded-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">#</th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Name</th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Email</th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Username</th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Role</th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Status</th>
            <th className="px-4 py-2 border-b text-center text-sm font-semibold text-gray-700">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id} className="hover:bg-gray-50 transition">
              <td className="px-4 py-2 border-b">{startIndex + index + 1}</td>
              <td className="px-4 py-2 border-b">
                  <a
                    href={`/dashboard/users/${item.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {item.name}
                  </a>
                </td>
              <td className="px-4 py-2 border-b">{item.email}</td>
              <td className="px-4 py-2 border-b">{item.username}</td>
              <td className="px-4 py-2 border-b">{item.role}</td>
              <td
                  className={`px-4 py-2 border-b ${
                    item.status === "active"
                      ? "text-green-600"
                      : item.status === "inactive"
                      ? "text-yellow-600"
                      : item.status === "banned"
                      ? "text-red-600"
                      : ""
                  }`}
                >
                  {item.status}
              </td>

              <td className="px-4 py-2 border-b text-center space-x-2">
                <button
                  onClick={() => handleConfirmDelete(item)}
                  className="inline-flex items-center justify-center gap-1 px-3 py-1.5 text-sm text-red-600 border border-red-200 rounded-full hover:bg-red-50 transition"
                >
                  <TrashIcon className="h-4 w-4" />
                  <span>Hapus</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  );
}
