"use client";

import { 
  ChartBarIcon, 
  ShoppingBagIcon, 
  UsersIcon,
  AdjustmentsHorizontalIcon,
  ArrowTrendingUpIcon,
  ArrowPathIcon
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { API_ENDPOINT } from "@/config/api";

type Stat = {
  kriteria: number;
  users: number;
  kecamatan: number;
  depot: number;
};

export default function AnalyticsDashboard() {
  const [stats, setStats] = useState<Stat | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch(API_ENDPOINT.stat, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      
      const result = await res.json();
      setStats(result.data || {
        kriteria: 0,
        users: 0,
        kecamatan: 0,
        depot: 0
      });
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err instanceof Error ? err.message : 'Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => { fetchStats(); }, []);

  const StatCard = ({ 
    title, 
    value, 
    icon,
    trend,
    loading 
  }: {
    title: string;
    value: number;
    icon: React.ReactNode;
    trend?: number;
    loading: boolean;
  }) => (
    <div className="bg-white rounded-xl border border-gray-100 p-6 transition-all hover:shadow-sm hover:border-gray-200 group">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">{title}</p>
          {loading ? (
            <div className="h-9 w-24 bg-gray-100 rounded animate-pulse"></div>
          ) : (
            <h3 className="text-3xl font-light text-gray-800">{value.toLocaleString()}</h3>
          )}
        </div>
        <div className={`p-3 rounded-lg ${loading ? 'bg-gray-100' : 'bg-blue-50/50 group-hover:bg-blue-50'} transition-colors`}>
          {loading ? (
            <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
          ) : (
            <div className="text-blue-500">{icon}</div>
          )}
        </div>
      </div>
      
     
    </div>
  );

  if (error) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-8">
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <svg className="w-12 h-12 text-rose-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Data Loading Failed</h3>
          <p className="text-gray-500 mb-4 max-w-md">{error}</p>
          <button 
            onClick={fetchStats}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ArrowPathIcon className="h-4 w-4 mr-2" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
      <StatCard
        title="Total Users"
        value={stats?.users || 0}
        icon={<UsersIcon className="h-6 w-6" />}
        trend={12.5}
        loading={loading}
      />
      <StatCard
        title="Kecamatan"
        value={stats?.kecamatan || 0}
        icon={<ChartBarIcon className="h-6 w-6" />}
        loading={loading}
      />
      <StatCard
        title="Depot Galon"
        value={stats?.depot || 0}
        icon={<ShoppingBagIcon className="h-6 w-6" />}
        trend={3.2}
        loading={loading}
      />
      <StatCard
        title="Kriteria"
        value={stats?.kriteria || 0}
        icon={<AdjustmentsHorizontalIcon className="h-6 w-6" />}
        loading={loading}
      />
    </div>
  );
}