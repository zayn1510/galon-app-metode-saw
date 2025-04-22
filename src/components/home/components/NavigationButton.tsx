"use client"

import { useState } from 'react'
import { MdDirections, MdGpsFixed, MdLocationDisabled } from 'react-icons/md'

type Location = {
  latitude: number
  longitude: number
  depot?: string // Nama depot/toko (optional)
}

export default function NavigationButtons({ productLocation }: { productLocation: Location }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [accuracy, setAccuracy] = useState<number | null>(null)
  const [watchId, setWatchId] = useState<number | null>(null)

  // Fungsi untuk membuka peta dengan koordinat
  const openSimpleMap = () => {
    const url = `https://www.google.com/maps?q=${productLocation.latitude},${productLocation.longitude}`
    window.open(url, '_blank')
  }

  // Fungsi untuk navigasi dari lokasi pengguna
  const openNavigationWithUserLocation = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const userLocation = await getHighAccuracyLocation();
      const url = `https://www.google.com/maps/dir/?api=1` +
        `&origin=${userLocation.lat},${userLocation.lng}` +
        `&destination=${productLocation.latitude},${productLocation.longitude}`

      window.open(url, '_blank')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal mendapatkan lokasi')
      openSimpleMap() // Fallback ke mode simple
    } finally {
      setIsLoading(false)
    }
  }

  // Fungsi untuk mendapatkan lokasi pengguna
  const getHighAccuracyLocation = (): Promise<{
    lat: number
    lng: number
    accuracy: number
  }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Browser tidak mendukung geolokasi'))
        return
      }
  
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy
          })
        },
        (err) => reject(err),
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      )
    })
  }

  // Helper untuk error message
  const getGeolocationErrorMessage = (error: GeolocationPositionError): string => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return 'Izin lokasi ditolak'
      case error.POSITION_UNAVAILABLE:
        return 'Informasi lokasi tidak tersedia'
      case error.TIMEOUT:
        return 'Waktu permintaan habis'
      default:
        return 'Gagal mendapatkan lokasi'
    }
  }

  return (
    <div className="flex flex-col space-y-2">

      {/* Tombol Navigasi dari Lokasi Saya */}
      <button 
                    onClick={openNavigationWithUserLocation}
                    className="bg-gray-50 hover:bg-gray-100 text-gray-800 py-2 px-3 rounded-md text-sm flex items-center justify-center transition-colors border border-gray-200"
                  >
                    <MdDirections className="text-blue-500 mr-2" />
                    Rute
                    {isLoading ? (
          <>
            <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Memproses...
          </>
        ) : (
          <>
          </>
        )}
                  </button>

      {/* Pesan Error */}
      {error && (
        <div className="flex items-start p-2 bg-red-50 text-red-600 rounded-md text-xs">
          <MdLocationDisabled className="flex-shrink-0 mt-0.5 mr-1.5" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}