"use client"

import Table from '../tables/components/basicTable';
import Sidebar from './components/layout/navigations/components/SideBar';
import Header from './components/layout/navigations/components/Header';
import StatsCard from './components/layout/navigations/components/StatsCard';
import MainContent from './components/layout/navigations/components/Content';

const columns = ["Nama", "Email", "Peran"];
const data = [
  { nama: "Zayn", email: "zayn@example.com", peran: "Admin" },
  { nama: "Riko", email: "riko@example.com", peran: "User" },
];

type Props = {
  token:string | null
}
// Komponen utama Dashboard
export default function Dashboard({token}:Props) {
  return (
    <div className="flex h-screen">
      <Sidebar />  {/* Sidebar di kiri */}
      <div className="flex-1 flex flex-col ml-0 lg:ml-64 xl:ml-70 2xl:ml-80"> {/* Konten utama */}
        <Header /> {/* Header di atas */}
        
        {/* Konten utama */}
        <main className="flex-1 p-4">
          <StatsCard token={token} /> {/* Menampilkan card statistik */}
          <Table columns={columns} data={data} /> {/* Menampilkan tabel */}
        </main>
      </div>
    </div>
  );
}
