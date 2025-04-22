import Dashboard from "@/components/dashboard/dashboard";
import Footer from "@/components/home/layouts/Footer";
import Header from "@/components/home/layouts/Header";
import Testimonials from "@/components/home/Testimonials";
import WhyUs from "@/components/home/WhyUs";
import RatingForm from "@/components/rating/rating";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "GalonBest - Pemesanan Galon Air Minum Berkualitas",
    description: "Pesan galon air minum premium dengan layanan terbaik. Kami antar langsung ke rumah Anda!",
  };
export default function RatingPage (){
    return (
        <div className="min-h-screen flex flex-col">  
         <Header/>
         <RatingForm/>

        <Testimonials/>
        <Footer />    
    
    </div>
    )
}