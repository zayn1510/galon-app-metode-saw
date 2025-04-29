import Depot from "@/components/dashboard/depot/depot";
import Kecamatan from "@/components/dashboard/kecamatan/kecamatan";
import { fetchUserByUsername } from "@/lib/services/userService";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "GalonBest - Pemesanan Galon Air Minum Berkualitas",
    description: "Pesan galon air minum premium dengan layanan terbaik. Kami antar langsung ke rumah Anda!",
  };
export default async function DepotPage (){
  const user = await fetchUserByUsername();
    return (
        <div className="min-h-screen flex flex-col">      
      <Depot user={user}/>
    </div>
    )
}