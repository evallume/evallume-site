'use client';

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { ReactElement, ReactNode, isValidElement } from "react";

function isBoldElement(node: unknown): node is ReactElement<{ children: ReactNode }> {
  return (
    isValidElement(node) &&
    !!node.props &&
    typeof node.props === "object" &&
    "children" in node.props
  );
}

// Слайды для блока оборудования

interface FormProps {
  onClose: () => void;
  deviceTitle: string;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  comment: string;
}

const slides = [
  {
    title: "PS10",
    image: "https://klfmasfbi2f0kmeu.public.blob.vercel-storage.com/equipment/PS10-cAlMus61lE8A56CwAuxzAfQWoudNts.png",
    description: (
      <>
        <b>SuperPico PS10 — Advanced Picosecond Laser for Pigment Removal & Skin Rejuvenation</b>
        <ul className="list-disc ml-6 mt-2 text-base font-normal">
          <li>Ultra-short 500ps pulse duration for precise pigment destruction without damaging surrounding skin</li>
          <li>Effective for all pigmentation concerns: freckles, melasma, age spots, sun spots, tattoos, chloasma</li>
          <li>Removes even resistant blue and green tattoo pigments</li>
          <li>Activates skin repair mechanisms, stimulates collagen and elastin production</li>
          <li>Minimal downtime, fewer sessions required, reduced risk of side effects</li>
          <li>Adjustable spot size, high-precision flat-top beam profile</li>
          <li>Durable full-steel construction, easy access for maintenance</li>
          <li>Safe for all Fitzpatrick skin types I-VI</li>
        </ul>
      </>
    ),
    badge: "2 years warranty",
  },
  {
    title: "PicoFocus",
    image: "https://klfmasfbi2f0kmeu.public.blob.vercel-storage.com/equipment/picofocus-hpKdCGaAhBZK9GiWWwOQS6BniyE4ub.png",
    description: (
      <>
        <b>Picofocus 450ps Picosecond Laser — Ultimate Multi-Mode Pigment & Tattoo Removal</b>
        <ul className="list-disc ml-6 mt-2 text-base font-normal">
          <li>Ultra-short 450ps pulses for superior pigment shattering and minimal skin damage</li>
          <li>Four wavelengths (1064nm, 532nm, 585nm, 650nm) — effectively removes 9+ tattoo colors, including stubborn blue, green, and black inks</li>
          <li>High peak power (up to 1.33GW) for faster, fewer treatments with outstanding results</li>
          <li>Four advanced operation modes: Picosecond, Long Pulse, PTP Twin Pulse, Multi-Pulse — full flexibility for diverse skin concerns</li>
          <li>Focus Array Lens option for acne scars, wrinkles, and skin texture improvement via collagen stimulation</li>
          <li>Top Hat beam profile with ultra-even energy distribution for safe, precise treatments</li>
          <li>User-friendly software with presets for 11 popular treatment protocols</li>
          <li>South Korean laser arm for stable output and minimal energy loss</li>
          <li>PTP & Multi-Pulse modes reduce discomfort, lower side effects, and improve pigment removal efficiency</li>
          <li>Safe for all skin types, ideal for pigment removal, tattoos, birthmarks, melasma, and skin rejuvenation</li>
        </ul>
      </>
    ),
    badge: "2 years warranty",
  },
];

