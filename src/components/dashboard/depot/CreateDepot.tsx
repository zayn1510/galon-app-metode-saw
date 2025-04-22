import Header from "../components/layout/navigations/components/Header";
import Sidebar from "../components/layout/navigations/components/SideBar";
import FormDepot from "./components/FormDepot";

export default function CreateDepot() {
     return (
        <div className="flex h-screen">
          <Sidebar />  {/* Sidebar di kiri */}
          <div className="flex-1 flex flex-col ml-0 lg:ml-64 xl:ml-70 2xl:ml-80"> {/* Konten utama */}
            <Header /> {/* Header di atas */}
            
            {/* Konten utama */}
            <main className="flex-1 p-4">
                <FormDepot/>
            </main>
          </div>
        </div>
      );
}