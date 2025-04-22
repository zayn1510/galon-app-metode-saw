import ProductGalon from "@/components/home/ProductGalon";

import Footer from "@/components/home/layouts/Footer";
import Header from "@/components/home/layouts/Header";
import Testimonials from "@/components/home/Testimonials";
import WhyUs from "@/components/home/WhyUs";
import { Metadata } from "next";
import OrderGalon from "@/components/order/order";

export const metadata: Metadata = {
    title: "GalonBest - Pemesanan Galon Air Minum Berkualitas",
    description: "Pesan galon air minum premium dengan layanan terbaik. Kami antar langsung ke rumah Anda!",
  };
export default function OrderPage(){
    return (
       <>
       <Header/>
        <OrderGalon/>
    
        <Footer />
       </>
    )
}