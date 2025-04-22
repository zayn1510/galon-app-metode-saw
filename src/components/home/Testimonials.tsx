import TestimonialCard from "./components/RatingCard";


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

async function getTestimonials(): Promise<Ratings[]> {
  const res = await fetch("http://localhost:8022/api/v1/rating?page=0&limit=100", {
    cache: "no-store",
  });
  const data = await res.json();
  return data.data || [];
}

export default async function Testimonials() {
  const testimonials = await getTestimonials();

  return (
    <section id="testimoni" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Apa Kata Pelanggan Kami</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testi) => (
            <TestimonialCard key={testi.id} testi={testi} />
          ))}
        </div>
      </div>
    </section>
  );
}
