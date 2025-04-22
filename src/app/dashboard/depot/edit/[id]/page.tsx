import CreateDepot from "@/components/dashboard/depot/CreateDepot";
import EditDepot from "@/components/dashboard/depot/EditDepot";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "GalonBest - Pemesanan Galon Air Minum Berkualitas",
    description: "Pesan galon air minum premium dengan layanan terbaik. Kami antar langsung ke rumah Anda!",
  };
export default function CreateDepotPage (){
    return (
        <div className="min-h-screen flex flex-col">      
      <EditDepot/>
    </div>
    )
}