// app/testimonials/components/TestimonialSkeleton.tsx
"use client";

export default function TestimonialSkeleton() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 h-full animate-pulse">
      <div className="flex justify-between mb-4">
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-5 h-5 bg-gray-200 rounded"></div>
          ))}
        </div>
        <div className="w-20 h-4 bg-gray-200 rounded"></div>
      </div>
      
      <div className="h-6 w-3/4 bg-gray-200 rounded mb-3"></div>
      
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        <div className="h-4 bg-gray-200 rounded w-3/6"></div>
      </div>
      
      <div className="flex items-center mt-4">
        <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
        <div>
          <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
          <div className="h-3 w-16 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}