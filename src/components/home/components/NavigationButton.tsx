"use client"

import { API_ENDPOINT } from '@/config/api'
import { useSendLocation } from '@/hooks/useSendLocation'

import { UserToken } from '@/types/login'
import { UserLocationRequest } from '@/types/users'
import { useEffect, useRef, useState } from 'react'
import { MdDirections, MdGpsFixed, MdLocationDisabled } from 'react-icons/md'

// Kalkulasi jarak antara dua titik koordinat (pakai rumus Haversine)
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRad = (value: number) => (value * Math.PI) / 180
  const R = 6371e3 // Radius bumi dalam meter
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c // jarak dalam meter
}

type Location = {
  latitude: number
  longitude: number
  depot?: string
}

export default function NavigationButtons({ productLocation, decoded,user_token }: { productLocation: Location, decoded: UserToken | null,user_token:string }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [location, setLocation] = useState<string>("Lokasi belum dideteksi.")
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)

  const lastSentLat = useRef(0)
  const lastSentLon = useRef(0)
  const debounceTimer = useRef<NodeJS.Timeout | null>(null)
  const { sendLocation } = useSendLocation();
  const openNavigationWithUserLocation = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await sendLocation(latitude,longitude,user_token, { id: decoded?.id });
      if (response.status) {
        const url = `https://www.google.com/maps/dir/?api=1` +
        `&origin=${latitude},${longitude}` +
        `&destination=${productLocation.latitude},${productLocation.longitude}`
        window.open(url, '_blank')
        return
      }
     
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal mendapatkan lokasi')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation tidak didukung oleh browser.');
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude: lat, longitude: lon, accuracy } = position.coords;
        setLatitude(lat);
        setLongitude(lon);
        setLocation(`Latitude: ${lat}, Longitude: ${lon}, Akurasi: ${accuracy} meter`);

        // Cek jarak perubahan dari lokasi terakhir
        const distance = calculateDistance(lastSentLat.current, lastSentLon.current, lat, lon);

        if (distance >= 5) { // baru kirim kalau pindah >= 5 meter
          if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
          }

          debounceTimer.current = setTimeout(() => {
            lastSentLat.current = lat;
            lastSentLon.current = lon;
          }, 5000); // debounce 5 detik
        }
      },
      (err) => {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError("Izin lokasi ditolak.");
            break;
          case err.POSITION_UNAVAILABLE:
            setError("Informasi lokasi tidak tersedia.");
            break;
          case err.TIMEOUT:
            setError("Permintaan lokasi timeout.");
            break;
          default:
            setError("Terjadi kesalahan tak dikenal.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    }
  }, []);

  return (
    <div className="flex flex-col space-y-2">
      <button
        onClick={openNavigationWithUserLocation}
        className="bg-gray-50 hover:bg-gray-100 text-gray-800 py-2 px-3 rounded-md text-sm flex items-center justify-center transition-colors border border-gray-200"
      >
        <MdDirections className="text-blue-500 mr-2" />
        Rute
        {isLoading && (
          <>
            <svg className="animate-spin h-4 w-4 ml-2" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Memproses...
          </>
        )}
      </button>

      {error && (
        <div className="flex items-start p-2 bg-red-50 text-red-600 rounded-md text-xs">
          <MdLocationDisabled className="flex-shrink-0 mt-0.5 mr-1.5" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}
