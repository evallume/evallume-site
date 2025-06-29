"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Массив сертификатов (пути к картинкам и подписи)
const certificates = [
  { src: "/certificates/fda-6.jpg", alt: "FDA approved" },
  { src: "/certificates/fda-5.jpg", alt: "FDA letter" },
  { src: "/certificates/ce-1.jpg", alt: "CE ENC" },
  { src: "/certificates/fda-1.jpg", alt: "FDA letter" },
  { src: "/certificates/iso-1.jpg", alt: "ISO 13284" },
  { src: "/certificates/fda-2.jpg", alt: "FDA letter" },
  { src: "/certificates/fda-3.jpg", alt: "FDA letter" },
  { src: "/certificates/fda-4.jpg", alt: "FDA letter" },
];

export default function CertificatesCarousel() {
  const [center, setCenter] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const visibleCount = 3; // 3 по центру (можно 5 если много сертификатов)

  // Автоматическое вращение
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCenter((prev) => (prev + 1) % certificates.length);
    }, 4000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []); // ← фикс

  // Получаем индексы для показа "сзади"
  function getVisibleCertificates(centerIdx: number) {
    const n = certificates.length;
    const result = [];
    for (let i = -Math.floor(visibleCount / 2); i <= Math.floor(visibleCount / 2); i++) {
      result.push((centerIdx + i + n) % n);
    }
    return result;
  }

  const visible = getVisibleCertificates(center);

  return (
    <section
      id="certificates"
      className="relative w-full py-8 md:py-12"
      aria-label="Evallume Certifications"
    >
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-3 font-sans">
          Certifications
        </h2>
        <p className="text-lg text-brandbrown text-center mb-8 max-w-2xl mx-auto font-sans">
          All Evallume devices are FDA certified and meet strict US safety and performance standards.
        </p>
        <div className="relative w-full flex flex-col items-center">
          {/* Карусель сертификатов */}
          <div className="relative flex items-center justify-center h-[330px] md:h-[400px] w-full max-w-2xl mx-auto select-none">
            {visible.map((idx, i) => {
              const pos = i - Math.floor(visibleCount / 2);
              const isCenter = pos === 0;
              const scale = isCenter ? 1 : 0.78;
              const blur = isCenter ? "none" : "blur-sm";
              const z = 10 - Math.abs(pos);
              const shadow = isCenter ? "shadow-2xl" : "shadow";
              const opacity = isCenter ? 1 : 0.7;
              const rotate = pos * 8;
              return (
                <motion.div
                  key={certificates[idx].src}
                  style={{
                    zIndex: z,
                    left: `${50 + pos * 24}%`,
                    transform: `translateX(-50%) scale(${scale}) rotateY(${rotate}deg)`,
                    position: "absolute",
                    opacity,
                    filter: blur,
                    transition: "all 0.6s cubic-bezier(0.7,0,0.3,1)",
                  }}
                  className={`duration-700 ${shadow} rounded-2xl bg-white/80`}
                  animate={{}}
                >
                  <Image
                    src={certificates[idx].src}
                    alt={certificates[idx].alt}
                    width={350}
                    height={520}
                    className="rounded-2xl object-contain"
                    draggable={false}
                  />
                </motion.div>
              );
            })}
          </div>
          {/* Точки-переключатели */}
          <div className="flex gap-2 mt-6">
            {certificates.map((_, idx) => (
              <span
                key={idx}
                onClick={() => setCenter(idx)}
                className={`h-2.5 w-2.5 rounded-full cursor-pointer transition-all duration-300 ${
                  center === idx ? "bg-primary scale-125" : "bg-gray-400"
                }`}
                aria-label="Evallume Certifications and FDA Compliance"
                role="button"
                tabIndex={0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
