'use client';
import { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

function useIsMobile(maxWidth = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= maxWidth);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [maxWidth]);
  return isMobile;
}

// Пример баннеров (любой баннер может быть с видео или фото)
const banners = [
  {
    type: "video",
    src: "https://klfmasfbi2f0kmeu.public.blob.vercel-storage.com/Video/hero-43Im7e7Mm7sAMOBUmai4qwyiptEl88.mp4",
    heading: "FDA Certified Diode Lasers for Hair Removal | USA Professionals",
    text: "Trusted by medspas, beauty clinics, and dermatologists across the USA. Eco-friendly. Premium laser technology since 2019.",
    button: { label: "Explore Equipment", href: "#equipment" }
  },
  {
    type: "image",
    src: "https://klfmasfbi2f0kmeu.public.blob.vercel-storage.com/img/banner3-vGefyH64SWr5l1QssN6OQtFwlvimxg.png",
    srcMobile: "https://klfmasfbi2f0kmeu.public.blob.vercel-storage.com/img/banner3-mobile-fpd7dL9vqjX1JHAuDVKT28C29GskZ5.PNG",
    heading: "Best-Selling Diode Lasers for Clinics and Beauty Studios",
    text: "Chosen by professionals worldwide. Reliable. Pain-Free. Certified.",
    button: { label: "View Top Models", href: "#equipment" }
  },
  {
    type: "image",
    src: "https://klfmasfbi2f0kmeu.public.blob.vercel-storage.com/img/banner2-R1F144Q4BNlSnDFHN8wcT09xs7qPkw.jpg",
    srcMobile: "https://klfmasfbi2f0kmeu.public.blob.vercel-storage.com/img/banner2-mobile-vxNjBBFDfEgBcpENwY4KLcocmKobnv.png",
    heading: "More Than Equipment — Full Business Support for You",
    text: "From consultation to training and marketing — we help your clinic grow with the right technology.",
    button: { label: "Get a Free Consultation", href: "#contact" }
  },
  // Добавь сколько хочешь баннеров (фото или видео)
];

export default function BannerSlider() {
  const [current, setCurrent] = useState(0);
  const count = banners.length;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

// Настройка чувствительности свайпа
const swipeThreshold = 40;    // минимальная длина свайпа
const angleTolerance = 1;   // максимальный вертикальный угол (чем меньше — тем строже)
const touchStart = useRef<{ x: number; y: number } | null>(null);

  
  // Сброс и запуск автосмены (11 сек) — всегда с нуля!
  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % count);
    }, 11000);
  };

  useEffect(() => {
    resetInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line
  }, [count]);

  // Все ручные переходы обнуляют таймер!
  const goTo = (idx: number) => {
    setCurrent(idx);
    resetInterval();
  };
  const prev = () => {
    setCurrent(current === 0 ? count - 1 : current - 1);
    resetInterval();
  };
  const next = () => {
    setCurrent((current + 1) % count);
    resetInterval();
  };

  // Swipe/touch
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
    if (deltaX > 0) prev();
    else next();
  }

  touchStart.current = null;
};

  const isMobile = useIsMobile(768);
  const banner = banners[current];
  const imgSrc = isMobile && banner.srcMobile ? banner.srcMobile : banner.src;

  return (
    <section
      className="
        relative h-[70vh] min-h-[400px]
        flex items-center justify-center
        bg-black overflow-hidden
        rounded-2xl shadow-2xl
        mx-2 md:mx-auto max-w-7xl mt-4
      "
      aria-label="Hero Section"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Видео или фото */}
      {banner.type === "video" ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover opacity-70 transition-all duration-700"
          src={banner.src}
        />
      ) : (
        <Image
          src={imgSrc}
          alt={banner.heading}
          fill
          className="absolute object-cover w-full h-full opacity-80 transition-all duration-700"
          priority
        />
      )}
      {/* Темный оверлей */}
      <div className="absolute w-full h-full bg-black/40 z-10 rounded-2xl pointer-events-none" />

      {/* Контент баннера */}
      <div className="relative z-20 text-center text-white px-6 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 drop-shadow-lg transition-all duration-700">
          {banner.heading}
        </h1>
        <p className="text-xl md:text-2xl font-sans mb-8 drop-shadow-lg transition-all duration-700">
          {banner.text}
        </p>
        {banner.button && (
          <a
            href={banner.button.href}
            className="inline-block bg-[#9d5a4d] text-white rounded-full px-8 py-3 font-heading text-lg hover:bg-[#bfcbd8] transition"
            aria-label={banner.button.label}
          >
            {banner.button.label}
          </a>
        )}
      </div>

      {/* Стрелки только на десктопе */}
      <button
        onClick={prev}
        className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2 z-30 bg-black/40 rounded-full p-2 hover:bg-[#bfcbd8] hover:text-[#9d5a4d] text-white transition"
        aria-label="Previous banner"
        style={{boxShadow: "0 2px 24px #bfcbd8"}}
      >
        <ChevronLeft size={34} />
      </button>
      <button
        onClick={next}
        className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2 z-30 bg-black/40 rounded-full p-2 hover:bg-[#bfcbd8] hover:text-[#9d5a4d] text-white transition"
        aria-label="Next banner"
        style={{boxShadow: "0 2px 24px #bfcbd8"}}
      >
        <ChevronRight size={34} />
      </button>
      {/* Пагинация */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-30">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`w-3 h-3 rounded-full ${current === idx ? 'bg-[#9d5a4d] scale-125' : 'bg-[#bfcbd8]'} transition-all duration-200`}
            aria-label={`Show banner ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
