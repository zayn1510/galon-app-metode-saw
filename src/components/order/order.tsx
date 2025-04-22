'use client'
import React, { useState } from "react";
import { FaUser, FaShoppingCart, FaMapMarkerAlt, FaPaperPlane, FaStar, FaWhatsapp } from "react-icons/fa";

function OrderGalon() {
  const [formData, setFormData] = useState({
    nama: "",
    jumlah: 1,
    alamat: "",
    jarak: 3.5,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // WhatsApp integration logic would go here
    const message = `Halo, saya ingin memesan:\n\nNama: ${formData.nama}\nJumlah: ${formData.jumlah} galon\nAlamat: ${formData.alamat || 'Alamat belum diisi'}`;
    const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-100 space-y-6 transition-all hover:shadow-xl">
      {/* Product Card */}
      <div className="text-center space-y-5">
        <div className="relative">
          <div className="absolute -inset-2 bg-blue-50 rounded-xl blur opacity-75"></div>
          <img
            src="/images/galon.png"
            alt="Galon Air Mineral"
            className="relative w-40 h-40 mx-auto object-contain"
          />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">Galon Air Mineral 19L</h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Air mineral murni isi ulang dengan standar higienis tinggi, cocok untuk kebutuhan harian rumah tangga dan kantor.
          </p>
        </div>

        {/* Rating and Distance */}
        <div className="flex justify-center gap-8 text-gray-600">
          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-2 text-blue-500" />
            <span className="text-sm font-medium">{formData.jarak} km</span>
          </div>
          <div className="flex items-center">
            <div className="flex text-yellow-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar key={star} className="w-4 h-4" />
              ))}
            </div>
            <span className="ml-2 text-sm font-medium">4.5/5</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100"></div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUser className="text-gray-400" />
            </div>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              required
              placeholder="Contoh: Zayn Malik"
              className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 py-3 pl-10 pr-4 rounded-lg transition duration-200 text-sm"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Jumlah Galon</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaShoppingCart className="text-gray-400" />
            </div>
            <input
              type="number"
              name="jumlah"
              value={formData.jumlah}
              onChange={handleChange}
              min="1"
              max="10"
              required
              className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 py-3 pl-10 pr-4 rounded-lg transition duration-200 text-sm appearance-none"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Alamat Pengiriman</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaMapMarkerAlt className="text-gray-400" />
            </div>
            <input
              type="text"
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              placeholder="Contoh: Jl. Sudirman No. 123"
              className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 py-3 pl-10 pr-4 rounded-lg transition duration-200 text-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg transition-all duration-200 text-sm font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
        >
          <FaWhatsapp className="text-lg" />
          Pesan via WhatsApp
        </button>
      </form>
    </div>
  );
}

export default OrderGalon;