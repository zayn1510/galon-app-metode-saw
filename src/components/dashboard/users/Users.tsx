"use client";

import Table from "@/components/tables/components/basicTable";
import Header from "../components/layout/navigations/components/Header";
import Sidebar from "../components/layout/navigations/components/SideBar";
import { API_ENDPOINT } from "@/config/api";
import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import TableControlsBasic from "@/components/tables/components/TableControlBasic";
import { Plus } from "lucide-react";
import useTableControl from "@/hooks/useTablePagination";
import { UsersResource } from "@/types/users";
import UsersCard from "./components/UsersCard";
export default function Users({user}:{user:UsersResource}) {
    const [usersList, setUsersList] = useState<UsersResource[]>([]);
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
    } = useTableControl({sortColumn:"name",sortOrder:"asc"})
    // Handlers
    const handleSetMessage = (message: { text: string; status: boolean | null }) => {
      setMessage(message);
    };


    // Fetch data
    const GetUsers = async () => {
        try {
            const queryParams = new URLSearchParams({
                page: table.page.toString(),
                limit: table.limit.toString(),
                filter: table.filter,
                sortColumn: table.sortColumn,
                sortOrder: table.sortOrder
            });

            const res = await fetch(`${API_ENDPOINT.users}?${queryParams.toString()}`,{
                method : "GET",
                credentials:"include"
            });
            const result = await res.json();
            const data: UsersResource[] = result.data;

            const sortedData = [...data].sort((a, b) => {
              const aVal = (a as any)[table.sortColumn];
              const bVal = (b as any)[table.sortColumn];
              if (aVal < bVal) return table.sortOrder === "asc" ? -1 : 1;
              if (aVal > bVal) return table.sortOrder === "asc" ? 1 : -1;
              return 0;
            });

            if (sortedData.length === 0) {
                setMessage({ text: "No Data...", status: false });
            }
            setUsersList(sortedData);
            setTotalData(result.total);
        } catch (error) {
            console.error(error);
            setMessage({ text: "Failed to fetch data in server", status: true });
        }
    };

    useEffect(() => {
      GetUsers();
    }, [table.page, table.limit, table.filter, table.sortColumn, table.sortOrder]);
  
    return (
        <div className="flex h-screen">
            <Sidebar user={user} />
            <div className="flex-1 flex flex-col ml-0 lg:ml-64 xl:ml-70 2xl:ml-80">
                <Header user={user} />
                <main className="flex-1 p-4">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                        <TableControlsBasic
                            name="Cari Nama..."
                            limit={table.limit}
                            filter={table.filter}
                            onLimitChange={setLimit}
                            onSearchChange={setFilter}
                            sortColumn={table.sortColumn}
                            sortOrder={table.sortOrder}
                            columns={[
                                { label: "Nama", value: "name" },
                            ]}
                            onSortColumnChange={setSortColumn}
                            onSortOrderChange={setSortOrder}
                        />
                    </div>

                    <UsersCard
                        data={usersList}
                        refreshData={GetUsers}
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
