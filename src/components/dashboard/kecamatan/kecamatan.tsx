"use client"

import Header from "../components/layout/navigations/components/Header";
import Sidebar from "../components/layout/navigations/components/SideBar";
import { API_ENDPOINT } from "@/config/api";
import { useEffect, useState } from "react";
import KriteriaModal from "./components/KecamatanModal";
import KecamatanCard from "./components/KecamatanCard";
import Pagination from "../components/Pagination";
import { KecamatanResource } from "@/types/kecamatan";
import TableControlsBasic from "@/components/tables/components/TableControlBasic";
import { Plus } from "lucide-react";
import useTableControl from "@/hooks/useTablePagination";
import { UsersResource } from "@/types/users";


// Komponen utama Dashboard
export default function Kecamatan({user}:{user:UsersResource}) {
    const [kecamatanList,setKecamatan] = useState<KecamatanResource[]>([])
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
       } = useTableControl({sortColumn:"nama_kecamatan",sortOrder:"asc"})


    const handleSetMessage = (message: { text: string; status: boolean | null }) => {
        setMessage(message);
      };

    const GetKecamatan = async () => {
        try {
          const queryParams = new URLSearchParams({
            page: table.page.toString(),
            limit: table.limit.toString(),
            filter: table.filter,
            sortColumn: table.sortColumn,
            sortOrder: table.sortOrder
        });
        const res = await fetch(`${API_ENDPOINT.kecamatan}?${queryParams.toString()}`,{
          credentials: 'include',
        });
            const result = await res.json();
            const data: KecamatanResource[] = result.data;    

             // Optional fallback sorting
             const sortedData = [...data].sort((a, b) => {
                            const aVal = a[table.sortColumn as keyof KecamatanResource];
                            const bVal = b[table.sortColumn as keyof KecamatanResource];
                          
                            if (aVal! < bVal!) return table.sortOrder === "asc" ? -1 : 1;
                            if (aVal! > bVal!) return table.sortOrder === "asc" ? 1 : -1;
                            return 0;
              });

            if (sortedData.length === 0) {
                setMessage({ text: "No Data...", status: false });
            }

            setKecamatan(sortedData);
            setTotalData(result.total)
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        GetKecamatan();
      }, [table.page,table.limit,table.filter,table.sortColumn,table.sortOrder]);

  return (
    <div className="flex h-screen">
      <Sidebar user={user}/>  {/* Sidebar di kiri */}
      <div className="flex-1 flex flex-col ml-0 lg:ml-64 xl:ml-70 2xl:ml-80"> {/* Konten utama */}
        <Header user={user} /> {/* Header di atas */}
        
        {/* Konten utama */}
        <main className="flex-1 p-4">
        <KriteriaModal setMessage={handleSetMessage}
        refreshData={GetKecamatan}
  isOpen={modalOpen} 
  
  onClose={() => setModalOpen(false)}
/>
<div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                        <TableControlsBasic
                            name="Cari Kriteria..."
                            limit={table.limit}
                            filter={table.filter}
                            onLimitChange={setLimit}
                            onSearchChange={setFilter}
                            sortColumn={table.sortColumn}
                            sortOrder={table.sortOrder}
                            columns={[
                                { label: "Kecamatan", value: "nama_kecamatan" },
                            ]}
                            onSortColumnChange={setSortColumn}
                            onSortOrderChange={setSortOrder}
                        />

                        <button
                            onClick={()=> setModalOpen(true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
                        >
                            <Plus className="h-4 w-4" />
                            Buat Kriteria
                        </button>
                    </div>
<KecamatanCard
  data={kecamatanList}
  refreshData={GetKecamatan}
  message={message} 
  setMessage={setMessage}
  currentPage={table.page}
  itemsPerPage={table.limit}
  onPageChange={setPage}
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
