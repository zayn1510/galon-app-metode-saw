import Kecamatan from "@/components/dashboard/kecamatan/kecamatan";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "GalonBest - Pemesanan Galon Air Minum Berkualitas",
    description: "Pesan galon air minum premium dengan layanan terbaik. Kami antar langsung ke rumah Anda!",
  };
export default function DashboardPage (){
    return (
        <div className="min-h-screen flex flex-col">      
      <Kecamatan/>
    </div>
    )
}