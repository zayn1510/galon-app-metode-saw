import decodeJWT from "@/app/utils/decodeJwt";
import { getServerAuthToken } from "@/app/utils/getToken.server";
import { API_ENDPOINT } from "@/config/api";
import { UsersResource } from "@/types/users";


export async function fetchUserByUsername(): Promise<UsersResource> {
  const token = await getServerAuthToken();
  const decode = decodeJWT(token);
  const username = decode.username;
  const res = await fetch(`${API_ENDPOINT.users}/by/${username}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  const result = await res.json();

  if (!res.ok) {
    console.error("Failed to fetch user:", res.status, result);
   
  }

  return result.data;
}


