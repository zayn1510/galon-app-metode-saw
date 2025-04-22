'use client';

import { useParams, useRouter } from 'next/navigation';
import { DepotResource } from '@/types/depot';
import Sidebar from '../components/layout/navigations/components/SideBar';
import Header from '../components/layout/navigations/components/Header';
import { MapPin, Phone, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { API_ENDPOINT } from '@/config/api';

export default function DepotPreview() {
  const router = useRouter();
  const { id } = useParams();
  const [message, setMessage] = useState<{ text: string; status: boolean }>({
    text: '',
    status: false,
  });
  const [depot, setDepot] = useState<DepotResource>();
  const [otherDepots, setOtherDepots] = useState<DepotResource[]>([]); // Daftar depot lainnya

  const DetailDepot = async () => {
    try {
      const res = await fetch(API_ENDPOINT.depot + '/' + id);
      const result = await res.json();

      if (!res.ok) {
        setMessage({
          text: 'Ada kesalahan saat memuat data di server!',
          status: true,
        });
      }
      if (result.status) {
        const { data } = result;
        setDepot(data);
        const otherRes = await fetch(API_ENDPOINT.depot);
        const otherResult = await otherRes.json();
        if (otherResult.status) {
          setOtherDepots(otherResult.data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      DetailDepot();
    }
  }, [id]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-0 lg:ml-64 xl:ml-70 2xl:ml-80">
        <Header />
        <main className="flex-1 p-6 flex flex-col md:flex-row gap-6">
          {/* Detail Depot */}
          <div className="max-w-5xl bg-white border border-gray-200 rounded-3xl shadow-md overflow-hidden transition-all flex-1">
            {/* Gambar */}
            <div className="h-72 bg-gray-100 relative overflow-hidden">
              {depot?.foto && (
                <img
                  src={`http://localhost:8022/api/v1/depot/preview/${depot.foto}?v=${
                    depot.updated_at ? new Date(depot.updated_at).getTime() : ''
                  }`}
                  alt={depot.nama_depot}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute top-4 left-4 bg-white text-xs font-medium px-3 py-1 rounded-md shadow-sm">
                {depot?.kecamatan_name}
              </div>
              <div className="absolute top-4 right-4 bg-yellow-400 text-white font-bold px-3 py-1 rounded-md flex items-center gap-1 shadow">
                <Star className="w-4 h-4" />
                {depot?.rating.toFixed(1)}
              </div>
            </div>

            {/* Konten */}
            <div className="p-6 space-y-5">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {depot?.nama_depot}
                </h2>
                <button
                  onClick={() => router.push('/dashboard/depot')}
                  className="text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-md transition text-sm font-medium"
                >
                  ← Kembali ke Daftar
                </button>
              </div>

              <p className="text-gray-600 text-sm flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                {depot?.alamat}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-2 text-sm text-gray-800">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Nomor HP</div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    {depot?.nomor_handphone}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Latitude</div>
                  {depot?.latitude}
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Longitude</div>
                  {depot?.longitude}
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Harga</div>
                  Rp{depot?.harga.toLocaleString()}
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Diskon</div>
                  {depot?.diskon}%
                </div>
              </div>
            </div>
          </div>

          {/* Daftar Depot Lainnya */}
          <div className="bg-white border border-gray-200 rounded-3xl shadow-md p-6 w-full md:w-1/3">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Depot Lainnya</h3>
          
                <ul className="space-y-4">
                {otherDepots.length > 0 ? (
                    otherDepots
                    .filter((otherDepot) => otherDepot.id !== Number(id)) // Filter depot yang tidak sama dengan ID saat ini
                    .map((otherDepot) => (
                        <li key={otherDepot.id} className="flex items-center justify-between">
                        <a
                            href={`/dashboard/depot/${otherDepot.id}`}
                            className="text-blue-600 hover:text-blue-800 transition"
                        >
                            {otherDepot.nama_depot}
                        </a>
                        </li>
                    ))
                ) : (
                    <li className="text-gray-500">Tidak ada depot lain untuk ditampilkan.</li>
                )}
                </ul>

          </div>
        </main>

        {/* Pesan error kalau ada */}
        {message.status && (
          <div className="mt-4 text-sm text-red-500">{message.text}</div>
        )}
      </div>
    </div>
  );
}
