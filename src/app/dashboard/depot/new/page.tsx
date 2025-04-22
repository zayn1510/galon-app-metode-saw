import CreateDepot from "@/components/dashboard/depot/CreateDepot";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "GalonBest - Pemesanan Galon Air Minum Berkualitas",
    description: "Pesan galon air minum premium dengan layanan terbaik. Kami antar langsung ke rumah Anda!",
  };
export default function CreateDepotPage (){
    return (
        <div className="min-h-screen flex flex-col">      
      <CreateDepot/>
    </div>
    )
}