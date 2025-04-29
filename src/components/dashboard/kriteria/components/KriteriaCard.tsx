"use client";

import { API_ENDPOINT } from "@/config/api";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { Message } from "../../components/Message";
import KriteriaModal from "./KriteriaModal";

type Kriteria = {
  id:number,
  keterangan:string,
  bobot:number,
  tipe:number
}

type Props = {
  data: Kriteria[];
  refreshData: () => void;
  message: { text: string; status: boolean | null };
  setMessage: (message: { text: string; status: boolean | null }) => void;
  currentPage:number;
  itemsPerPage:number;
  onPageChange: (page: number) => void;
};

export default function KriteraCard({ data,refreshData,message,setMessage,currentPage,itemsPerPage,onPageChange}:Props) {
    const [loading, setLoading] = useState(true);
    const [selectedKriteria, setSelectedKriteria] = useState<Kriteria | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalConfirm, setIsModalConfirm] = useState(false);
    
    const [itemToDelete, setItemToDelete] = useState<Kriteria | null>(null);
    const startIndex = (currentPage - 1) * itemsPerPage;

    
    
    const handleEdit = async (item: Kriteria) => {
      setSelectedKriteria(item);
      setIsModalOpen(true)
    };
  
  const ConfirmationModal = () => {
    if (!itemToDelete) return null;
  
    return (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Konfirmasi Penghapusan</h3>
          <p className="text-sm text-gray-600 mb-4">
            Apakah Anda yakin ingin menghapus Kriteria: <strong>{itemToDelete.keterangan}</strong>?
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
  
  const handleDelete = async (item: Kriteria) => {
    try {
        const res = await fetch(API_ENDPOINT.kriteria+"/"+item.id,{
            method:"DELETE",
            headers: {
              'Content-Type': 'application/json',
              },
            credentials : 'include'
        });
        const result = await res.json();
        if (!res.ok) {
            setMessage({
                text:"Gagal menghapus Kriteria",
                status:false
            });
        }
        if (result.status) {
            setMessage({
                text:"Kriteria berhasil dihapus",
                status:result.status
            });
        }
    } catch (error) {
        setMessage({
            text: "Terjadi kesalahan, coba lagi nanti.",
            status:false,
          });
    } finally {
      const index = data.findIndex(d => d.id === item.id);
      const isLastItemOnPage = data.length === 1;
      
      if (currentPage > 1 && isLastItemOnPage) {
          onPageChange(currentPage - 1);
      } else {
          refreshData();
      }
      
    
        setIsModalConfirm(false);
      }
  };
  useEffect(() => {
    // Simulasi loading selama 1 menit (60 detik)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 60 detik

    return () => clearTimeout(timer); // Bersihkan timer saat komponen unmount
  }, []);
if (loading) {
    return (
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full border border-gray-200 bg-white shadow-sm rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b text-center text-sm font-semibold text-gray-700">#</th>
              <th className="px-4 py-2 border-b text-center text-sm font-semibold text-gray-700">Kecamatan</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  const handleConfirmDelete = (item: Kriteria) => {
    setItemToDelete(item);
    setIsModalConfirm(true);
};
if (message.text.includes("Token")) {
  return (
    <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md shadow">
        {message.text}
    </div>
  );
}
if (data.length === 0) {
return (
  <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md shadow">
    Tidak ada data Kecamatan tersedia.
  </div>
);
}

  return (
    <div className="overflow-x-auto mt-6">
      {isModalOpen && selectedKriteria && (
 <KriteriaModal setMessage={setMessage}
         refreshData={refreshData}
   isOpen={isModalOpen} 
   selectedKriteria={selectedKriteria}
   onClose={() => setIsModalOpen(false)}
  />
)}

          {isModalConfirm && <ConfirmationModal />}
          <Message onClear={()=>setMessage({text:"",status:null})} message={message} />
      <table className="min-w-full border border-gray-200 bg-white shadow-sm rounded-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">#</th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Kriteria</th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Bobot</th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Tipe</th>            
            <th className="px-4 py-2 border-b text-center text-sm font-semibold text-gray-700">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id} className="hover:bg-gray-50 transition">
              <td className="px-4 py-2 border-b">{startIndex + index + 1}</td>
              <td className="px-4 py-2 border-b">{item.keterangan}</td>
              <td className="px-4 py-2 border-b">{item.bobot}</td>
              <td
                className={`px-4 py-2 border-b font-medium text-center ${
                  item.tipe ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"
                }`}
              >
                {item.tipe ? "Benefit" : "Cost"}
              </td>

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
  );
}
