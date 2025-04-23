import Dashboard from "@/components/dashboard/dashboard";
import { Metadata } from "next";
import { getServerAuthToken } from "../utils/getToken.server";


export const metadata: Metadata = {
    title: "GalonBest - Pemesanan Galon Air Minum Berkualitas",
    description: "Pesan galon air minum premium dengan layanan terbaik. Kami antar langsung ke rumah Anda!",
  };
export default async function DashboardPage (){
  const token = await getServerAuthToken();
    return (
        <div className="min-h-screen flex flex-col">      
      <Dashboard token={token}/>
    </div>
    )
}