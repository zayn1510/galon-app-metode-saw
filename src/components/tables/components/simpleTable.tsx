import { useState } from 'react';

export default function SimpleTable() {
  // Data contoh
  const [data, setData] = useState([
    {
      id: 1,
      nama: 'Budi Santoso',
      email: 'budi@example.com',
      umur: 28,
      status: 'Aktif'
    },
    {
      id: 2,
      nama: 'Ani Wijaya',
      email: 'ani@example.com',
      umur: 32,
      status: 'Non-Aktif'
    },
    {
      id: 3,
      nama: 'Citra Lestari',
      email: 'citra@example.com',
      umur: 25,
      status: 'Aktif'
    }
  ]);

  // Fungsi handle detail
  const handleDetail = (id:number) => {
    const item = data.find(item => item.id === id);
    console.info(item?.email);
  };

  return (
    <div className="p-1 relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Nama</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Umur</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Aksi</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b">{item.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b">{item.nama}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b">{item.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b">{item.umur}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  item.status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {item.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 border-b">
                <button
                  onClick={() => handleDetail(item.id)}
                  className="text-blue-600 hover:text-blue-900 mr-3"
                >
                  Detail
                </button>
                <button
                  onClick={() => console.log('Edit', item.id)}
                  className="text-yellow-600 hover:text-yellow-900"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}