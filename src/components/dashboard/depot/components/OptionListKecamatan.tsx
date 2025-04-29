import { KecamatanResource } from '@/types/kecamatan';
import React from 'react';



interface OptionListKecamatanProps {
  kecamatan?: KecamatanResource[];
}

const OptionListKecamatan: React.FC<OptionListKecamatanProps> = ({ kecamatan=[] }) => {
  if (kecamatan.length ==0) {
    return <option disabled>No data available</option>;
  }

  return (
    <>
      {kecamatan.map((item, index) => (
        <option value={item.id} key={index}>
          {item.nama_kecamatan}
        </option>
      ))}
    </>
  );
};

export default OptionListKecamatan;
