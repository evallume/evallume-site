"use client";
import React, { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const links = [
  { href: "#equipment", label: "Equipment" },
  { href: "#benefits", label: "Benefits" },
  { href: "#clients", label: "Clients" },
  { href: "#calculator", label: "ROI Calculator" },
  { href: "#certificates", label: "Certificates" },
  { href: "#about", label: "About us" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

const ANIMATION = 400;

export default function MobileHeader() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, ANIMATION);
  };

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <>
      {/* Header с бургером */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-lg shadow h-16 flex items-center md:hidden px-4">
        {/* Слева бургер */}
        <button
          className="flex items-center"
          onClick={() => setOpen(true)}
          aria-label="Открыть меню"
        >
          <Menu size={30} />
        </button>
        {/* Абсолютный центр — логотип */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center z-0">
          <Image
  src="https://klfmasfbi2f0kmeu.public.blob.vercel-storage.com/img/logo-YYXzUEHQNiruEPUfPeOSt2w8qAbXwT.png"
  alt="Evallume Logo"
  width={90}     // или твоя фактическая ширина
  height={32}    // или твоя фактическая высота
  className="h-16 object-contain"
  style={{ maxWidth: 90 }}
  onClick={() => window.location.href = '/'}
/>
        </div>
        {/* Справа — кнопка */}
        <div className="flex-none flex items-center ml-auto z-10">
          <a
            href="#contact"
            className="px-4 py-2 rounded-full bg-primary text-black font-semibold text-sm shadow hover:bg-primary/90 transition"
          >
           Contact us
          </a>
        </div>
      </header>

      {/* Меню поверх header, с закруглением и логотипом/крестиком */}
      {(open || closing) && (
        <>
          {/* Overlay */}
          <div
            className={`fixed inset-0 z-40 bg-black/20 
              ${closing ? "menu-overlay-fade-out" : "menu-overlay-fade-in"}`}
            onClick={handleClose}
          />

          {/* Само меню */}
          <div
            ref={menuRef}
            className={`
              fixed top-0 left-0 z-50 h-full
              w-[65vw] max-w-[410px]
              bg-white shadow-xl
              rounded-tr-[40px] rounded-br-[48px]
              flex flex-col justify-between
              ${closing ? "menu-slide-out" : "menu-slide-in"}
            `}
            style={{
              minWidth: 250,
              boxShadow: "0 10px 24px 0 rgba(0,0,0,0.10)"
            }}
          >
            {/* Верхняя панель — логотип и крест */}
            <div className="flex items-center justify-between px-5 pt-5 pb-2">
              {/* Логотип — заменить путь/размер под себя */}
              <Image
  src="https://klfmasfbi2f0kmeu.public.blob.vercel-storage.com/img/logo-YYXzUEHQNiruEPUfPeOSt2w8qAbXwT.png"
  alt="Evallume Logo"
  width={64}
  height={24}
  className="h-14 object-contain"
  style={{ maxWidth: 64, cursor: "pointer" }}
  onClick={() => {
    window.location.href = "/";
    handleClose();
  }}
/>
              <button
                className="ml-auto p-2"
                onClick={handleClose}
                aria-label="Закрыть меню"
              >
                <X size={32} />
              </button>
            </div>

            {/* Навигация */}
            <nav className="flex flex-col px-5 gap-4 mt-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-2xl font-medium py-1 rounded hover:bg-gray-100 transition"
                  onClick={handleClose}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Нижний блок с бейджами */}
            <div className="flex gap-2 items-center flex-wrap px-5 pb-6 pt-10">
              <span className="flex items-center gap-1 px-4 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-bold">
                <span role="img" aria-label="eco">💚</span> ECO FRIENDLY
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
}
