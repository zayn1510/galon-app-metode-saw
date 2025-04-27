"use client";

import { ChartBarIcon, CurrencyDollarIcon, ShoppingBagIcon, UsersIcon } from "@heroicons/react/16/solid";
import Card from "../../../Card";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { API_ENDPOINT } from "@/config/api";
import { getClientAuthToken } from "@/app/utils/getToken";
import { useRouter } from "next/navigation";

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
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    
    try {
     
      const res = await fetch(API_ENDPOINT.stat, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',

      });
  
      if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.statusText}`);
      }
  
      const result = await res.json();
      if (!result.data) {
        throw new Error('Invalid data format');
      }
  
      setStats(result.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-lg p-4 animate-pulse h-32" />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
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