"use client"
import { DollarSign, MapPin, Gift, Star } from "lucide-react";

export default function WhyUs() {
  // Data fitur tanpa skor
  const features = [
    {
      icon: <DollarSign className="w-8 h-8 text-green-600" />,
      title: "Harga",
      desc: "Harga bersaing dengan kualitas terbaik.",
      weight: 0.3, // Bobot untuk Harga
    },
    {
      icon: <MapPin className="w-8 h-8 text-red-600" />,
      title: "Jarak",
      desc: "Jarak pengantaran yang dekat dengan lokasi Anda.",
      weight: 0.25, // Bobot untuk Jarak
    },
    {
      icon: <Gift className="w-8 h-8 text-yellow-600" />,
      title: "Diskon",
      desc: "Dapatkan promo dan diskon menarik setiap hari.",
      weight: 0.25, // Bobot untuk Diskon
    },
    {
      icon: <Star className="w-8 h-8 text-orange-600" />,
      title: "Rating",
      desc: "Peringkat tinggi dari pelanggan yang puas.",
      weight: 0.2, // Bobot untuk Rating
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
          Kenapa Pilih <span className="text-blue-600">GalonBest</span>?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
              {/* Menampilkan bobot */}
              <p className="text-sm text-gray-500 mt-4">
                Bobot: {item.weight * 100}%
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
