'use client'
import Image from 'next/image'
import { FaMapMarkerAlt, FaStar, FaShoppingCart, FaWhatsapp } from 'react-icons/fa'
import ProductCard from './components/ProductCard'
import NavigationButtons from './components/NavigationButton'
import { TokenResource, UserProfil, UserToken } from '@/types/login'
import { API_ENDPOINT } from '@/config/api'
import { UserLocation } from '@/types/users'
import { useEffect, useState } from 'react'
import useGeolocation from '@/hooks/useGeoLocation'
import { useSendLocation } from '@/hooks/useSendLocation'
import { Ratings } from '@/types/rating'

export default function ProductGalon({ depots, decoded, user_token, user_location }:
   { depots: ProductsResources[],
     decoded: UserToken | null,
     user_token: string,
     user_location: UserLocation | null }) {

  const [checkingLocation, setCheckingLocation] = useState(false);
  const { latitude, longitude, location, error, startGeolocationWatch } = useGeolocation();
  const { sendLocation } = useSendLocation();


  useEffect(() => {
    if (latitude && longitude) {
      handleSendLocation();
    }
  }, [latitude, longitude]);

  const handleSendLocation = async () => {
    if (latitude && longitude) {
      try {
        setCheckingLocation(true); // Menandakan proses sedang berlangsung

        // Kirim lokasi ke server
        const response = await sendLocation(latitude, longitude, user_token, { id: decoded?.id });

        if (response.status) {
          // Jika pengiriman sukses, reload halaman menggunakan window.location.reload()
          window.location.reload();
        }
      } catch (err) {
        console.error('Error sending location:', err);
      } finally {
        setCheckingLocation(false); // Reset status setelah selesai
      }
    }
  };
  const handleCheckLocation = async () => {
    try {
      setCheckingLocation(true); // Set status sebelum mulai
      startGeolocationWatch(); // Mulai memantau lokasi
    } catch (err) {
      console.error(err);
    } finally {
      setCheckingLocation(false); // Reset status setelah selesai
    }
  };

  return (
    <section id="rekomendasi" className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800 mb-4">
            Rekomendasi Terdekat
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Galon Berkualitas di Sekitarmu
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pesan sekarang dan dapatkan dalam waktu kurang dari 30 menit
          </p>
        </div>

        {/* Cek apakah user_location ada atau id user_location 0 */}
        {user_location?.id === 0 ? (
          <div className="text-center col-span-full">
            <p className="text-lg text-red-600 mb-4">
              Lokasi Anda belum terdaftar atau tidak terdeteksi. 
              Silakan periksa kembali lokasi Anda.
            </p>
            <button
              onClick={handleCheckLocation}
              disabled={checkingLocation}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              {checkingLocation ? "Memeriksa lokasi..." : "Periksa Lokasi"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {depots.length === 0 ? (
              <div className="text-center col-span-full">Tidak ada produk ditemukan.</div>
            ) : (
              depots.map((product) => (
                <ProductCard user_token={user_token} decoded={decoded} key={product.id_depot} product={product} />
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}
