'use client'
import React, { useState } from "react";
import { FaStar, FaRegStar, FaSmile, FaFrown, FaMeh, FaPaperPlane} from "react-icons/fa";
type RatingRequest = {
    user_id?:number,
    depot_id?:number,
    komentar?:string,
    rating?:number
}
const CommentForm = ({user_id}:{user_id:number}) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [isLoading,setIsLoading] = useState(false);
  const [isError,setError] = useState(false);
  const [message,setMessage] =  useState<string | null>(null);

  
  // Data dummy komentar
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const urlCommentar = "http://localhost:8022/api/v1/rating";
    if (rating ===0 || comment.length<10) return;
    setIsLoading(true)
    setError(false)

    const payload :RatingRequest = {
        user_id:4,
        depot_id:3,
        komentar:comment,
        rating:rating
    }
    try {
        const response = await fetch(urlCommentar,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            throw new Error("HTTP error status :"+response.status)
        }
        const data = await response.json();
        if (data.status) {
            setError(false);
            setMessage("Ulasan berhasil dikirim!");
            setTimeout(() => {
                window.location.href = "/";
              }, 2000);
        } else {
            setError(true);
            setMessage(data.message);
           
        } 

    } catch (error) {
        setError(true);
        setMessage(error instanceof Error ? error.message : "Gagal mengirim ulasan!");
    }
  };

  const emotionIcons = [
    <FaFrown className="text-red-400" />,
    <FaFrown className="text-red-300" />,
    <FaMeh className="text-yellow-400" />,
    <FaSmile className="text-blue-400" />,
    <FaSmile className="text-green-500" />
  ];

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

         {/* Error Message */}
         {(message || isError) && (
        <div className={`p-4 border-b ${isError ? 'bg-red-50 text-red-600 border-red-100' : 'bg-green-50 text-green-600 border-green-100'}`}>
          {message}
        </div>
      )}
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-800">Ulasan Pelanggan</h2>
        <p className="text-gray-500 text-sm mt-1">
          Beri penilaian dan pengalaman Anda menggunakan layanan kami
        </p>
      </div>

      {/* Rating Input */}
      <div className="p-6 border-b border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Beri Rating
            </label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="text-2xl focus:outline-none transition-transform hover:scale-110"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                >
                  {star <= (hover || rating) ? (
                    <FaStar className="text-yellow-400" />
                  ) : (
                    <FaRegStar className="text-gray-300" />
                  )}
                </button>
              ))}
              {rating > 0 && (
                <span className="ml-2 text-sm font-medium text-gray-600 flex items-center gap-1">
                  {emotionIcons[rating - 1]}
                  {rating}.0/5.0
                </span>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
            "Tulis Ulasan"
            </label>
            <textarea
              id="comment"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition duration-200"
              placeholder="Bagikan pengalaman Anda (minimal 10 karakter)"

              minLength={10}
            />
          </div>

          <div className="flex justify-between items-center">
         
              <button
                type="button"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Batalkan balasan
              </button>
            <button
              type="submit"
              disabled={rating === 0 || comment.length < 10}
              className={`ml-auto px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
                rating === 0 || comment.length < 10
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
              }`}
            >
              <FaPaperPlane />
             "Posting Ulasan"
            </button>
          </div>
        </form>
      </div>

      {/* Comments Section */}
     
    </div>
  );
};

export default CommentForm;