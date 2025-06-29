"use client";
import { MessageCircle } from "lucide-react";

const FloatingContactButton = () => (
  <div className="fixed bottom-8 right-6 z-[2000] flex items-center select-none">
    <a
      href="#contact"
      className="relative group flex items-center justify-center"
      aria-label="Contact Us"
      tabIndex={0}
    >
      {/* SVG бегущая строка по кругу */}
      <svg
        width={84}
        height={50}
        viewBox="0 0 84 84"
        className="drop-shadow-xl pointer-events-none"
        style={{ transform: "rotate(-90deg)" }}
      >
        <defs>
          <path
            id="circlePath"
            d="M42 42 m -34 0 a 34 34 0 1 1 68 0 a 34 34 0 1 1 -68 0"
            fill="none"
          />
        </defs>
        <g className="animate-spin-slow origin-center">
          <text
            fontSize="10"
            fontFamily="Montserrat, Arial, sans-serif"
            fill="#9d5a4d"
            letterSpacing="2"
          >
            <textPath
              xlinkHref="#circlePath"
              href="#circlePath"
              startOffset="0%"
              style={{
                textTransform: "uppercase",
              }}
            >
              {" • Contact Us ".repeat(7)}
            </textPath>
          </text>
        </g>
      </svg>
      {/* Центральная круглая кнопка */}
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg border-4 border-white group-hover:bg-[#bfcbd8] transition duration-200">
        <MessageCircle size={32} className="text-white group-hover:text-primary transition" />
      </span>
      <style jsx global>{`
        .animate-spin-slow {
          animation: spin-slow 7s linear infinite;
        }
        @keyframes spin-slow {
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </a>
  </div>
);

export default FloatingContactButton;
