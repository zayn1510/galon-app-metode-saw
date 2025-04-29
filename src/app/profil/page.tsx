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
import { UserToken } from "@/types/login";
import Profil from "@/components/dashboard/profil/Profil";
import UserProfil from "@/components/home/UserProfil";
import { UseAuthUser } from "@/hooks/useAuthUser";
import { UsersResource } from "@/types/users";


export default async function ProfilPage(){
  const user_token = await getServerAuthTokenUser();
  const {detailUser} = UseAuthUser();
  
  let decoded: UserToken | null = null;

  if (user_token) {
    decoded = jwtDecode<UserToken>(user_token);
  }
  const username = decoded?.username ?? '';
  const token = user_token ?? '';
  const data = await detailUser(username,token);

  let user: UsersResource = {
    id: 0,
    name: '',
    email: '',
    username: '',
    role: '',
    status: '',
    nomor_handphone:''
  };
  
  // Pastikan data.status true dan data.data valid
  if (data.status && data.data) {
      user = data.data;
  }
   console.info(user);
    return (
       <>
       <Header decoded={decoded}/>
        <UserProfil token={user_token} user={user}/>
       <WhyUs/>
       <Footer />
       </>
    )
}