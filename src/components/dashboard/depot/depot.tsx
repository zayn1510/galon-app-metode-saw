"use client"

import Table from "@/components/tables/components/basicTable";
import Header from "../components/layout/navigations/components/Header";
import Sidebar from "../components/layout/navigations/components/SideBar";
import StatsCard from "../components/layout/navigations/components/StatsCard";
import { API_ENDPOINT } from "@/config/api";
import { useEffect, useState } from "react";

import Pagination from "../components/Pagination";
import { paginationData } from "@/types/pagination";
import { DepotResource } from "@/types/depot";
import DepotCard from "./components/DepotCard";
import { useRouter } from "next/navigation";
import useTableControl from "@/hooks/useTablePagination";
import TableControlsBasic from "@/components/tables/components/TableControlBasic";
import { Plus } from "lucide-react";
import { JumlahKecamatanResource } from "@/types/kecamatan";
import JumlahDepotStatCards from "./components/JumlahDepotCard";

// Komponen utama Dashboard
export default function Depot() {
    const router = useRouter()
    const [depotList,setDepotList] = useState<DepotResource[]>([])
    const [jumlahdepot,setJumlahDepot] = useState<JumlahKecamatanResource[]>([])
    const [modalOpen, setModalOpen] = useState(false);
    const [message, setMessage] = useState<{ text: string; status: boolean | null }>({
        text: "",
        status: null,
    });
 const [totalData,setTotalData] = useState(0);
    const {
         table,
         setPage,
         setLimit,
         setFilter,
         setSortColumn,
         setSortOrder
       } = useTableControl({sortColumn:"nama_depot",sortOrder:"asc"})
    

    const handleSetMessage = (message: { text: string; status: boolean | null }) => {
        setMessage(message);
      };

    
    const GetDepot = async () => {
        try {
          
          const queryParams = new URLSearchParams({
            page: table.page.toString(),
            limit: table.limit.toString(),
            filter: table.filter,
            sortColumn: table.sortColumn,
            sortOrder: table.sortOrder
        });
        const res = await fetch(`${API_ENDPOINT.depot}?${queryParams.toString()}`);
            const result = await res.json();
            const data: DepotResource[] = result.data;
           
          
            if (data.length ==0) {
              setMessage({text:"No Data...",status:false})
            }
               // Optional fallback sorting
               const sortedData = [...data].sort((a, b) => {
                const aVal = (a as any)[table.sortColumn];
                const bVal = (b as any)[table.sortColumn];
                if (aVal < bVal) return table.sortOrder === "asc" ? -1 : 1;
                if (aVal > bVal) return table.sortOrder === "asc" ? 1 : -1;
                return 0;
              });
            setDepotList(sortedData);
            setTotalData(result.total);
        } catch (error) {
            console.error(error);
            setMessage({ text: "Failed to fetch data in server", status: true });
        }
    }

    const getJumlahDepot = async () => {
      try {
        const res = await fetch(API_ENDPOINT.kecamatan+"/jumlah-depot");
        const result =await res.json();
        if (!res.ok) {
            console.error(result.message);
            return;
        }
        setJumlahDepot(result.data);
      } catch (error) {
          console.error(error);
      }
 
    }
    
    
    useEffect(() => {
        GetDepot();
        getJumlahDepot();
      }, [table.page,table.limit,table.filter,table.sortColumn,table.sortOrder]);

  function createForm(): void {
      router.push("/dashboard/depot/new");
  }

  return (
    <div className="flex h-screen">
      <Sidebar />  {/* Sidebar di kiri */}
      <div className="flex-1 flex flex-col ml-0 lg:ml-64 xl:ml-70 2xl:ml-80"> {/* Konten utama */}
        <Header /> {/* Header di atas */}
        
        <JumlahDepotStatCards data={jumlahdepot} />
        {/* Konten utama */}
        <main className="flex-1 p-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                        <TableControlsBasic
                            name="Cari Depot..."
                            limit={table.limit}
                            filter={table.filter}
                            onLimitChange={setLimit}
                            onSearchChange={setFilter}
                            sortColumn={table.sortColumn}
                            sortOrder={table.sortOrder}
                            columns={[
                                { label: "Depot", value: "nama_depot" },
                                { label: "Harga", value: "harga" },
                                { label: "Rating", value: "rating" },
                                
                            ]}
                            onSortColumnChange={setSortColumn}
                            onSortOrderChange={setSortOrder}
                        />

                        <button
                           onClick={createForm}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
                        >
                            <Plus className="h-4 w-4" />
                            Buat Depot
                        </button>
                    </div>
        <DepotCard
  data={depotList}
  refreshData={GetDepot}
  message={message} 
  currentPage={table.page}
  itemsPerPage={table.limit}
  onPageChange={setPage}
  setMessage={setMessage}
/>
<Pagination
  currentPage={table.page}
  totalPages={totalData}
  onPageChange={setPage}
/>

        </main>
      </div>
    </div>
  );
}
