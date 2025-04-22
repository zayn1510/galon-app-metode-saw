import { useState } from "react";

export type TableControl = {
  page: number;
  limit: number;
  filter: string;
  sortColumn: string;
  sortOrder: "asc" | "desc";
};

export default function useTableControl(initial?: Partial<TableControl>) {
  const [table, setTable] = useState<TableControl>({
    page: 1,
    limit: 10,
    filter: "",
    sortColumn: initial?.sortColumn || "id",
    sortOrder: initial?.sortOrder || "asc",
  });

  const setPage = (page: number) => setTable((prev) => ({ ...prev, page }));
  const setLimit = (limit: number) =>
    setTable((prev) => ({ ...prev, limit, page: 1 }));
  const setFilter = (filter: string) =>
    setTable((prev) => ({ ...prev, filter, page: 1 }));
  const setSortColumn = (col: string) =>
    setTable((prev) => ({ ...prev, sortColumn: col, page: 1 }));
  const setSortOrder = (order: "asc" | "desc") =>
    setTable((prev) => ({ ...prev, sortOrder: order, page: 1 }));

  return {
    table,
    setPage,
    setLimit,
    setFilter,
    setSortColumn,
    setSortOrder,
  };
}
