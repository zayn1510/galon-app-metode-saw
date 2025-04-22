
'use client'
import Image from 'next/image'
import { FaMapMarkerAlt, FaStar, FaWhatsapp, FaShoppingCart, FaPaperPlane } from 'react-icons/fa'
import NavigationButtons from './NavigationButton'

export default function ProductCard({ product }: { product: ProductsResources }) {

  const handleOrderGalon = ()=>{
    window.location.href="/order";
  }

  function handleGiveRating(): void {
    window.location.href="/rating";
  }

  return (
    <div
      key={product.id_depot}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 relative"
    >
      {/* Badge Jarak */}
      <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center z-10 shadow-md">
        <FaMapMarkerAlt className="mr-1.5" />
        {product.jarak}
      </div>
  
      {/* Badge Rating */}
      <div className="absolute top-4 right-4 bg-white text-yellow-800 px-3 py-1 rounded-full text-sm font-medium flex items-center shadow-md border border-yellow-100">
        <FaStar className="text-yellow-500 mr-1.5" />
        {product.rating.toFixed(1)} / 5
      </div>
  
      {/* Gambar Produk */}
      <div className="relative h-60 w-full flex items-center justify-center">
        <Image
      src={`http://localhost:8022/api/v1/depot/preview/${product.image}?v=${new Date(product.updated_at).getTime()}`}

          alt={product.depot}
          width={800}
          height={200}
          className="max-h-full max-w-full object-scale-down"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={product.id_depot === 1}
        />
      </div>
  
      {/* Konten Card */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900">{product.depot}</h3>
          <span className="text-lg font-semibold text-blue-600">{product.harga}</span>
        </div>
  
        <p className="text-gray-500 mb-1">{product.depot}</p>
        <p className="text-gray-400 text-sm mb-4">{product.alamat}</p>
  
        {/* Rating */}
        <div className="flex items-center gap-1 text-sm text-yellow-600 mb-2">
          <FaStar className="text-yellow-400" />
          <span>{product.rating.toFixed(1)} dari 5</span>
        </div>
  
        {/* Tombol Aksi Cepat */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <button
            onClick={() => handleGiveRating()}
            className="bg-gray-50 hover:bg-gray-100 text-gray-800 py-2 px-3 rounded-md text-sm flex items-center justify-center transition-colors border border-gray-200"
          >
            <FaStar className="text-yellow-500 mr-2" />
            Beri Rating
          </button>
  
          <NavigationButtons
            productLocation={{
              latitude: product.latitude,
              longitude: product.longitude,
              depot: product.depot,
            }}
          />
        </div>
  
        {/* Tombol WhatsApp */}
        {product.nomor_handphone && (
          <a
            href={`https://wa.me/${product.nomor_handphone.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-md text-sm flex items-center justify-center transition-colors"
          >
            <FaWhatsapp className="mr-2" />
            Hubungi via WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}
