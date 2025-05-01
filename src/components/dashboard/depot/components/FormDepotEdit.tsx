'use client'
import { API_ENDPOINT } from '@/config/api';
import { UpdateDepotRequest } from '@/types/depot';
import { KecamatanResource } from '@/types/kecamatan';
import { paginationData } from '@/types/pagination';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';




const EditDepotForm = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<UpdateDepotRequest>({
    nama_depot: '',
    alamat: '',
    kecamatan_id: 0,
    latitude: 0,
    longitude: 0,
    nomor_handphone: '',
    harga: 0,
    diskon: 0,
    rating: 1,
    foto:null,
    foto_lama:''
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [kecamatan,setKecamatan] = useState<KecamatanResource[]>([]);
  const [pagination,setPagination] = useState<paginationData>({
      page:1,
      limit:100,
      total:0,
      filter:""
    })
 const { id } = useParams();
  const [message, setMessage] = useState<{ text: string; status: boolean }>({
    text: '',
    status: false,
  });
  const DetailDepot = async () => {
    try {
      const res = await fetch(API_ENDPOINT.depot + '/' + id,{
        method:"GET",
        credentials:"include"
      });
      const result = await res.json();

      if (!res.ok) {
        setMessage({
          text: 'Ada kesalahan saat memuat data di server!',
          status: true,
        });
      }
      if (result.status) {
        const { 
            nama_depot, 
            kecamatan_id, 
            alamat, 
            diskon, 
            rating, 
            nomor_handphone, 
            harga, 
            latitude, 
            longitude,
            foto,
            foto_lama,
            updated_at,
          } = result.data;
          
          setFormData({
            nama_depot,
            kecamatan_id,
            alamat,
            diskon,
            rating,
            nomor_handphone,
            harga,
            latitude,
            longitude,
            foto: null,
            foto_lama:foto
          });
        setPreviewImage(`http://localhost:8022/api/v1/depot/preview/${foto}?v=${
                    updated_at ? new Date(updated_at).getTime() : ''}`);
        
      }
    } catch (error) {
      console.error(error);
    }
  };

  const GetKecamatan = async () => {
          try {
              const res = await fetch(API_ENDPOINT.kecamatan+"?page="+pagination.page+"&limit="+pagination.limit,{
                method:"GET",
                credentials:"include"
              })
              const result = await res.json();
              const data: KecamatanResource[] = result.data;       
              setKecamatan(data);
          } catch (error) {
              console.error(error);
          }
  }
  const numberFields = ["rating"]
  useEffect(()=>{
    GetKecamatan();
    DetailDepot();
  },[id])
// Saat handleChange: simpan semua input sebagai string
const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: numberFields.includes(name) ? Number(value) :value
  }));
};


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, foto: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      if (formData.latitude ==0){
        setError("Latitude wajib diisi")
        setIsSubmitting(false)
      } else if (formData.longitude ==0) {
        setError("Longitude wajib diisi")
        setIsSubmitting(false)
      } else if (formData.harga ==0) {
        setError("Harga wajib diisi")
        setIsSubmitting(false)
      }  else if (formData.diskon ==0) {
        setError("Diskon wajib diisi")
        setIsSubmitting(false)
      } else {
        const formPayload = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value !==null) {
                formPayload.append(key,value.toString());
            }
        });
     

        if (formData.foto_lama){
            formPayload.append("foto_lama",formData.foto_lama.toString());
        }
        
        if (formData.foto) {
          formPayload.append('foto', formData.foto);
        }
  
        const response = await fetch(API_ENDPOINT.depot+"/update/"+id, {
          method: 'POST',
          body: formPayload,
          credentials:"include"
        });
  
        if (!response.ok) {
          throw new Error('Failed to create depot');
        }
  
        const data = await response.json();
        if (data.status) {
          router.push(`/dashboard/depot/`);
          return;
        }
        
    }
      
     
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.info(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  function handleNull(e: React.FormEvent<HTMLInputElement>) {
    if (Number(e.currentTarget.value) === 0) {
      e.currentTarget.value = "";
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
      <div className="max-w-3xl mx-auto text-center py-12 px-6">
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Perbarui Informasi Depot
        </h2>
        <p className="mt-4 text-lg text-gray-500">
            Silakan ubah detail berikut untuk memperbarui data depot Anda.
        </p>
        </div>


        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm bg-white p-8 space-y-6 border border-gray-200">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">Informasi Dasar</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="nama_depot" className="block text-sm font-medium text-gray-700">
                    Depot Nama <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="nama_depot"
                    name="nama_depot"
                    value={formData.nama_depot}
                    onChange={handleChange}
                    required
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-3 border"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">
                    Alamat <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="alamat"
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-3 border"
                  />
                </div>

                <div>
                  <label htmlFor="kecamatan_id" className="block text-sm font-medium text-gray-700">
                    Kecamatan <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="kecamatan_id"
                    name="kecamatan_id"
                    value={formData.kecamatan_id}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-blue-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
                  >
                    <option value="">Pilih Kecamatan</option>
                      {kecamatan.map((item,index) =>
                      (
                        <option value={item.id} key={index}>{item.nama_kecamatan}</option>
                      )
                      )}
                  </select>
                </div>

                <div>
                  <label htmlFor="nomor_handphone" className="block text-sm font-medium text-gray-700">
                    Nomor Handphone <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 flex items-center">
                      <label htmlFor="country" className="sr-only">Country</label>
                      <select id="country" name="country" className="h-full py-0 pl-3 pr-7 border-transparent bg-transparent text-gray-500 focus:ring-blue-500 focus:border-blue-500 rounded-l-md">
                        <option>ID</option>
                      </select>
                    </div>
                    <input
                      type="tel"
                      id="nomor_handphone"
                      name="nomor_handphone"
                      value={formData.nomor_handphone}
                      onChange={handleChange}
                      required
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-16 sm:text-sm border-gray-300 rounded-md p-3 border"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">Location</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">
                    Latitude <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="latitude"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleChange}
                    required
                    onClick={handleNull}
                    step="0.000001"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-3 border"
                  />
                </div>

                <div>
                  <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">
                    Longitude <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="longitude"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleChange}
                    onClick={handleNull}
                    required
                    step="0.000001"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-3 border"
                  />
                </div>
              </div>
            </div>

            {/* Pricing Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">Pricing</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="harga" className="block text-sm font-medium text-gray-700">
                    Harga (IDR) <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">Rp</span>
                    </div>
                    <input
                      type="number"
                      id="harga"
                      name="harga"
                      value={formData.harga}
                      onChange={handleChange}
                      onClick={handleNull}
                      required
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-3 border"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="diskon" className="block text-sm font-medium text-gray-700">
                    Discount (%)
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="number"
                      id="diskon"
                      name="diskon"
                      value={formData.diskon}
                      onChange={handleChange}
                      onClick={handleNull}
                      min="0"
                      max="100"
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md p-3 border"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">Rating</h3>
              <div>
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                  Initial Rating: <span className="font-semibold">{formData.rating.toFixed(1)}</span>
                </label>
                <input
                  type="range"
                  id="rating"
                  name="rating"
                  min="1"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 (Poor)</span>
                  <span>3 (Average)</span>
                  <span>5 (Excellent)</span>
                </div>
              </div>
            </div>

            {/* Photo Upload */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">Depot Photo</h3>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  {previewImage ? (
                    <div className="relative">
                      <div className="relative mx-auto h-48 w-auto">
                        <Image
                          src={previewImage}
                          alt="Preview"
                          fill
                          className="rounded-md object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewImage(null);
                          setFormData(prev => ({ ...prev, foto_depot: null }));
                          if (fileInputRef.current) fileInputRef.current.value = '';
                        }}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 -mt-2 -mr-2"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <>
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="foto_depot"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="foto_depot"
                            name="foto_depot"
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.back()}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : 'Register Depot'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDepotForm;