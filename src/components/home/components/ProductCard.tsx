'use client'

import Image from 'next/image'
import { FaMapMarkerAlt, FaStar, FaWhatsapp, FaTimes } from 'react-icons/fa'
import NavigationButtons from './NavigationButton'
import { useEffect, useState } from 'react'
import { UserToken } from '@/types/login'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useRatingDepot } from '@/hooks/useRatingDepot'
import { RatingRequest, Ratings } from '@/types/rating'
import RatingModal from '@/components/modals/RatingModal'

export default function ProductCard({ product, decoded, user_token }: { product: ProductsResources, decoded: UserToken | null, user_token: string | null }) {
  const [isImageLoading, setIsImageLoading] = useState(true)
  const [showReviewsModal, setShowReviewsModal] = useState(false)
  const [showRatingModal,setShowRatingModal] = useState(false)
  const [userLocation, setUserLocation] = useState<{ latitude: number, longitude: number } | null>(null)
  const [reviews, setReviews] = useState<Ratings[]>([])
  const [page] = useState(0)
  const [limit] = useState(10)

  const formattedNumber = product.nomor_handphone.replace(/\D/g, "")
  const formattedWhatsAppNumber = formattedNumber.startsWith("0") ? `62${formattedNumber.slice(1)}` : formattedNumber
  const whatsappLink = `https://wa.me/${formattedWhatsAppNumber}`

  const { GetRatingDepot } = useRatingDepot()

  const handleGiveRating = () => {
    setShowRatingModal(true);
  }

  const toggleReviewsModal = async (id_depot: number) => {
    if (!showReviewsModal) {
      const res = await GetRatingDepot(page, limit, id_depot, user_token ?? '')
      if (res.status && res.data) {
        setReviews(res.data)
      }
    }
    setShowReviewsModal(!showReviewsModal)
  }
 

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        },
        (error) => {
          console.error('Error getting location:', error)
        }
      )
    }
  }, [])

  return (
    <>
<RatingModal
        UserToken={user_token ? user_token : null}
        isOpen={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        productName={product.depot}
        productImage={product.image}
        ProductId = {product.id_depot}
        UserId = {decoded ? decoded.id : 0}
        ProductUpdatedAt={product.updated_at}
      />

      {/* Product Card */}
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-blue-100 flex flex-col h-full overflow-hidden">
        <div className="relative aspect-square w-full bg-gray-50">
          {isImageLoading && (
            <Skeleton className="absolute inset-0 h-full w-full" />
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

          {/* Badges */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
            <div className="bg-blue-600/90 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center shadow-sm">
              <FaMapMarkerAlt className="mr-1.5 text-xs" />
              <span className="truncate max-w-[80px] sm:max-w-none">{product.jarak}</span>
            </div>

            <div className="bg-white/90 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium flex items-center shadow-sm border border-yellow-100">
              <FaStar className="text-yellow-500 mr-1.5 text-xs" />
              {product.rating.toFixed(1)}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2 gap-2">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-grow">{product.depot}</h3>
            <span className="text-md font-semibold text-blue-600 whitespace-nowrap">{product.harga}</span>
          </div>

          <p className="text-gray-500 text-sm mb-3 line-clamp-1">{product.alamat}</p>

          <div className="mb-4">
            <button
              onClick={() => toggleReviewsModal(product.id_depot)}
              className="flex items-center gap-1 text-sm text-yellow-600 hover:underline focus:outline-none"
            >
              <FaStar className="text-yellow-400" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-gray-400 mx-1">•</span>
              <span className="text-gray-500">Lihat ulasan</span>
            </button>
          </div>

          <div className="mt-auto space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleGiveRating}
                className="bg-gray-50 hover:bg-gray-100 text-gray-800 py-2 rounded-lg text-xs flex items-center justify-center border border-gray-200 transition"
              >
                <FaStar className="text-yellow-500 mr-2 text-sm" />
                Beri Rating
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

            {product.nomor_handphone && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-lg text-sm flex items-center justify-center transition"
              >
                <FaWhatsapp className="mr-2 text-base" />
                Hubungi via WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Modal */}
      {showReviewsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-lg max-w-md w-full max-h-[80vh] overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Ulasan {product.depot}</h3>
              <button
                onClick={() => setShowReviewsModal(false)}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-full transition"
              >
                <FaTimes />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Average Rating */}
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-gray-900 mb-1">{product.rating.toFixed(1)}</div>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-xl ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="text-gray-500 text-sm">
                  Berdasarkan {reviews.length} ulasan
                </p>
              </div>

              {/* Reviews List */}
              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-0">
                      <div className="flex justify-between items-start">
                        <div className="font-medium text-gray-900">{review.nama}</div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={`text-sm ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="text-gray-400 text-xs mb-2">{new Date(review.created_at).toLocaleDateString('id-ID')}</div>
                      <p className="text-gray-700 text-sm">{review.komentar}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-400 py-10">Belum ada ulasan</div>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  )
}
