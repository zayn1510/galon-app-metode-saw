// components/RatingModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RatingRequest } from '@/types/rating';
import { useRatingDepot } from '@/hooks/useRatingDepot';

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productImage?: string;
  ProductId: number;
  UserId: number;
  ProductUpdatedAt: string;
  UserToken:string | null
}

const RatingModal = ({
  isOpen,
  onClose,
  productName,
  productImage,
  ProductId,
  ProductUpdatedAt,
  UserId,
  UserToken
}: RatingModalProps) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const {SubmitRatingDepot}= useRatingDepot();
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const submitRating = async () => {
    setIsSubmitting(true);
    try {
      const payload: RatingRequest = {
        user_id: UserId,
        depot_id: ProductId,
        komentar: feedback,
        rating: rating
      };
      const token = UserToken ? UserToken : ''
      await new Promise(resolve => setTimeout(resolve, 1000));
      const res = await SubmitRatingDepot(payload,token);
      setIsSuccess(true);
      setTimeout(() => {
        if (res.status) {
            onClose();
            setRating(0);
            setFeedback('');
            setIsSuccess(false);
        }
      }, 1500);
    } catch (error) {
      console.error('Gagal mengirim rating:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        >
          {/* Latar belakang */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Konten Modal */}
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.98 }}
            transition={{ 
              type: 'spring', 
              damping: 20, 
              stiffness: 400,
              bounce: 0.15
            }}
            className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden border border-gray-100"
          >
            {isSuccess ? (
              <div className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50/80 backdrop-blur-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-emerald-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
                <h3 className="mt-5 text-xl font-semibold text-gray-900">
                  Terima Kasih! ✨
                </h3>
                <p className="mt-2 text-gray-600">
                  Ulasan Anda membantu kami menjadi lebih baik.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onClose();
                    setIsSuccess(false);
                  }}
                  className="mt-6 px-5 py-2 text-sm font-medium rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
                >
                  Selesai
                </motion.button>
              </div>
            ) : (
              <>
                {/* Header Modal */}
                <div className="p-6 pb-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Beri Penilaian Anda
                    </h3>
                    <button
                      onClick={onClose}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
                      aria-label="Tutup"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Preview Produk */}
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center mt-6 mb-8"
                  >
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100 border border-gray-200 shadow-sm">
                      <img
                        src={`http://localhost:8022/api/v1/depot-user/preview/${productImage}?v=${new Date(ProductUpdatedAt).getTime()}`}
                        alt={productName}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-medium text-gray-900">
                        {productName}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        Silakan beri penilaian Anda
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Bagian Rating */}
                <div className="px-6 pb-4">
                  <div className="mb-6">
                    <p className="text-sm font-medium text-gray-700 mb-4">
                      Berapa bintang untuk produk ini?
                    </p>
                    <div className="flex items-center">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <motion.button
                            key={star}
                            type="button"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={`h-10 w-10 transition-all duration-200 ${
                              star <= (hover || rating)
                                ? 'text-amber-400'
                                : 'text-gray-300'
                            }`}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                            aria-label={`Beri ${star} bintang`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-full w-full"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </motion.button>
                        ))}
                      </div>
                      <span className="ml-3 text-sm font-medium text-gray-500">
                        {rating > 0 ? (
                          <span className="text-amber-600">
                            {rating} bintang
                          </span>
                        ) : (
                          'Pilih rating'
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Bagian Ulasan */}
                  <div className="mb-2">
                    <div className="relative">
                      <textarea
                        id="feedback"
                        rows={4}
                        className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all text-sm placeholder-transparent peer"
                        placeholder=" "
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                      />
                      <label
                        htmlFor="feedback"
                        className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-700 transition-all peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-gray-700 peer-focus:text-sm peer-focus:bg-white"
                      >
                        Bagikan pengalaman Anda (opsional)
                      </label>
                    </div>
                  </div>
                </div>

                {/* Tombol Aksi */}
                <div className="flex justify-end space-x-3 border-t border-gray-100 px-6 py-4 bg-gray-50/50">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="px-5 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 transition-colors border border-gray-200 disabled:opacity-50"
                  >
                    Batal
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: rating === 0 ? 1 : 1.02 }}
                    whileTap={{ scale: rating === 0 ? 1 : 0.98 }}
                    type="button"
                    onClick={submitRating}
                    disabled={rating === 0 || isSubmitting}
                    className={`px-5 py-2.5 text-sm font-medium rounded-lg text-white transition-colors ${
                      rating === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                    } disabled:opacity-70`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Mengirim...
                      </span>
                    ) : (
                      'Kirim Ulasan'
                    )}
                  </motion.button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RatingModal;