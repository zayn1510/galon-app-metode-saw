import { useState, useRef } from 'react';

function useGeolocation() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const lastSentLat = useRef<number>(0);
  const lastSentLon = useRef<number>(0);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const toRad = (x: number) => (x * Math.PI) / 180;
    const R = 6371; // Earth radius in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 1000; // Return distance in meters
  };

  const startGeolocationWatch = () => {
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

        if (distance >= 5) { // Baru kirim kalau pindah >= 5 meter
          if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
          }

          debounceTimer.current = setTimeout(() => {
            lastSentLat.current = lat;
            lastSentLon.current = lon;
          }, 5000); // Debounce 5 detik
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
    };
  };

  return {
    latitude,
    longitude,
    location,
    error,
    startGeolocationWatch,
  };
}

export default useGeolocation;
