import { getServerAuthToken } from "@/app/utils/getToken.server";
import Header from "../components/layout/navigations/components/Header";
import Sidebar from "../components/layout/navigations/components/SideBar";
import AdminProfile from "./components/Profil";
import { UsersResource } from "@/types/users";
import { API_ENDPOINT } from "@/config/api";
import decodeJWT from "@/app/utils/decodeJwt";

// Komponen utama Dashboard
export default async function Profil({user,token} : {user:UsersResource,token:string}) {
  return (
    <div className="flex h-screen">
      <Sidebar user={user} />  {/* Sidebar di kiri */}
      <div className="flex-1 flex flex-col ml-0 lg:ml-64 xl:ml-70 2xl:ml-80"> {/* Konten utama */}
        <Header user={user} /> {/* Header di atas */}
        
        {/* Konten utama */}
        <main className="flex-1 p-4">
            <AdminProfile token={token ?? ''} users={user}/>
        </main>
      </div>
    </div>
  );
}
