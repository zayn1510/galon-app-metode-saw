"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { API_ENDPOINT } from "@/config/api";

type KecamatanRequest = {
   nama_kecamatan:string
}

type Kecamatan = {
  id: number;
 nama_kecamatan:string
};

type KriteriaModalProps = {
  isOpen: boolean;
  onClose: () => void;
  refreshData: () => void;
  setMessage: (message: { text: string; status: boolean | null }) => void;
  selectedKecamatan?: Kecamatan | null;
};

export default function KecamatanModal({ isOpen, onClose,refreshData,setMessage,selectedKecamatan}:KriteriaModalProps) {
  const [formData, setFormData] = useState<KecamatanRequest>({
    nama_kecamatan:""
  });

  useEffect(() => {
    if (selectedKecamatan) {
      setFormData({
        nama_kecamatan:selectedKecamatan.nama_kecamatan
      });
    } else {
      setFormData({ nama_kecamatan:"" }); // reset form saat tambah
    }
  }, [selectedKecamatan, isOpen]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
        const payload : KecamatanRequest ={
            nama_kecamatan:formData.nama_kecamatan
        }
        let url = API_ENDPOINT.kecamatan;
        let method = "POST";
        
        if (selectedKecamatan) {
          url = `${API_ENDPOINT.kecamatan}/${selectedKecamatan.id}`;
          method = "PUT";
        }
        
        const res = await fetch(url, {
            method,
            headers: {
              "Content-Type": "application/json", 
            },
            body: JSON.stringify(payload),
          });
        const result = await res.json();
          if (!res.ok) {
             setMessage({
            text: selectedKecamatan ? "kecamatan gagal diperbarui" : 'Kecamatan gagal ditambahkan!',
            status: true
        });
        }
        if (result.status) {
            setMessage({
                text:selectedKecamatan ? "Kecamatan berhasil diperbarui" : "Kecamatan berhasil dibuat",
                status:result.status
            });
        }
            setFormData({nama_kecamatan:""}); // Reset     
    } catch (error) {
      setMessage({
        text: 'Terjadi kesalahan saat menambahkan Kecamatan.',
        status: false
    });
    } finally {
        onClose()
        refreshData();
        selectedKecamatan=null
    }
   
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Modal panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
          <Dialog.Title className="text-lg font-semibold text-gray-800">
            {selectedKecamatan ? "Edit Kecamatan" : "Tambah Kecamatan"}
          </Dialog.Title>

            <button onClick={onClose}>
              <XMarkIcon className="h-6 w-6 text-gray-500 hover:text-gray-700" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Kecamatan</label>
              <input
                type="text"
                name="nama_kecamatan"
                value={formData.nama_kecamatan}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white text-gray-900 py-2 px-4 mt-1 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
              />
            </div>
          </div>

          <div className="mt-6 text-right">
          <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {selectedKecamatan ? "Update" : "Simpan"}
        </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
