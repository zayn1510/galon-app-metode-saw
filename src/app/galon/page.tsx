import ProductGalon from "@/components/home/ProductGalon";

import Footer from "@/components/home/layouts/Footer";
import Header from "@/components/home/layouts/Header";
import Testimonials from "@/components/home/Testimonials";
import WhyUs from "@/components/home/WhyUs";


export default function HomePage(){
    return (
       <>
       <Header/>
        <ProductGalon/>
       <WhyUs/>
       <Testimonials/>
       <Footer />
       </>
    )
}