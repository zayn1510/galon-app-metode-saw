"use client";

import Header from "../components/layout/navigations/components/Header";
import Sidebar from "../components/layout/navigations/components/SideBar";
import { API_ENDPOINT } from "@/config/api";
import { useEffect, useState } from "react";
import KriteriaModal from "./components/KriteriaModal";
import Pagination from "../components/Pagination";
import KriteriaCard from "./components/KriteriaCard";
import TableControlsBasic from "@/components/tables/components/TableControlBasic";
import { Plus } from "lucide-react";
import useTableControl from "@/hooks/useTablePagination";
import { UsersResource } from "@/types/users";

type Kriteria = {
    id: number;
    keterangan: string;
    bobot: number;
    tipe: number;
};

type Props = {
  user:UsersResource
}
export default function Kriteria({user}:Props) {
    const [kriteriaList, setKriteriaList] = useState<Kriteria[]>([]);
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
    } = useTableControl({sortColumn:"keterangan",sortOrder:"asc"})
    // Handlers
    const handleSetMessage = (message: { text: string; status: boolean | null }) => {
      setMessage(message);
    };


    // Fetch data
    const GetKriteria = async () => {
        try {
            const queryParams = new URLSearchParams({
                page: table.page.toString(),
                limit: table.limit.toString(),
                filter: table.filter,
                sortColumn: table.sortColumn,
                sortOrder: table.sortOrder
            });

            const res = await fetch(`${API_ENDPOINT.kriteria}?${queryParams.toString()}`,{
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const result = await res.json();
            if (res.status ==401) {
                setMessage({text:result.error,status:false})
                return;
            }
            const data: Kriteria[] = result.data;

            // Optional fallback sorting
            const sortedData = [...data].sort((a, b) => {
                           const aVal = a[table.sortColumn as keyof Kriteria];
                           const bVal = b[table.sortColumn as keyof Kriteria];
                         
                           if (aVal! < bVal!) return table.sortOrder === "asc" ? -1 : 1;
                           if (aVal! > bVal!) return table.sortOrder === "asc" ? 1 : -1;
                           return 0;
                         });
            if (sortedData.length === 0) {
                setMessage({ text: "No Data...", status: false });
            }

            setKriteriaList(sortedData);
            setTotalData(result.total);
        } catch (error) {
            console.error(error);
            setMessage({ text: "Failed to fetch data in server", status: true });
        }
    };

    useEffect(() => {
      GetKriteria();
    }, [table.page, table.limit, table.filter, table.sortColumn, table.sortOrder]);
  
    return (
        <div className="flex h-screen">
            <Sidebar user={user}/>
            <div className="flex-1 flex flex-col ml-0 lg:ml-64 xl:ml-70 2xl:ml-80">
                <Header user={user} />

                <main className="flex-1 p-4">
                    <KriteriaModal
                        setMessage={handleSetMessage}
                        refreshData={GetKriteria}
                        isOpen={modalOpen}
                        onClose={()=>setModalOpen(false)}
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
                                { label: "Keterangan", value: "keterangan" },
                                { label: "Bobot", value: "bobot" },
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

                    <KriteriaCard
                        data={kriteriaList}
                        refreshData={GetKriteria}
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
