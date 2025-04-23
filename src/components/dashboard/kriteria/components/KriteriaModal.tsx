"use client";

import { useEffect, useRef, useState } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { API_ENDPOINT } from "@/config/api";
import { Message } from "../../components/Message";

type KriteriaRequest = {
    keterangan:string,
    bobot:number,
    tipe:number
}
type Kriteria = {
  id:number,
  keterangan:string,
  bobot:number,
  tipe:number
}



type KriteriaModalProps = {
  isOpen: boolean;
  onClose: () => void;
  refreshData: () => void;
  setMessage: (message: { text: string; status: boolean | null }) => void;
  selectedKriteria?: Kriteria | null;
  token : string | null
};

export default function KriteriaModal({ isOpen, onClose,refreshData,setMessage,selectedKriteria,token}:KriteriaModalProps) {
  const [formData, setFormData] = useState<KriteriaRequest>({
    keterangan: "",
    bobot: 0,
    tipe: 1,
  });
  const [msgModal,setMsgModal] = useState<{text:string,status:boolean}>({
    text:"",
    status:true
  })
  const keteranganRef = useRef<HTMLInputElement>(null);
const bobotRef = useRef<HTMLInputElement>(null);
const tipeRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (selectedKriteria) {
      setFormData({
        keterangan: selectedKriteria.keterangan,
        bobot: selectedKriteria.bobot,
        tipe: selectedKriteria.tipe,
      });
    } else {
      setFormData({ keterangan: "", bobot: 0, tipe: 1 }); // reset form saat tambah
    }
  }, [selectedKriteria, isOpen]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e:React.FormEvent) => {
    try {
        e.preventDefault();

        if (!formData.keterangan) {
          setMsgModal({ text: "Kriteria wajib diisi", status: false });
          keteranganRef.current?.focus();
          return;
        }
      
        if (!formData.bobot) {
          setMsgModal({ text: "Bobot wajib diisi", status: false });
          bobotRef.current?.focus();
          return;
        }
      
        if (!formData.tipe) {
          setMessage({ text: "Tipe wajib dipilih", status: false });
          tipeRef.current?.focus();
          return;
        }
        const payload : KriteriaRequest ={
            keterangan:formData.keterangan,
            bobot:Number(formData.bobot),
            tipe:formData.tipe
        }
        let url = API_ENDPOINT.kriteria;
        let method = "POST";
        
        if (selectedKriteria) {
          url = `${API_ENDPOINT.kriteria}/${selectedKriteria.id}`;
          method = "PUT";
        }
        
        const res = await fetch(url, {
            method,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
              },
            body: JSON.stringify(payload),
          });
        if (!res.ok) {
          const err = await res.json();
             setMessage({
            text: "Error in server :"+err.message,
            status: false
        });
        return;
        }
        const result = await res.json();
      
        if (result.status) {
            setMessage({
                text:"Kriteria berhasil dibuat",
                status:result.status
            });
        }
        onClose() 
            refreshData();
            setFormData({ keterangan: "", bobot: 0, tipe: 1 }); 
           
    } catch (error) {
      setMessage({
        text: 'Terjadi kesalahan saat menambahkan kriteria.',
        status: false
    });
    } finally {
      
        selectedKriteria =null;
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
            {selectedKriteria ? "Edit Kriteria" : "Tambah Kriteria"}
          </Dialog.Title>

            <button onClick={onClose}>
              <XMarkIcon className="h-6 w-6 text-gray-500 hover:text-gray-700" />
            </button>
          </div>
        <Message message={msgModal} onClear={()=>setMsgModal({text:"",status:true})}/>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Kriteria</label>
              <input
              ref={keteranganRef}
                type="text"
                name="keterangan"
                value={formData.keterangan}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white text-gray-900 py-2 px-4 mt-1 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
              />
            </div>
            <div>
  <label className="block text-sm font-medium text-gray-700">Bobot</label>
  <input
  ref={bobotRef}
    type="number"
    name="bobot"
    value={formData.bobot}
    onChange={handleChange}
    className="w-full rounded-lg border border-gray-300 bg-white text-gray-900 py-2 px-4 mt-1 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
  />
</div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Tipe</label>
                <div className="relative mt-1">
                    <select
                    ref={tipeRef}
                    name="tipe"
                    value={formData.tipe}
                    onChange={handleChange}
                    className="block appearance-none w-full rounded-lg border border-gray-300 bg-white text-gray-900 py-2 pl-3 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                    <option value={1}>Benefit</option>
                    <option value={0}>Cost</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-400 pointer-events-none">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    </div>
                </div>
                </div>

          </div>

          <div className="mt-6 text-right">
          <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {selectedKriteria ? "Update" : "Simpan"}
        </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
