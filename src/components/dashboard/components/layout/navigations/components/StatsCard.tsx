import { ChartBarIcon, CurrencyDollarIcon, ShoppingBagIcon, UsersIcon } from "@heroicons/react/16/solid";
import Card from "../../../Card";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { API_ENDPOINT } from "@/config/api";

type Stat = {
  kriteria: number;
  users: number;
  kecamatan: number;
  depot: number;
};

export default function StatsCard() {
  const [stats, setStats] = useState<Stat>({
    kriteria: 0,
    kecamatan: 0,
    users: 0,
    depot: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await fetch(API_ENDPOINT.stat);
      const result = await res.json();
      const data: Stat = result.data;
      setStats(data);
    } catch (err) {
      console.error("Gagal fetch data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-gray-500">Loading statistik...</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-8">
      <Card
        title="Pengguna"
        value={stats.users.toLocaleString()}
        icon={<UsersIcon className="h-6 w-6 text-green-500" />}
        color="bg-green-500"
      />
      <Card
        title="Kecamatan"
        value={stats.kecamatan.toLocaleString()}
        icon={<ChartBarIcon className="h-6 w-6 text-blue-500" />}
        color="bg-blue-500"
      />
      <Card
        title="Depot"
        value={stats.depot.toLocaleString()}
        icon={<ShoppingBagIcon className="h-6 w-6 text-yellow-500" />}
        color="bg-yellow-500"
      />
      <Card
        title="Kriteria"
        value={stats.kriteria.toLocaleString()}
        icon={<AdjustmentsHorizontalIcon className="h-6 w-6 text-purple-500" />}
        color="bg-purple-500"
      />
    </div>
  );
}
