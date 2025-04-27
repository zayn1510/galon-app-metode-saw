'use client'
import Image from 'next/image'
import { FaMapMarkerAlt, FaStar, FaWhatsapp, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import NavigationButtons from './NavigationButton'
import { useEffect, useState } from 'react';
import { UserToken } from '@/types/login';

export default function ProductCard({ product,decoded,user_token }: { product: ProductsResources,decoded:UserToken | null,user_token:string | null  }) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [showReviews, setShowReviews] = useState(false);
  const formattedNumber = product.nomor_handphone.replace(/\D/g, "");
  const formattedWhatsAppNumber = formattedNumber.startsWith("0") ? `62${formattedNumber.slice(1)}` : formattedNumber;
  const whatsappLink = `https://wa.me/${formattedWhatsAppNumber}`;
  const [userLocation, setUserLocation] = useState<{ latitude: number, longitude: number } | null>(null);

  const handleOrderGalon = () => {
    window.location.href = "/order";
  }

  const handleGiveRating = () => {
    window.location.href = "/rating";
  }

  const toggleReviews = () => {
    setShowReviews(!showReviews);
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          console.info(userLocation)
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported.');
    }
  }, []);
  return (
    <div
      key={product.id_depot}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 relative flex flex-col h-full"
    >
      {/* Badges Container */}
      <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10 pointer-events-none">
        {/* Location Badge */}
        <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center shadow-md">
          <FaMapMarkerAlt className="mr-1.5 text-xs" />
          <span className="truncate max-w-[80px] sm:max-w-none">{product.jarak}</span>
        </div>
        
        {/* Rating Badge */}
        <div className="bg-white/90 backdrop-blur-sm text-yellow-800 px-3 py-1 rounded-full text-xs font-medium flex items-center shadow-md border border-yellow-100">
          <FaStar className="text-yellow-500 mr-1.5 text-xs" />
          {product.rating.toFixed(1)} / 5
        </div>
      </div>

      {/* Image Container */}
      <div className="relative aspect-square w-full flex items-center justify-center bg-gray-100">
        {isImageLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-xl"></div>
        )}
        <Image
          src={`http://localhost:8022/api/v1/depot-user/preview/${product.image}?v=${new Date(product.updated_at).getTime()}`}
          alt={product.depot}
          fill
          className={`object-cover transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={true}
          onLoad={() => setIsImageLoading(false)}
        />
      </div>

      {/* Content Container */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-2 flex-grow">
            {product.depot}
          </h3>
          <span className="text-md sm:text-lg font-semibold text-blue-600 whitespace-nowrap pl-2">
            {product.harga}
          </span>
        </div>

        <p className="text-gray-500 text-sm mb-1 line-clamp-1">{product.alamat}</p>

        {/* Rating Section with Toggle */}
        <div 
          className="flex items-center gap-1 text-sm text-yellow-600 mb-3 mt-1 cursor-pointer hover:underline"
          onClick={toggleReviews}
        >
          <FaStar className="text-yellow-400" />
          <span>{product.rating.toFixed(1)} dari 5</span>
          <span className="text-gray-400 mx-1">•</span>
          <span className="text-gray-500">{product.total_ulasan} ulasan</span>
          {showReviews ? (
            <FaChevronUp className="ml-1 text-gray-500 text-xs" />
          ) : (
            <FaChevronDown className="ml-1 text-gray-500 text-xs" />
          )}
        </div>

        {/* Reviews Section */}
        {showReviews && (
          <div className="mb-4 border-t border-gray-100 pt-3">
            <h4 className="font-medium text-gray-800 mb-2">Ulasan Terbaru</h4>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {product.ulasan && product.ulasan.length > 0 ? (
                product.ulasan.map((review, index) => (
                  <div key={index} className="border-b border-gray-100 pb-2 last:border-0">
                    <div className="flex items-center gap-2">
                      <div className="font-medium text-gray-800">{review.nama}</div>
                      <div className="flex items-center text-yellow-500 text-xs">
                        <FaStar className="mr-0.5" />
                        {review.rating}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">{review.komentar}</p>
                    <div className="text-gray-400 text-xs mt-1">
                      {new Date(review.tanggal).toLocaleDateString('id-ID')}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">Belum ada ulasan</p>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-auto grid grid-cols-2 gap-2 sm:gap-3">
          <button
            onClick={handleGiveRating}
            className="bg-gray-50 hover:bg-gray-100 text-gray-800 py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm flex items-center justify-center transition-colors border border-gray-200"
          >
            <FaStar className="text-yellow-500 mr-1 sm:mr-2 text-sm" />
            <span className="truncate">Beri Rating</span>
          </button>

          <NavigationButtons
          decoded={decoded}
          user_token={user_token}
            productLocation={{
              latitude: product.latitude,
              longitude: product.longitude,
              depot: product.depot,
            }}
          />
        </div>

        {/* WhatsApp Button */}
        {product.nomor_handphone && (
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-lg text-sm flex items-center justify-center transition-colors mt-3"
          >
            <FaWhatsapp className="mr-2 text-base" />
            <span className="truncate">Hubungi via WhatsApp</span>
          </a>
        )}
      </div>
    </div>
  );
}