"use client"

import { Search } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Rekomendasi Galon Terbaik untuk Anda
        </h1>
        <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-white/90">
          Dapatkan galon terbaik berdasarkan kriteria harga, jarak, diskon, dan rating — semua dihitung dengan metode SAW.
        </p>
        <div className="flex justify-center">
        <Link href="/galon">
          <button className="inline-flex items-center justify-center border border-white text-white hover:bg-white hover:text-blue-700 font-semibold px-6 py-3 rounded-xl transition">
            <Search className="mr-2 w-4 h-4" />
            Lihat Rekomendasi
          </button>
        </Link>
        </div>
      </div>
    </section>
  );
}
