"use client";
import React, { useEffect, useState } from "react";
import { Search, X, ArrowDownWideNarrow, ArrowUpNarrowWide } from "lucide-react";

type Props = {
  limit: number;
  filter: string;
  name: string;
  sortColumn: string;
  sortOrder: "asc" | "desc";
  columns: { label: string; value: string }[];
  onLimitChange: (value: number) => void;
  onSearchChange: (value: string) => void;
  onSortColumnChange: (value: string) => void;
  onSortOrderChange: (value: "asc" | "desc") => void;
};

const TableControlsBasic: React.FC<Props> = ({
  limit,
  filter,
  name,
  sortColumn,
  sortOrder,
  columns,
  onLimitChange,
  onSearchChange,
  onSortColumnChange,
  onSortOrderChange,
}) => {
  const [localFilter, setLocalFilter] = useState(filter);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearchChange(localFilter);
    }, 500);
    return () => clearTimeout(timeout);
  }, [localFilter]);

  const toggleSortOrder = () => {
    onSortOrderChange(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="flex flex-wrap sm:flex-nowrap items-center gap-4">
      {/* Limit per halaman */}
      <div className="flex items-center gap-2">
        <label htmlFor="limit" className="text-sm text-gray-600">
          Tampilkan
        </label>
        <select
          id="limit"
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
        >
          {[10, 25, 50, 100].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        <span className="text-sm text-gray-500">entri</span>
      </div>

      {/* Sort by */}
      <div className="flex items-center gap-2">
        <label htmlFor="sortBy" className="text-sm text-gray-600">
          Urutkan berdasarkan
        </label>
        <select
          id="sortBy"
          value={sortColumn}
          onChange={(e) => onSortColumnChange(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
        >
          {columns.map((col) => (
            <option key={col.value} value={col.value}>
              {col.label}
            </option>
          ))}
        </select>

        {/* Tombol ASC / DESC */}
        <button
          onClick={toggleSortOrder}
          className="flex items-center gap-1 text-sm text-gray-700 border border-gray-300 px-3 py-1.5 rounded-md shadow-sm hover:bg-gray-100 transition"
        >
          {sortOrder === "asc" ? (
            <>
              <ArrowUpNarrowWide className="h-4 w-4" />
              Asc
            </>
          ) : (
            <>
              <ArrowDownWideNarrow className="h-4 w-4" />
              Desc
            </>
          )}
        </button>
      </div>

      {/* Input pencarian */}
      <div className="relative w-full sm:w-72">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder={name}
          value={localFilter}
          onChange={(e) => setLocalFilter(e.target.value)}
          className="w-full pl-10 pr-10 py-2 text-sm rounded-md border border-gray-300 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
        />
        {localFilter && (
          <button
            onClick={() => setLocalFilter("")}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-red-500 transition"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default TableControlsBasic;