// --- Компонент формы ---
function FormComponent({ onClose, deviceTitle }: FormProps) {
  const [sent, setSent] = useState<boolean>(false);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    comment: ""
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const response = await fetch("https://formspree.io/f/xvgrdkbv", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: form.name,
      email: form.email,
      phone: form.phone,
      comment: form.comment,
      device: deviceTitle, // Вот это главное!
    }),
  });
  if (response.ok) {
    setSent(true);
  } else {
    alert("Ошибка отправки. Попробуйте позже!");
  }
}

  if (sent) {
    return (
      <div className="flex flex-col items-center text-center py-6">
        <div className="text-3xl mb-2">🎉</div>
        <div className="font-semibold text-[#9d5a4d] mb-2">Thank you!</div>
        <div className="text-sm text-gray-500">Your request has been received.<br />Our team will contact you soon.</div>
        <button
          className="mt-6 px-4 py-2 rounded bg-[#bfcbd8] text-white font-semibold hover:bg-[#9d5a4d] transition"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <input
      type="text"
      name="_gotcha"
      style={{ display: "none" }}
      tabIndex={-1}
      autoComplete="off"
      />
      <input
        required
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Your Name"
        className="rounded-lg border border-[#bfcbd8] px-4 py-2 focus:outline-none focus:border-[#9d5a4d] transition text-base"
      />
      <input
        required
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="rounded-lg border border-[#bfcbd8] px-4 py-2 focus:outline-none focus:border-[#9d5a4d] transition text-base"
      />
      <input
        required
        type="tel"
        inputMode="tel"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone (WhatsApp, Telegram, etc.)"
        className="rounded-lg border border-[#bfcbd8] px-4 py-2 focus:outline-none focus:border-[#9d5a4d] transition text-base"
      />
      <textarea
        name="comment"
        value={form.comment}
        onChange={handleChange}
        placeholder="Comment (Optional)"
        className="rounded-lg border border-[#bfcbd8] px-4 py-2 focus:outline-none focus:border-[#9d5a4d] transition text-base min-h-[80px]"
      />
      <button
        type="submit"
        className="w-full bg-[#bfcbd8] hover:bg-[#9d5a4d] text-white font-bold rounded-xl py-3 mt-2 shadow-lg hover:scale-[1.03] duration-200 text-base transition"
      >
        Get a Quote
      </button>
    </form>
  );
}

// --- Основной компонент ---
export default function EquipmentBlock() {
  const [current, setCurrent] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const slidesCount = slides.length;
  const touchStartX = useRef<number | null>(null);
  

  const handleTouchStart = (e: React.TouchEvent) => {
  touchStartX.current = e.touches[0].clientX;
};


const handleTouchEnd = (e: React.TouchEvent) => {
  if (touchStartX.current === null) return;
  const diff = e.changedTouches[0].clientX - touchStartX.current;
  if (diff > 50) prevSlide();
  if (diff < -50) nextSlide();
  touchStartX.current = null;
};

  // Stop auto-switching if full description is shown on mobile
useEffect(() => {
  if (!showFullDesc && !showForm) {
    intervalRef.current = setInterval(() => {
      setCurrent(prev => (prev === slidesCount - 1 ? 0 : prev + 1));
    }, 6000);
  }
  return () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };
}, [slidesCount, showFullDesc, showForm]);

  const goTo = (idx: number) => {
  setCurrent(idx);
  setShowFullDesc(false);
  if (intervalRef.current) clearInterval(intervalRef.current);
  intervalRef.current = setInterval(() => {
    setCurrent(prev => (prev === slidesCount - 1 ? 0 : prev + 1));
  }, 6000);
};

  const prevSlide = () => goTo(current === 0 ? slidesCount - 1 : current - 1);
  const nextSlide = () => goTo(current === slidesCount - 1 ? 0 : current + 1);

  // Функция для mobile описания
