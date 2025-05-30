import HeroSection from "@/components/home/Hero";
import Footer from "@/components/home/layouts/Footer";
import Header from "@/components/home/layouts/Header";
import WhyUs from "@/components/home/WhyUs";


import { API_ENDPOINT } from "@/config/api";

import { Ratings } from "@/types/rating";
import { getServerAuthTokenUser } from "../utils/getToken.server";
import { jwtDecode } from "jwt-decode";
import { UserToken } from "@/types/login";
import TestimonialGrid from "@/components/home/Testimonials";


export async function getRatings(): Promise<Ratings[]>{

    const params = new URLSearchParams({
        page: "0",
        limit: "3",
      });
    
      const res = await fetch(`${API_ENDPOINT.user}user/rating?${params.toString()}`);
      console.info(res);
  const result = await res.json();

  if (!res.ok) {
    console.error("Failed to fetch user:", res.status, result);
   
  }

  return result.data;
}

export default async function HomePage(){
  const user_token = await getServerAuthTokenUser();
  
  let decoded: UserToken | null = null;

  if (user_token) {
    decoded = jwtDecode<UserToken>(user_token);
  }
    const ratings = await getRatings();
    return (
       <>
       <Header decoded={decoded}/>
       <HeroSection user_token={user_token}/>
       <WhyUs/>
       <TestimonialGrid initData={ratings}/>
       <Footer />
       </>
    )
}