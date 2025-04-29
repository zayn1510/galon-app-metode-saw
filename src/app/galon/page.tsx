import ProductGalon from "@/components/home/ProductGalon";
import HeroSection from "@/components/home/Hero";
import Footer from "@/components/home/layouts/Footer";
import Header from "@/components/home/layouts/Header";
import Testimonials from "@/components/home/Testimonials";
import WhyUs from "@/components/home/WhyUs";


import { API_ENDPOINT } from "@/config/api";

import { Ratings } from "@/types/rating";
import { getServerAuthTokenUser } from "../utils/getToken.server";
import { jwtDecode } from "jwt-decode";
import { TokenResource, UserToken } from "@/types/login";
import { UserLocation } from "@/types/users";
import { useSendLocation } from "@/hooks/useSendLocation";
import UnauthorizedRedirect from "@/components/home/components/UnauthorizedRedirect";

export async function getRatings(): Promise<Ratings[]>{

    const params = new URLSearchParams({
        page: "0",
        limit: "3",
      });
      
      const res = await fetch(`${API_ENDPOINT.user}user/rating?${params.toString()}`);

  const result = await res.json();

  if (!res.ok) {
    console.error("Failed to fetch user:", res.status, result);
   
  }

  return result.data;
}

async function checkUserLocation(id:number | null,token: string | null): Promise<UserLocation> {
 
  const url = API_ENDPOINT.userLocation+"/"+id;
  const res = await fetch(`${url}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error('Gagal mengambil data produk');
  }

  const data = await res.json();
  return data?.data || [];
}
async function getProducts(id:number | null,token: string | null): Promise<ProductsResources[]> {
  const url = API_ENDPOINT.users+"/alternatif/"+id;
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
      if(res.status ===404) {
        console.warn(data.message);
      } else {
        console.error(data.message);
      }
  }

  return data?.data?.hasil || [];
}


export default async function GalonPage(){
    const user_token = await getServerAuthTokenUser();
    if (user_token === null) {
      return(
        <UnauthorizedRedirect/>
      )
    }
    const {fetchCheckUserLocation} = useSendLocation();
    let decoded: UserToken | null = null;
    const ratings = await getRatings();
    if (user_token) {
      decoded = jwtDecode<UserToken>(user_token);
    }
    const id = decoded?.id ?? null;
    const res = await fetchCheckUserLocation(id,user_token)
    
    if (res?.status) {

    }
    const userLocation: UserLocation  | null= res?.status ? res.data : {
      id:0,
      user_id:0,
      longitude:0,
      latitude:0
    };
    
    const depots = res?.status ? await getProducts(id, user_token) : [];
    
    return (
       <>
       <Header decoded={decoded}/>
        <ProductGalon user_location={userLocation} user_token={user_token} decoded ={decoded} depots={depots}/>
       <WhyUs/>
       <Footer />
       </>
    )
}