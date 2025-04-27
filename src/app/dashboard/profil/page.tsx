import Dashboard from "@/components/dashboard/dashboard";
import AdminProfile from "@/components/dashboard/profil/components/Profil";
import Profil from "@/components/dashboard/profil/Profil";
import { fetchUserByUsername } from "@/lib/services/userService";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "GalonBest - Pemesanan Galon Air Minum Berkualitas",
    description: "Pesan galon air minum premium dengan layanan terbaik. Kami antar langsung ke rumah Anda!",
  };
export default async function AdminProfilPage (){
    const user = await fetchUserByUsername();
    return (
        <div className="min-h-screen flex flex-col">      
      <Profil user={user}/>
    </div>
    )
}