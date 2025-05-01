// app/testimonials/components/RatingCard.tsx
"use client";

type Ratings = {
  id: number;
  user_id: number;
  depot_id: number;
  nama: string;
  depot: string;
  komentar: string;
  rating: number;
  role: string;
  created_at: string;
};

export default function TestimonialCard({ testi }: { testi: Ratings }) {
  const formattedDate = new Date(testi.created_at).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow-xs hover:shadow-sm transition-all duration-300 border border-gray-100 h-full flex flex-col group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-5 h-5 ${i < testi.rating ? 'text-yellow-400' : 'text-gray-200'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-xs text-gray-400">{formattedDate}</span>
      </div>
      
      <h3 className="text-blue-600 font-semibold mb-2 text-lg line-clamp-1">{testi.depot}</h3>
      
      <div className="relative mb-4 flex-grow">
        <div className="absolute top-0 left-0 text-6xl text-gray-100 font-serif leading-none"></div>
        <p className="text-gray-700 pl-6 pt-4 relative z-10 italic line-clamp-4">
          {testi.komentar}
        </p>
      </div>
      
      <div className="flex items-center mt-auto">
        <div className="bg-blue-100 text-blue-800 rounded-full w-10 h-10 flex items-center justify-center font-bold mr-3 group-hover:bg-blue-200 transition-colors">
          {testi.nama.charAt(0).toUpperCase()}
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">{testi.nama}</h4>
          <p className="text-gray-500 text-sm capitalize">{testi.role.toLowerCase()}</p>
        </div>
      </div>
    </div>
  );
}