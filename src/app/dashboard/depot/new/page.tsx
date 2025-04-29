import CreateDepot from "@/components/dashboard/depot/CreateDepot";
import { fetchUserByUsername } from "@/lib/services/userService";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "GalonBest - Pemesanan Galon Air Minum Berkualitas",
    description: "Pesan galon air minum premium dengan layanan terbaik. Kami antar langsung ke rumah Anda!",
  };
export default async function CreateDepotPage (){
  const user = await fetchUserByUsername();
    return (
        <div className="min-h-screen flex flex-col">      
      <CreateDepot user={user}/>
    </div>
    )
}