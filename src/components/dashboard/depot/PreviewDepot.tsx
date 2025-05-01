'use client';

import { useParams, useRouter } from 'next/navigation';
import { DepotResource } from '@/types/depot';
import Sidebar from '../components/layout/navigations/components/SideBar';
import Header from '../components/layout/navigations/components/Header';
import { MapPin, Phone, Star, ChevronLeft, Clock, DollarSign, Percent, Navigation, Info } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { API_ENDPOINT } from '@/config/api';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UsersResource } from '@/types/users';
import Image from 'next/image';

type Props = {
  user:UsersResource
}
export default function DepotPreview({user}:Props) {
  const router = useRouter();
  const { id } = useParams();
  const [depot, setDepot] = useState<DepotResource>();
  const [otherDepots, setOtherDepots] = useState<DepotResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('info');

  const DetailDepot = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(API_ENDPOINT.depot + '/' + id, {
        method: "GET",
        credentials: "include"
      });
      const result = await res.json();
  
      if (!res.ok) {
        toast.error('Gagal memuat data depot', { position: 'top-right' });
        return;
      }
  
      if (result.status) {
        const { data } = result;
        setDepot(data);
        
        // Load other depots
        const otherRes = await fetch(API_ENDPOINT.depot, {
          method: "GET",
          credentials: "include"
        });
        const otherResult = await otherRes.json();
        if (otherResult.status) {
          setOtherDepots(otherResult.data.filter((d: DepotResource) => d.id !== data.id));
        }
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat memuat data', { position: 'top-right' });
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id]);
  useEffect(() => {
    if (id) {
      DetailDepot();
    }
  }, [id, DetailDepot]);
  

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Tersalin ke clipboard', { position: 'top-right', autoClose: 1500 });
  };

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <Sidebar user={user} />
      <div className="flex flex-col flex-1 ml-0 lg:ml-64 xl:ml-70 2xl:ml-80">
        <Header user={user} />
        
        {/* Toast Container */}
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          toastClassName="shadow-lg"
          progressClassName="bg-blue-500"
        />

        <main className="flex-1 p-6 flex flex-col xl:flex-row gap-6">
          {/* Main Content */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden transition-all flex-1">
            {loading ? (
              <div className="p-6 space-y-6">
                <Skeleton height={320} className="mb-6 rounded-xl" />
                <Skeleton count={5} height={24} />
              </div>
            ) : (
              <>
                {/* Hero Image */}
                <div className="relative h-80 bg-gradient-to-r from-gray-100 to-gray-200 overflow-hidden">
                  {depot?.foto ? (
                  <div className="relative w-full h-64"> {/* pastikan ada tinggi */}
                  <Image
                    src={`http://localhost:8022/api/v1/depot/preview/${depot.foto}?v=${
                      depot.updated_at ? new Date(depot.updated_at).getTime() : ''
                    }`}
                    alt={depot.nama_depot}
                    fill
                    className="object-cover transition-all duration-500 hover:scale-105"
                  />
                </div>
                
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <span className="text-gray-400">Tidak ada gambar tersedia</span>
                    </div>
                  )}
                  
                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex flex-col justify-between p-6">
                    <div className="flex justify-between items-start">
                      <div className="bg-white/90 backdrop-blur-sm text-gray-800 text-sm font-medium px-3 py-1.5 rounded-full shadow-sm flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {depot?.kecamatan_name}
                      </div>
                      <div className="bg-yellow-500/90 backdrop-blur-sm text-white font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow">
                        <Star className="w-4 h-4 fill-current" />
                        <span>{depot?.rating?.toFixed(1) || '0.0'}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h1 className="text-3xl font-bold text-white drop-shadow-lg">
                        {depot?.nama_depot}
                      </h1>
                      <p className="text-white/90 flex items-center gap-2 mt-1 drop-shadow">
                        <MapPin className="w-4 h-4" />
                        {depot?.alamat}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Navigation Bar */}
                  <div className="flex border-b border-gray-200 mb-6">
                    <button
                      onClick={() => setActiveTab('info')}
                      className={`px-4 py-2 font-medium text-sm flex items-center gap-2 ${activeTab === 'info' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      <Info className="w-4 h-4" />
                      Informasi
                    </button>
                    <button
                      onClick={() => setActiveTab('location')}
                      className={`px-4 py-2 font-medium text-sm flex items-center gap-2 ${activeTab === 'location' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      <Navigation className="w-4 h-4" />
                      Lokasi
                    </button>
                  </div>

                  {/* Back Button */}
                  <div className="flex justify-end mb-6">
                    <button
                      onClick={() => router.push('/dashboard/depot')}
                      className="flex items-center gap-2 text-blue-600 hover:text-white border border-blue-600 hover:bg-blue-600 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium whitespace-nowrap"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Kembali ke Daftar
                    </button>
                  </div>

                  {/* Info Tab */}
                  {activeTab === 'info' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div 
                        className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors cursor-pointer"
                        onClick={() => copyToClipboard(depot?.nomor_handphone || '')}
                      >
                        <div className="text-xs text-gray-500 mb-1 flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Nomor HP
                        </div>
                        <div className="font-medium text-gray-800 truncate">
                          {depot?.nomor_handphone || '-'}
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <div className="text-xs text-gray-500 mb-1 flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          Harga
                        </div>
                        <div className="font-medium text-gray-800">
                          Rp{depot?.harga?.toLocaleString('id-ID') || '0'}
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <div className="text-xs text-gray-500 mb-1 flex items-center gap-2">
                          <Percent className="w-4 h-4" />
                          Diskon
                        </div>
                        <div className="font-medium text-gray-800">
                          {depot?.diskon || '0'}%
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <div className="text-xs text-gray-500 mb-1 flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Jam Operasional
                        </div>
                        <div className="font-medium text-gray-800">
                          08:00 - 20:00
                        </div>
                      </div>

                      <div 
                        className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors cursor-pointer"
                        onClick={() => copyToClipboard(`${depot?.latitude}, ${depot?.longitude}`)}
                      >
                        <div className="text-xs text-gray-500 mb-1">Koordinat</div>
                        <div className="font-medium text-gray-800 truncate">
                          {depot?.latitude}, {depot?.longitude}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Location Tab */}
                  {activeTab === 'location' && (
                    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 h-64 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Navigation className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="font-medium text-gray-800 mb-2">Peta Lokasi</h3>
                        <p className="text-gray-500 text-sm max-w-md mx-auto">
                          {depot?.nama_depot} terletak di {depot?.alamat}, Kecamatan {depot?.kecamatan_name}
                        </p>
                        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                          Buka di Google Maps
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Sidebar - Other Depots */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 w-full xl:w-96">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-3 border-b border-gray-100 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              Depot Terdekat Lainnya
            </h3>

            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton circle width={40} height={40} />
                    <div className="flex-1">
                      <Skeleton height={16} width="70%" />
                      <Skeleton height={12} width="50%" className="mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <ul className="space-y-3">
                {otherDepots.length > 0 ? (
                  otherDepots
                    .slice(0, 5) // Limit to 5 items
                    .map((otherDepot) => (
                      <li key={otherDepot.id}>
                        <a
                          href={`/dashboard/depot/${otherDepot.id}`}
                          className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                        >
                          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                            {otherDepot.foto && (
                              
                              <div className="relative w-full h-64"> {/* Ubah `h-64` sesuai kebutuhan */}
                              <Image 
                                src={`http://localhost:8022/api/v1/depot/preview/${otherDepot.foto}`} 
                                alt={otherDepot.nama_depot}
                                fill
                                className="object-cover"
                              />
                            </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-gray-700 group-hover:text-blue-600 transition-colors truncate font-medium">
                              {otherDepot.nama_depot}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              <span>{otherDepot.rating?.toFixed(1) || '0.0'}</span>
                              <span className="text-gray-300">•</span>
                              <span className="truncate">{otherDepot.kecamatan_name}</span>
                            </div>
                          </div>
                          <ChevronLeft className="w-4 h-4 text-gray-400 transform rotate-180" />
                        </a>
                      </li>
                    ))
                ) : (
                  <li className="text-center py-6">
                    <div className="text-gray-400 mb-2">Tidak ada depot terdekat</div>
                    <button 
                      onClick={() => router.push('/dashboard/depot/create')}
                      className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors"
                    >
                      + Tambah Depot Baru
                    </button>
                  </li>
                )}
              </ul>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}