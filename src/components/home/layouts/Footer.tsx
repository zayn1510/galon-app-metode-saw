export default function Footer() {
    return (
      <footer id="kontak" className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">GalonBest</h3>
              <p className="text-gray-400">
           
              Platform rekomendasi galon terbaik berbasis metode SAW (Simple Additive Weighting) dengan mempertimbangkan kriteria seperti harga, jarak, diskon, dan rating pelanggan.
              </p>
            </div>   
            <div>
              <h4 className="font-semibold mb-4">Perusahaan</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Tentang Kami</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Karir</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Kontak</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">Jl. Galon Sejahtera No. 123</li>
                <li className="text-gray-400">info@galonbest.com</li>
                <li className="text-gray-400">0812-3456-7890</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} GalonBest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    )
  }