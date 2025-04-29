import { API_ENDPOINT } from "@/config/api";
import { UserLocation, UserLocationRequest } from "@/types/users";

export const sendUserLocation = async (
  payload: UserLocationRequest,
  token: string
): Promise<Response> => {
  return fetch(API_ENDPOINT.userLocation, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};

export async function checkUserLocation(id: number | null, token: string | null):Promise<Response> {
    if (!id || !token) {
      throw new Error('ID atau Token tidak valid');
    }
    const url = `${API_ENDPOINT.userLocation}/${id}`;
    
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    return res;
  }