const getMobileDesc = (descNode: ReactElement<{ children: ReactNode[] }>) => {
  const children = descNode.props.children;
  if (!Array.isArray(children) || children.length < 2) {
    return { bold: null, listItems: [] };
  }
  const [bold, ul] = children;
  let listItems: ReactNode[] = [];
  if (isValidElement(ul)) {
    // ЯВНОЕ ПРИВЕДЕНИЕ через дженерик к нужному типу:
    const ulEl = ul as ReactElement<{ children?: ReactNode | ReactNode[] }>;
    const ulChildren = ulEl.props.children;
    listItems = Array.isArray(ulChildren) ? ulChildren : ulChildren ? [ulChildren] : [];
  }
  return { bold, listItems };
};

  const { bold, listItems } = getMobileDesc(slides[current].description);

  return (
    <section className="w-full flex flex-col items-center justify-center py-6 md:py-6 px-2"
    >
      <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row gap-8">
        <div
  className="relative flex-1 flex flex-col justify-between items-stretch bg-white rounded-[2.5rem] shadow-xl px-8 py-8 min-h-[430px] transition-all duration-300"
  onTouchStart={handleTouchStart}
  onTouchEnd={handleTouchEnd}
>
          {slides[current] && slides[current].badge && (
            <span className="absolute right-4 top-4 bg-[#9d5a4d] text-white text-xs font-bold rounded-full px-4 py-2 shadow-md">
              {slides[current].badge}
            </span>
          )}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-left md:pr-8">
              <h3 className="text-3xl font-semibold font-sans mb-4 text-[#9d5a4d]">
                {slides[current].title}
              </h3>
              {/* MOBILE: только часть + "Show more" */}
              {/* Мобилка + планшет: только часть + "Show more" */}
<div className="block xl:hidden text-base font-sans mb-2">
  <b>{isBoldElement(bold) ? bold.props.children : null}</b>
  <ul className="list-disc ml-4 mt-2 text-sm">
    {showFullDesc
      ? listItems
      : listItems.slice(0, 2)}
  </ul>
  {!showFullDesc && listItems.length > 2 && (
    <button
      className="text-[#9d5a4d] underline text-xs mt-2"
      onClick={() => setShowFullDesc(true)}
    >
      Show more...
    </button>
  )}
  {showFullDesc && (
    <button
      className="text-[#9d5a4d] underline text-xs mt-2"
      onClick={() => setShowFullDesc(false)}
    >
      Hide
    </button>
  )}
</div>
{/* Только на десктопе полный список */}
<div className="hidden xl:block text-lg font-sans">
  {slides[current].description}
</div>
            </div>
<div className="flex-1 flex justify-center items-center">
  <div className="w-[280px] h-[280px] md:w-[400px] md:h-[400px] flex items-center justify-center bg-white rounded-2xl shadow-lg overflow-hidden">
  <Image
    src={slides[current].image}
    alt={`Evallume - ${slides[current].title}`}
    width={current === 0 ? 320 : 400}
    height={current === 0 ? 320 : 400}
    className="object-contain w-full h-full"
    draggable={false}
    priority
  />
  </div>
                <div className="flex md:hidden w-full justify-between items-center mt-4 px-2 absolute left-0 right-0 -bottom-8 z-10">
            </div>
            </div>
            </div>
          {/* КНОПКА */}
          <div className="flex justify-end mt-8">
            <button
              className="w-60 mx-auto bg-[#bfcbd8] hover:bg-[#9d5a4d] transition text-white font-bold rounded-xl py-3 flex items-center justify-center gap-2 shadow-lg hover:scale-[1.03] duration-200 text-base"
              onClick={e => {
                e.preventDefault();
                setShowForm(true);
              }}
            >
              Get a Quote
            </button>
          </div>
          {/* Стрелки */}
          <div className="absolute -right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4 z-20">
  <button
    onClick={nextSlide}
    className="bg-white border-2 border-[#bfcbd8] rounded-full p-2 shadow-md hover:bg-[#bfcbd8] transition"
    aria-label="Next slide"
  >
    <ChevronRight size={28} className="text-[#9d5a4d]" />
  </button>
</div>
<div className="absolute -left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4 z-20">
  <button
    onClick={prevSlide}
    className="bg-white border-2 border-[#bfcbd8] rounded-full p-2 shadow-md hover:bg-[#bfcbd8] transition"
    aria-label="Previous slide"
  >
    <ChevronLeft size={28} className="text-[#9d5a4d]" />
  </button>
</div>
        </div>
      </div>
      {/* Пагинация */}
      {slidesCount > 1 && (
      <div className="flex gap-3 mt-8">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${current === idx ? 'bg-[#9d5a4d] scale-125' : 'bg-[#bfcbd8]'}`}
            aria-label={`View ${slides[idx].title} Laser`}
          />
        ))}
      </div>
      )}
      {/* Popup с формой */}
      {showForm && (
        <div className="fixed inset-0 z-[999] bg-black/60 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full relative">
            <button
              className="absolute top-4 right-4 text-[#9d5a4d] hover:text-[#bfcbd8] text-xl font-bold"
              onClick={() => setShowForm(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h4 className="text-xl font-bold mb-4 text-[#9d5a4d] text-center">Get a Quote</h4>
            <FormComponent
            onClose={() => setShowForm(false)}
            deviceTitle={slides[current].title}
            />
          </div>
        </div>
      )}
    </section>
  );
}
