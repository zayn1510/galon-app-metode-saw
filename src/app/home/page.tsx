import ProductGalon from "@/components/home/ProductGalon";
import HeroSection from "@/components/home/Hero";
import Footer from "@/components/home/layouts/Footer";
import Header from "@/components/home/layouts/Header";
import Testimonials from "@/components/home/Testimonials";
import WhyUs from "@/components/home/WhyUs";


export default function HomePage(){
    return (
       <>
       <Header/>
       <HeroSection/>
       <WhyUs/>
       <Testimonials/>
       <Footer />
       </>
    )
}