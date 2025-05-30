"use client"

import Sidebar from './components/layout/navigations/components/SideBar';
import Header from './components/layout/navigations/components/Header';
import StatsCard from './components/layout/navigations/components/StatsCard';
import { UsersResource } from '@/types/users';
import { useCallback, useEffect, useState } from 'react';
import useTableControl from '@/hooks/useTablePagination';
import { API_ENDPOINT } from '@/config/api';
import { LoginLastResource } from '@/types/login';
import LoginLastTable from './components/LoginLastTable';
import TableControlsBasic from '../tables/components/TableControlBasic';
import Pagination from './components/Pagination';

type Props = {
  user:UsersResource
}
// Komponen utama Dashboard
export default function Dashboard({user}:Props) {
  const [totalData,setTotalData] = useState(0);
  const {
        table,
        setPage,
        setLimit,
        setFilter,
        setSortColumn,
        setSortOrder
    } = useTableControl({sortColumn:"username",sortOrder:"asc"})

  const [loginLogs,setLoginLogs] =useState<LoginLastResource[]>([]);

        // Fetch data
        const GetKriteria = useCallback(async () => {
          try {
            const queryParams = new URLSearchParams({
              page: table.page.toString(),
              limit: table.limit.toString(),
              filter: table.filter,
              sortColumn: table.sortColumn,
              sortOrder: table.sortOrder,
            });
        
            const res = await fetch(`${API_ENDPOINT.loginLogs}?${queryParams.toString()}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
            });
        
            const result = await res.json();
            if (res.status === 401) return;
        
            const data: LoginLastResource[] = result.data;
        
            interface TableData {
              [key: string]: string | number;
            }
        
            const sortedData = [...data].sort((a: TableData, b: TableData) => {
              const aVal = a[table.sortColumn];
              const bVal = b[table.sortColumn];
        
              if (aVal < bVal) return table.sortOrder === "asc" ? -1 : 1;
              if (aVal > bVal) return table.sortOrder === "asc" ? 1 : -1;
              return 0;
            });
        
            setLoginLogs(sortedData);
            setTotalData(result.total);
          } catch (error) {
            console.error(error);
          }
        }, [table.page, table.limit, table.filter, table.sortColumn, table.sortOrder]);
        
    
        useEffect(() => {
          GetKriteria();
        }, [GetKriteria]);

  return (
    <div className="flex h-screen">
      <Sidebar user={user} />  {/* Sidebar di kiri */}
      <div className="flex-1 flex flex-col ml-0 lg:ml-64 xl:ml-70 2xl:ml-80"> {/* Konten utama */}
        <Header user={user} /> {/* Header di atas */}
        
        {/* Konten utama */}
        <main className="flex-1 p-4">

          {/* Ucapan Selamat Datang */}
          <div className="bg-white shadow-md border border-gray-200 rounded-2xl p-6 mb-6 transition duration-300 hover:shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          👋 Selamat datang, <span className="text-blue-600">{user.name}</span>
        </h2>
        <p className="mt-2 text-gray-600 text-base leading-relaxed">
          Anda login sebagai <span className="font-semibold">Admin</span>. Selamat menggunakan <span className="font-medium text-blue-500">Aplikasi Rekomendasi Galon</span> dengan metode <span className="font-bold text-green-600">SAW (Simple Additive Weighting)</span>. Semoga membantu dalam pengambilan keputusan terbaik!
        </p>
      </div>


          <StatsCard /> {/* Menampilkan card statistik */}
          <div className="container mx-auto px-4 py-8">
        
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
              <h1 className="text-2xl font-bold text-gray-800 mb-6">Login History</h1>
                        <TableControlsBasic
                            name="Cari Kriteria..."
                            limit={table.limit}
                            filter={table.filter}
                            onLimitChange={setLimit}
                            onSearchChange={setFilter}
                            sortColumn={table.sortColumn}
                            sortOrder={table.sortOrder}
                            columns={[
                                { label: "username", value: "username" },
                                { label: "nama", value: "nama" },
                            ]}
                            onSortColumnChange={setSortColumn}
                            onSortOrderChange={setSortOrder}
                        />
            </div>
          <LoginLastTable itemsPerPage={table.limit} currentPage={table.page} data={loginLogs} />
          <Pagination currentPage={table.page} onPageChange={setPage} totalPages={totalData}/>
    </div>
        </main>
      </div>
    </div>
  );
}
