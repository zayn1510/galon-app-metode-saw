export type DepotResource = {
    id: number;
    nama_depot: string;
    alamat: string;
    kecamatan_id: number;
    kecamatan_name: string;
    latitude: number;
    longitude: number;
    nomor_handphone: string;
    harga: number;
    diskon: number;
    rating: number;
    foto:string
    updated_at:string
  };

  export type CreateDepotRequest = {
    nama_depot: string;
    alamat: string;
    kecamatan_id: number;
    latitude: number;
    longitude: number;
    nomor_handphone: string;
    harga: number;
    diskon: number;
    rating: number;
    foto:File | null
  };
  export type UpdateDepotRequest = {
    nama_depot: string;
    alamat: string;
    kecamatan_id: number;
    latitude: number;
    longitude: number;
    nomor_handphone: string;
    harga: number;
    diskon: number;
    rating: number;
    foto_lama:string
    foto:File | null
  };