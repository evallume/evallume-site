"use client";
import React, { useEffect, useState, useRef } from "react";

const LOGO_HEIGHT = 80;

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [show, setShow] = useState(true);
  const lastScroll = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      // sticky logic
      if (window.scrollY >= LOGO_HEIGHT) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      // show/hide logic
      const currentScroll = window.scrollY;
      if (currentScroll <= 0) {
        setShow(true);
        lastScroll.current = currentScroll;
        return;
      }
      if (currentScroll > lastScroll.current && currentScroll > 100) {
        // прокрутка вниз
        setShow(false);
      } else if (currentScroll < lastScroll.current) {
        // прокрутка вверх
        setShow(true);
      }
      lastScroll.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed left-1/2 -translate-x-1/2 z-50
        w-[97%] max-w-7xl
        bg-white/20 backdrop-blur-md
        shadow-xl h-16 flex items-center
        rounded-2xl transition-all duration-300
        ${isSticky ? "top-0" : "top-20"}
        ${show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        hidden md:flex
      `}
      style={{ margin: 0 }}
    >
      <div className="w-full px-8 flex items-center justify-center">
        <nav className="flex space-x-8" aria-label="Main Navigation">
          {[
            { href: "#equipment", label: "Equipment" },
            { href: "#benefits", label: "Benefits" },
            { href: "#clients", label: "Clients" },
            { href: "#calculator", label: "ROI Calculator" },
            { href: "#certificates", label: "Certificates" },
            { href: "#about", label: "About us" },
            { href: "#faq", label: "FAQ" },
            { href: "#contact", label: "Contact" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`
                text-nav transition-all duration-300
                font-semibold text-base
                relative
                group
              `}
              style={{}}
            >
              <span
                className={`
                  inline-block transition-all duration-300
                  group-hover:scale-110 group-hover:-translate-y-1
                  group-hover:text-white
                  group-hover:drop-shadow-[0_2px_18px_#bfcbd8cc]
                  group-hover:font-bold
                  px-1
                `}
              >
                {item.label}
              </span>
              {/* Анимированная подчеркивающая линия */}
              <span
                className={`
                  absolute left-1/2 -translate-x-1/2 bottom-[-4px] h-0.5 rounded bg-gradient-to-r from-[#bfcbd8] to-[#9d5a4d]
                  w-0 group-hover:w-full transition-all duration-300
                `}
                aria-hidden="true"
              />
            </a>
          ))}
        </nav>
      </div>
      {/* Глобальный стиль для плавности и glow */}
      <style jsx global>{`
        .text-nav {
          color: #ссс;
        }
        .group:hover .text-nav {
          color: #fff;
        }
      `}</style>
    </header>
  );
};

export default Header;
