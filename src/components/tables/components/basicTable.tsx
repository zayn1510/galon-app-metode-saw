// components/Table.tsx
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

type TableProps = {
  columns: string[];
  data: Record<string, any>[];
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
};

export default function Table({ columns, data, onEdit, onDelete }: TableProps) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700 text-left text-gray-700 dark:text-gray-200 text-sm font-semibold">
            {columns.map((col, i) => (
              <th key={i} className="px-6 py-3 whitespace-nowrap">
                {col}
              </th>
            ))}
            <th className="px-6 py-3 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                Tidak ada data.
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr key={i} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                {columns.map((col, j) => (
                  <td key={j} className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap">
                    {row[col.toLowerCase()] ?? '-'}
                  </td>
                ))}
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit && onEdit(row)}
                      className="p-1 rounded hover:bg-blue-100 dark:hover:bg-blue-800 transition"
                    >
                      <PencilIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </button>
                    <button
                      onClick={() => onDelete && onDelete(row)}
                      className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-800 transition"
                    >
                      <TrashIcon className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
