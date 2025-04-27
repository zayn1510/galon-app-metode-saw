"use client"

import { Search } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { MouseEvent } from "react";
import { getServerAuthToken } from "@/app/utils/getToken.server";
import ProModal from "../modals/AuthModal";
import { useRouter } from "next/navigation";
import AuthModal from "../modals/AuthModal";
interface Bubble {
  width: number;
  height: number;
  left: number;
  top: number;
  xStart: number;
  xEnd: number;
  duration: number;
  delay: number;
}
export default function HeroSection({user_token}:{user_token:string | null}) {
  // State to store random values for bubbles
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [showProModal, setShowProModal] = useState(false);
  const router = useRouter();
  useEffect(() => {
    // Generate bubbles with the correct type
    const generatedBubbles: Bubble[] = [...Array(8)].map(() => ({
      width: 5 + Math.random() * 10,
      height: 5 + Math.random() * 10,
      left: Math.random() * 100,
      top: 80 + Math.random() * 20,
      xStart: Math.random() * 100,
      xEnd: Math.random() * 100 - 50,
      duration: 15 + Math.random() * 10,
      delay: Math.random() * 5,
    }));

    setBubbles(generatedBubbles);
  }, []);

  const handleCloseModal = () => {
    setShowProModal(false);
  };

  const handleRekomendasi = ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
    if (user_token === null) {
      setShowProModal(true);
      return;
    }
    router.push("galon");
  };
  
  return (
    
    <section className="relative bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white py-32 md:py-40 overflow-hidden">
        <AuthModal 
        show={showProModal} 
        onClose={handleCloseModal}
    
      />
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-[length:60px_60px]"></div>
      </div>
      
      {/* Floating bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {bubbles.map((bubble, i) => (
          <motion.div
            key={i}
            initial={{ y: 0, x: bubble.xStart }}
            animate={{
              y: [0, -100, -200, -300],
              x: [0, bubble.xEnd, bubble.xEnd],
              opacity: [1, 0.8, 0.5, 0]
            }}
            transition={{
              duration: bubble.duration,
              repeat: Infinity,
              delay: bubble.delay
            }}
            className="absolute rounded-full bg-white/10"
            style={{
              width: `${bubble.width}px`,
              height: `${bubble.height}px`,
              left: `${bubble.left}%`,
              top: `${bubble.top}%`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Premium badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center justify-center px-4 py-2 mb-6 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
            >
              <span className="text-sm font-medium text-blue-100">✨ Sistem Rekomendasi Cerdas</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white">
                Solusi Air Minum
              </span>
              <br className="hidden md:block" />{" "}
              <span className="text-blue-100">Terbaik untuk Keluarga Anda</span>
            </h1>
            
            <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-blue-100/90 leading-relaxed font-light">
              Dengan algoritma SAW yang canggih, kami menganalisis ratusan pilihan untuk memberikan Anda rekomendasi galon yang paling optimal.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            
                <motion.button onClick={handleRekomendasi}
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: "0 0 0 2px rgba(255,255,255,0.3)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center bg-white text-blue-800 hover:bg-blue-50 font-medium px-8 py-3.5 rounded-lg transition-all duration-300 group"
                >
                  <Search className="mr-3 w-5 h-5 transition-transform group-hover:scale-110" />
                  <span className="text-sm md:text-base font-semibold">Temukan Rekomendasi</span>
                </motion.button>

              
              <Link href="/metode">
                <motion.button
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: "0 0 0 2px rgba(255,255,255,0.1)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white font-medium px-8 py-3.5 rounded-lg transition-all duration-300"
                >
                  <span className="text-sm md:text-base font-medium">Pelajari Metode</span>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Floating cards decoration */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 0.4, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute -bottom-20 left-1/4 w-32 h-40 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 rotate-12 hidden lg:block"
      />
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 0.3, y: 0 }}
        transition={{ delay: 0.7, duration: 1 }}
        className="absolute -bottom-16 right-1/4 w-28 h-36 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 -rotate-6 hidden lg:block"
      />
    </section>
  );
}
