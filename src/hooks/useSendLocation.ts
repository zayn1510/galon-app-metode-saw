import { checkUserLocation, sendUserLocation } from "@/services/userLocationService";
import { UserLocationRequest } from "@/types/users";

export const useSendLocation = () => {
    
  const sendLocation = async (
    lat: number | null,
    lon: number | null,
    token: string,
    decoded?: { id?: number }
  ) => {
    try {
      const payload: UserLocationRequest = {
        userid: decoded?.id ?? 0,
        latitude: lat,
        longitude: lon,
      };

      const res = await sendUserLocation(payload, token);

      if (!res.ok) {
        throw new Error("Gagal kirim lokasi");
      }

      return await res.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const fetchCheckUserLocation = async (id: number | null, token: string | null) => {
    try {
      const res = await checkUserLocation(id, token);
      const data:ApiResponse<null> = await res.json();
      if (!res.ok) {
        if (res.status === 404) {
          console.warn("Data tidak ditemukan, lanjut aja."); 
         
        } else {
          console.error("Server error:", res.status);
      
        }
      }
      return data;
    } catch (err: any) {
      console.error("Error fetching user location:", err);
      
    } finally {
    }
  };

  return { sendLocation,fetchCheckUserLocation };
};
