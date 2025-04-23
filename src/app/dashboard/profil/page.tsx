import Dashboard from "@/components/dashboard/dashboard";
import AdminProfile from "@/components/dashboard/profil/components/Profil";
import Profil from "@/components/dashboard/profil/Profil";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "GalonBest - Pemesanan Galon Air Minum Berkualitas",
    description: "Pesan galon air minum premium dengan layanan terbaik. Kami antar langsung ke rumah Anda!",
  };
export default function AdminProfilPage (){
    return (
        <div className="min-h-screen flex flex-col">      
      <Profil/>
    </div>
    )
}