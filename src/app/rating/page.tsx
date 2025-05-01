import Footer from "@/components/home/layouts/Footer";
import Header from "@/components/home/layouts/Header";
import RatingForm from "@/components/rating/rating";
import { Metadata } from "next";
import { getServerAuthTokenUser } from "../utils/getToken.server";
import { UseAuthUser } from "@/hooks/useAuthUser";
import { UserToken } from "@/types/login";
import { jwtDecode } from "jwt-decode";


export const metadata: Metadata = {
    title: "GalonBest - Pemesanan Galon Air Minum Berkualitas",
    description: "Pesan galon air minum premium dengan layanan terbaik. Kami antar langsung ke rumah Anda!",
  };
  
export default async function RatingPage (){
    const user_token = await getServerAuthTokenUser();
      const {detailUser} = UseAuthUser();
      
      let decoded: UserToken | null = null;
    
      if (user_token) {
        decoded = jwtDecode<UserToken>(user_token);
      }
      const userid = decoded ? decoded.id : 0
    return (
        <div className="min-h-screen flex flex-col">  
         <Header decoded={decoded}/>
         <RatingForm user_id={userid}/>
        <Footer />    
    </div>
    )
}