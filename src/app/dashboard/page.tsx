import Dashboard from "@/components/dashboard/dashboard";
import { Metadata } from "next";
import { fetchUserByUsername } from "@/lib/services/userService";


export const metadata: Metadata = {
    title: "GalonBest - Pemesanan Galon Air Minum Berkualitas",
    description: "Pesan galon air minum premium dengan layanan terbaik. Kami antar langsung ke rumah Anda!",
  };
export default async function DashboardPage (){
  const user = await fetchUserByUsername();
    return (
        <div className="min-h-screen flex flex-col">      
      <Dashboard user={user}/>
    </div>
    )
}