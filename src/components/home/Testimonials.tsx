// app/testimonials/components/TestimonialGrid.tsx
"use client";

import { useEffect, useState, useCallback } from 'react';
import { API_ENDPOINT } from "@/config/api";
import TestimonialSkeleton from './components/TestimonialSkelton';
import TestimonialCard from './components/RatingCard';
import { Ratings } from '@/types/rating';


export default function TestimonialGrid({initData}:{initData:Ratings[]}) {
  const [testimonials, setTestimonials] = useState<Ratings[]>(initData);
  const [page, setPage] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  // Fungsi untuk load data dengan delay
  const loadMoreTestimonials = useCallback(async () => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    
    try {
      // Tambahkan delay artificial 800ms
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
      });
      
      const res = await fetch(`${API_ENDPOINT.user}user/rating?${params.toString()}`);
      const data = await res.json();
      
      if (data.data.length === 0) {
        setHasMore(false);
      } else {
        setTestimonials(prev => [...prev, ...data.data]);
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
      if (initialLoad) setInitialLoad(false);
    }
  }, [isLoading, hasMore, page]);

  // Cek jika sudah mencapai bottom
  const checkScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const isBottom = scrollTop + clientHeight >= scrollHeight - 100; // 100px dari bottom
    
    if (isBottom && !isLoading && hasMore) {
      loadMoreTestimonials();
    }
  }, [isLoading, hasMore, loadMoreTestimonials]);

  useEffect(() => {
    // Debounce scroll event
    const debouncedCheckScroll = () => {
      let timeout;
      clearTimeout(timeout);
      timeout = setTimeout(checkScroll, 200);
    };

    window.addEventListener('scroll', debouncedCheckScroll);
    return () => window.removeEventListener('scroll', debouncedCheckScroll);
  }, [checkScroll]);

  // Initial loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (initialLoad) setInitialLoad(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Initial skeleton loading */}
        {initialLoad && (
          <>
            {[...Array(10)].map((_, i) => (
              <TestimonialSkeleton key={`skeleton-${i}`} />
            ))}
          </>
        )}

        {/* Actual testimonials */}
        {!initialLoad && testimonials.map((testi) => (
          <TestimonialCard key={`${testi.id}-${testi.created_at}`} testi={testi} />
        ))}

        {/* Loading more skeletons */}
        {isLoading && hasMore && (
          <>
            {[...Array(10)].map((_, i) => (
              <TestimonialSkeleton key={`loading-${i}`} />
            ))}
          </>
        )}
      </div>

      {!hasMore && !initialLoad && (
        <p className="text-center text-gray-400 mt-8 text-sm">
          Sudah menampilkan semua testimoni
        </p>
      )}

      {/* Tombol Load More alternatif */}
      {!isLoading && hasMore && !initialLoad && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={loadMoreTestimonials}
            className="px-6 py-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
          >
            Muat Lebih Banyak
          </button>
        </div>
      )}
    </>
  );
}