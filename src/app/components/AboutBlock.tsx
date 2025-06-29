'use client';
import { useEffect, useRef } from "react";
import Image from "next/image";

const features = [
  "FDA Certified",
  "USA Support",
  "Fast ROI",
  "All Skin Types Safe",
  "Premium Training",
  "24/7 Tech Support",
  "2 Years Warranty",
  "Eco-Friendly Mission",
  "Smart Monitoring",
  "Marketing Assistance",
];

export default function AboutBlock() {
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let animFrame: number;
    let current = 0;
    function animate() {
      if (marqueeRef.current) {
  current -= 1.2;
  if (Math.abs(current) >= marqueeRef.current.scrollWidth / 2) {
    current = 0;
  }
  marqueeRef.current.style.transform = `translateX(${current}px)`;
}
      animFrame = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(animFrame);
  }, []);

  return (
    <section
      id="about"
        className="relative py-12 md:py-12 overflow-hidden"
      aria-label="About Evallume"
    >
      {/* Бегущая строка сверху */}
      <div className="absolute top-0 left-0 w-full flex justify-center pointer-events-none select-none z-10">
        <div className="relative w-full overflow-hidden h-10 bg-transparent">
          <div
            ref={marqueeRef}
            className="flex gap-12 text-sm text-primary font-semibold whitespace-nowrap tracking-wider uppercase opacity-80"
            style={{ willChange: "transform" }}
          >
            {features.concat(features).map((txt, idx) => (
              <span key={idx} className="px-3">
                {txt} •
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto relative z-20 px-4 py-20 md:py-28 flex flex-col items-center bg-white/90 rounded-2xl md:shadow-2xl">
        {/* Блок фото+текста */}
        <div className="flex flex-col md:flex-row items-center gap-12 w-full">
          {/* Фирменное фото — замени путь! */}
          <div className="flex-shrink-0 mb-8 md:mb-0">
            <div className="relative w-44 h-44 md:w-60 md:h-60">
              <Image
                src="/team/evallume-founder.jpg" // Поменяй на свое фото или оборудование!
                alt="Evallume Founder — Aesthetic Equipment Expert"
                fill
                className="object-cover rounded-3xl shadow-2xl border-8 border-white"
                priority
              />
              <div className="absolute -inset-4 bg-[#bfcbd8] rounded-3xl blur-2xl opacity-40 z-[-1]" />
            </div>
          </div>
          {/* Текстовый блок */}
          <div className="flex-1 flex flex-col justify-center items-center md:items-start">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center md:text-left mb-4 font-sans drop-shadow">
              About Evallume — FDA Certified Beauty Technology
            </h2>
            <p className="text-lg text-brandbrown text-center md:text-left font-sans mb-7">
              Evallume delivers FDA Certified aesthetic devices for medspas and clinics across the USA. We provide training, expert technical support, and business consulting to help you grow with confidence.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {features.slice(0, 5).map((feature, i) => (
                <span
                  key={i}
                  className="inline-block px-4 py-1 bg-brandblue/80 text-[#133c47] rounded-full text-xs font-semibold shadow hover:scale-105 hover:bg-[#9d5a4d]/80 hover:text-white transition"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Бегущая строка снизу */}
      <div className="absolute bottom-0 left-0 w-full flex justify-center pointer-events-none select-none z-10">
        <div className="relative w-full overflow-hidden h-10 bg-transparent">
          <div
            className="flex gap-12 text-sm text-primary font-semibold whitespace-nowrap tracking-wider uppercase opacity-80"
            style={{ animation: "marquee 38s linear infinite" }}
          >
            {features.concat(features).map((txt, idx) => (
              <span key={idx} className="px-3">
                {txt} •
              </span>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
