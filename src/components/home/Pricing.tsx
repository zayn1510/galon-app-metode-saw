export default function Pricing() {
    const plans = [
      {
        name: "Reguler",
        price: "15.000",
        features: [
          "Galon 19L standard",
          "Gratis antar area terdekat",
          "Pemesanan minimal 2 galon"
        ]
      },
      {
        name: "Premium",
        price: "25.000",
        features: [
          "Galon 19L premium",
          "Gratis antar semua area",
          "Gratis gelas kristal",
          "Prioritas pengantaran"
        ],
        popular: true
      },
      {
        name: "Paket Bulanan",
        price: "300.000",
        features: [
          "12 galon premium",
          "Gratis antar semua area",
          "Bonus 2 galon",
          "Free dispenser rental",
          "Prioritas pengantaran"
        ]
      }
    ]
  
    return (
      <section id="harga" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Paket Harga</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Pilih paket yang sesuai dengan kebutuhan Anda. Semakin banyak pesan, semakin hemat!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div key={index} className={`card-galon relative ${plan.popular ? 'border-2 border-blue-500' : ''}`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
                    POPULAR
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-4xl font-bold mb-6">
                    Rp{plan.price}
                    <span className="text-sm font-normal text-gray-500">/galon</span>
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <button className={`btn-primary w-full ${plan.popular ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-800'}`}>
                    Pilih Paket
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }