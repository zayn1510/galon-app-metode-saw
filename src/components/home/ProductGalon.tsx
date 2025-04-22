// app/rekomendasi/page.tsx (atau apapun nama route kamu)
import Image from 'next/image'
import { FaMapMarkerAlt, FaStar, FaShoppingCart, FaWhatsapp } from 'react-icons/fa'
import ProductCard from './components/ProductCard'
import NavigationButtons from './components/NavigationButton'


async function getProducts(): Promise<ProductsResources[]> {
  const res = await fetch('http://localhost:8022/api/v1/users/alternatif/3', {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Gagal mengambil data produk')
  }

  const data = await res.json()
  return data?.data?.hasil || []
}

export default async function ProductGalon() {
  let products: ProductsResources[] = []

  try {
    products = await getProducts()
  } catch (err) {
    return (
      <div className="text-center py-10">
        <div className="text-red-500 mb-4">Error: {(err as Error).message}</div>
        <a
          href="/rekomendasi"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Coba Lagi
        </a>
      </div>
    )
  }

  return (
    <section id="rekomendasi" className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800 mb-4">
            Rekomendasi Terdekat
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Galon Berkualitas di Sekitarmu
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pesan sekarang dan dapatkan dalam waktu kurang dari 30 menit
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.length === 0 ? (
            <div className="text-center col-span-full">Tidak ada produk ditemukan.</div>
          ) : (
            products.map((product) => (
              <ProductCard key={product.id_depot} product={product} />
            ))
          )}
        </div>

        <div className="text-center mt-14">
          <div className="bg-white inline-flex px-6 py-4 rounded-xl shadow-md border border-gray-200">
            <div className="flex flex-col sm:flex-row items-center">
              <span className="text-gray-700 mr-0 sm:mr-4 mb-3 sm:mb-0">
                Tidak menemukan yang sesuai?
              </span>
              <a href="/depot" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors shadow-sm">
                Lihat Semua Depot
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
