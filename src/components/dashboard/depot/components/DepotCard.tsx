"use client";

import { API_ENDPOINT } from "@/config/api";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import KecamatanModal from "./KecamatanModal";
import { Message } from "../../components/Message";
import { DepotResource } from "@/types/depot";
import { formatRupiah } from "@/config/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  data: DepotResource[];
  refreshData: () => void;
  message: { text: string; status: boolean | null };
  setMessage: (message: { text: string; status: boolean | null }) => void;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
};

export default function DepotCard({
  data,
  refreshData,
  message,
  setMessage,
  currentPage,
  itemsPerPage,
  onPageChange,
}: Props) {
  const [loading, setLoading] = useState(true);
  const [isModalConfirm, setIsModalConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<DepotResource | null>(null);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const router = useRouter();

  const handleEdit = (item: DepotResource) => {
    router.push("depot/edit/" + item.id);
  };

  const ConfirmationModal = () => {
    if (!itemToDelete) return null;

    return (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Konfirmasi Penghapusan</h3>
          <p className="text-sm text-gray-600 mb-4">
            Apakah Anda yakin ingin menghapus Depot: <strong>{itemToDelete.nama_depot}</strong>?
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setIsModalConfirm(false)}
              className="px-4 py-2 bg-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-400 transition"
            >
              Batal
            </button>
            <button
              onClick={() => handleDelete(itemToDelete)}
              className="px-4 py-2 bg-red-600 rounded-md text-sm text-white hover:bg-red-700 transition"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    );
  };

  const handleDelete = async (item: DepotResource) => {
    try {
      const res = await fetch(`${API_ENDPOINT.depot}/${item.id}`, { method: "DELETE", credentials:"include" });
      const result = await res.json();
      if (!res.ok || !result.status) {
        setMessage({
          text: `Gagal menghapus Depot : ${item.nama_depot}`,
          status: false,
        });
      } else {
        setMessage({
          text: `Depot ${item.nama_depot} berhasil dihapus`,
          status: true,
        });
      }
    } catch (error) {
      setMessage({
        text: "Terjadi kesalahan, coba lagi nanti.",
        status: false,
      });
    } finally {
      const isLastItemOnPage = data.length === 1;
      if (currentPage > 1 && isLastItemOnPage) {
        onPageChange(currentPage - 1);
      } else {
        refreshData();
      }
      setIsModalConfirm(false);
    }
  };

  const handleConfirmDelete = (item: DepotResource) => {
    setItemToDelete(item);
    setIsModalConfirm(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="overflow-x-auto rounded-2xl shadow-md border border-gray-200">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b text-center text-sm font-semibold text-gray-700">#</th>
              <th className="px-4 py-2 border-b text-center text-sm font-semibold text-gray-700">Depot</th>
              <th className="px-4 py-2 border-b text-center text-sm font-semibold text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <tr key={index} className="animate-pulse">
                  <td className="px-4 py-2 border-b">
                    <div className="w-10 h-4 bg-gray-300 rounded"></div>
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

  if (!message.status) {
    return (
      <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md shadow">
        {message.text}
      </div>
    );
  }
  if (data.length === 0) {
    return (
      <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md shadow">
        Tidak ada data Depot tersedia.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto mt-6">
      {isModalConfirm && <ConfirmationModal />}
      <Message onClear={() => setMessage({ text: "", status: null })} message={message} />
      <div className="w-full overflow-x-auto">
        <table className="min-w-full border border-gray-200 bg-white shadow-sm rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">#</th>
              <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Depot</th>
              <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Harga</th>
              <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Diskon</th>
              <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Rating</th>
              <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Nomor Handphone</th>
              <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Alamat</th>
              <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Kecamatan</th>
              <th className="px-4 py-2 border-b text-center text-sm font-semibold text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2 border-b">{startIndex + index + 1}</td>
                <td className="px-4 py-2 border-b">
                  <a
                    href={`/dashboard/depot/${item.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {item.nama_depot}
                  </a>
                </td>
                <td className="px-4 py-2 border-b">{formatRupiah(item.harga)}</td>
                <td className="px-4 py-2 border-b">{item.diskon} %</td>
                <td className="px-4 py-2 border-b">{item.rating}</td>
                <td className="px-4 py-2 border-b">{item.nomor_handphone}</td>
                <td className="px-4 py-2 border-b">{item.alamat}</td>
                <td className="px-4 py-2 border-b">{item.kecamatan_name}</td>
                <td className="px-4 py-2 border-b text-center space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="inline-flex items-center justify-center gap-1 px-3 py-1.5 text-sm text-blue-600 border border-blue-200 rounded-full hover:bg-blue-50 transition"
                  >
                    <PencilSquareIcon className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
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
      </div>
    </div>
  );
}
