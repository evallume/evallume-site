"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const certificates = [
  { src: "https://klfmasfbi2f0kmeu.public.blob.vercel-storage.com/certificates/fda-6-1qiWBH5mRZF7sQWFhU8aexMKDquCSf.jpg", alt: "FDA approved" },
  { src: "https://klfmasfbi2f0kmeu.public.blob.vercel-storage.com/certificates/fda-5-WZFB7hAJLCsrElMesAmBoZTANmksaZ.jpg", alt: "FDA letter" },
  { src: "https://klfmasfbi2f0kmeu.public.blob.vercel-storage.com/certificates/ce-1-VPr0VOXf0HDCeOW81QqhEosEiTkJ5p.jpg", alt: "CE ENC" },
  { src: "https://klfmasfbi2f0kmeu.public.blob.vercel-storage.com/certificates/fda-1-2hPJ9RUHagLMCTO1II3zOij3Kb41Go.jpg", alt: "FDA letter" },
  { src: "https://klfmasfbi2f0kmeu.public.blob.vercel-storage.com/certificates/iso-1-iYdB0CUDaAYlivW7bDPBeDxw9QcHHs.jpg", alt: "ISO 13284" },
  { src: "https://klfmasfbi2f0kmeu.public.blob.vercel-storage.com/certificates/fda-2-9yCLFHxpCbjdqOgN0NNYoubZkFlwCr.jpg", alt: "FDA letter" },
  { src: "https://klfmasfbi2f0kmeu.public.blob.vercel-storage.com/certificates/fda-3-c0yRq3pIrZTDS1bPlcXgqqvOzIjnwI.jpg", alt: "FDA letter" },
  { src: "https://klfmasfbi2f0kmeu.public.blob.vercel-storage.com/certificates/fda-4-ViuKJpqWTnyfSACyCcSnv597S0AcEo.jpg", alt: "FDA letter" },
];

const visibleCount = 3;

export default function CertificatesCarousel() {
  const [center, setCenter] = useState(0);
  const [paused, setPaused] = useState(false);
  const [opened, setOpened] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const swipeThreshold = 40; 
  const angleTolerance = 1;

  const resetAutoplay = useCallback(() => {
  if (intervalRef.current) clearInterval(intervalRef.current);
  if (!paused) {
    intervalRef.current = setInterval(() => {
      setCenter(prev => (prev + 1) % certificates.length);
    }, 5000);
  }
}, [paused]);

  useEffect(() => {
  resetAutoplay();
  return () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };
}, [center, paused, resetAutoplay]);

  const getVisibleCertificates = (centerIdx: number) => {
    const n = certificates.length;
    return Array.from({ length: visibleCount }, (_, i) => (centerIdx + i - 1 + n) % n);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const deltaX = e.changedTouches[0].clientX - touchStart.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStart.current.y;

    if (Math.abs(deltaX) > swipeThreshold && Math.abs(deltaY) / Math.abs(deltaX) < angleTolerance) {
      setCenter(prev => (prev + (deltaX > 0 ? -1 : 1) + certificates.length) % certificates.length);
      resetAutoplay();
    }
    touchStart.current = null;
  };

  const handleGoTo = (idx: number) => {
    setCenter(idx);
    resetAutoplay();
  };

  const openModal = (idx: number) => {
    setPaused(true);
    setOpened(idx);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const closeModal = () => {
    setOpened(null);
    setPaused(false);
    resetAutoplay();
  };

  const visible = getVisibleCertificates(center);

  return (
    <section id="certificates" className="relative w-full py-8 md:py-12" aria-label="Evallume Certifications">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-3 font-sans">Certifications</h2>
        <p className="text-lg text-brandbrown text-center mb-8 max-w-2xl mx-auto font-sans">
          All Evallume devices are FDA certified and meet strict US safety and performance standards.
        </p>

        <div className="relative w-full flex flex-col items-center">
          <div
            className="relative flex items-center justify-center h-[330px] md:h-[400px] w-full max-w-2xl mx-auto select-none touch-auto"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {visible.map((idx, i) => {
              const pos = i - Math.floor(visibleCount / 2);
              const isCenter = pos === 0;
              return (
                <motion.div
                  key={certificates[idx].src}
                  style={{
                    zIndex: 10 - Math.abs(pos),
                    left: `${50 + pos * 23}%`,
                    transform: `translateX(-50%) scale(${isCenter ? 1 : 0.85}) rotateY(${pos * 6}deg)`,
                    position: "absolute",
                    opacity: isCenter ? 1 : 0.75,
                    filter: isCenter ? "none" : "blur(2px)",
                    cursor: isCenter ? "pointer" : "default",
                    transition: "all 0.8s cubic-bezier(0.7,0,0.3,1)",
                  }}
                  className={`duration-1000 ${isCenter ? "shadow-2xl" : "shadow"} rounded-2xl bg-white/85 pointer-events-auto`}
                  animate={{}}
                  onClick={isCenter ? () => openModal(idx) : undefined}
                  tabIndex={isCenter ? 0 : -1}
                  aria-label={`${certificates[idx].alt} enlarge`}
                >
                  <div className="flex items-center justify-center w-[250px] h-[350px] md:w-[300px] md:h-[420px]">
                    <Image
                      src={certificates[idx].src}
                      alt={certificates[idx].alt}
                      width={240}
                      height={340}
                      className="rounded-xl object-contain w-full h-full"
                      draggable={false}
                      style={{ background: "#fff", borderRadius: "1.2rem", boxShadow: isCenter ? "0 8px 36px #bfcbd866" : "0 2px 12px #bfcbd822" }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="flex gap-2 mt-6">
            {certificates.map((_, idx) => (
              <span
                key={idx}
                onClick={() => handleGoTo(idx)}
                className={`h-2.5 w-2.5 rounded-full cursor-pointer transition-all duration-300 ${center === idx ? "bg-primary scale-125" : "bg-gray-400"}`}
                aria-label="Evallume Certifications and FDA Compliance"
                role="button"
                tabIndex={0}
              />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {opened !== null && (
          <motion.div className="fixed inset-0 bg-black/80 z-[1000] flex items-center justify-center pointer-events-auto" style={{ overflowY: "auto" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal}>
            <motion.div className="relative" initial={{ scale: 0.92, opacity: 0.96 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0.96 }} onClick={(e) => e.stopPropagation()}>
              <Image
                src={certificates[opened].src}
                alt={certificates[opened].alt}
                width={600}
                height={900}
                className="rounded-2xl max-h-[90vh] max-w-[90vw] object-contain bg-white"
                draggable={false}
                style={{ borderRadius: "1.5rem", background: "#fff", boxShadow: "0 8px 48px #bfcbd888" }}
              />
              <button className="absolute -top-6 right-0 text-white text-3xl font-bold bg-black/60 rounded-full px-3 py-1" onClick={closeModal} aria-label="Close">×</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}