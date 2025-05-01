// src/app/galon/page.tsx
import ProductGalon from "@/components/home/ProductGalon";
import Footer from "@/components/home/layouts/Footer";
import Header from "@/components/home/layouts/Header";
import WhyUs from "@/components/home/WhyUs";
import { API_ENDPOINT } from "@/config/api";
import { jwtDecode } from "jwt-decode";
import { UserLocation } from "@/types/users";
import { useSendLocation } from "@/hooks/useSendLocation";
import UnauthorizedRedirect from "@/components/home/components/UnauthorizedRedirect";
import { UserToken } from "@/types/login";
import { getServerAuthTokenUser } from "../utils/getToken.server";

// Fungsi untuk mengambil data produk berdasarkan user token
async function getProducts(id: number | null, token: string | null): Promise<ProductsResources[]> {
  const url = `${API_ENDPOINT.users}/alternatif/${id}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const data = await res.json();
  if (!res.ok) {
    if (res.status === 404) {
      console.warn(data.message);
    } else {
      console.error(data.message);
    }
  }

  return data?.data?.hasil || [];
}

export default async function GalonPage() {
  const user_token = await getServerAuthTokenUser();
  if (user_token === null) {
    return <UnauthorizedRedirect />;
  }

  let decoded: UserToken | null = null;
  decoded = jwtDecode<UserToken>(user_token);
  const id = decoded?.id ?? null;

  const depots = await getProducts(id, user_token);

  return (
    <>
      <Header decoded={decoded} />
      <ProductGalon id={id} user_token={user_token} decoded={decoded} depots={depots} />
      <WhyUs />
      <Footer />
    </>
  );
}
