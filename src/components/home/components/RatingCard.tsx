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
    return (
      <div className="bg-gray-50 p-6 rounded-lg">
        <div className="flex mb-4">
          {[...Array(testi.rating)].map((_, i) => (
            <svg
              key={i}
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <p className="text-blue-600 font-semibold mb-2">{testi.depot}</p>
        <p className="text-gray-600 mb-4">"{testi.komentar}"</p>
        <div>
          <h4 className="font-semibold">{testi.nama}</h4>
          <p className="text-gray-500 text-sm">{testi.role}</p>
        </div>
      </div>
    );
  }
  