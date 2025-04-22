'use client';

import React from 'react';
import { Building2 } from 'lucide-react';

type JumlahDepotKecamatan = {
  nama_kecamatan: string;
  jumlah_depot: number;
};

type Props = {
  data: JumlahDepotKecamatan[];
};

const JumlahDepotStatCards: React.FC<Props> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="p-10 text-center text-gray-500">
        <div className="text-5xl mb-2">📭</div>
        <p className="text-lg font-medium">Belum ada data depot per kecamatan</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
      {data.map((item, index) => (
        <div
          key={index}
          className="bg-white shadow-md hover:shadow-xl transition-shadow rounded-2xl p-6 flex items-start gap-4 border border-gray-100"
        >
          <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
            <Building2 size={28} />
          </div>
          <div>
            <h2 className="text-gray-700 font-semibold text-lg">{item.nama_kecamatan}</h2>
            <p className="text-3xl font-bold text-blue-600">{item.jumlah_depot}</p>
            <span className="text-sm text-gray-500">Depot terdaftar</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JumlahDepotStatCards;
