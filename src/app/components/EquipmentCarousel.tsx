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

// Слайды для блока оборудования
const slides = [
  {
    title: "Esthetician",
    image: "https://klfmasfbi2f0kmeu.public.blob.vercel-storage.com/equipment/Esthetician-OrCNWOeStCKcRgEzw0Rnw4VgMgndHg.PNG",
    description: (
      <>
        <b>Fast, painless hair removal for all skin types with triple wavelength technology</b>
        <ul className="list-disc ml-6 mt-2 text-base font-normal">
          <li>1600W high-power laser ensures quick, effective results</li>
          <li>USA Coherent laser bars: guaranteed 50 million shots, low failure rate</li>
          <li>Advanced cooling system (TEC + condenser + water + wind) for continuous 24-hour operation and maximum patient comfort</li>
          <li>100% Sapphire crystal for superior laser transmission and skin protection </li>
          <li>Real-time AI monitoring of water flow, temperature, and system safety</li>
          <li>Intelligent Android interface with treatment data storage and user-friendly operation</li>
          <li>Large 16×35mm spot size for faster treatments on larger areas</li>
        </ul>
      </>
    ),
    badge: "2 years warranty",
  },
  {
    title: "FG2000-D",
    image: "https://klfmasfbi2f0kmeu.public.blob.vercel-storage.com/equipment/FG2000-D-G6wqQkIfdJb6K8JZkq4ntmfW24Wxgz.png",
    description: (
      <>
        <b>FG2000D Diode Laser — Permanent Hair Removal System</b>
        <ul className="list-disc ml-6 mt-2 text-base font-normal">
          <li>Triple Wavelengths: 755nm+808nm+1064nm for maximum efficiency on all skin types</li>
          <li>Fast, effective, and virtually painless permanent hair removal</li>
          <li>Compact 12×16mm Anti-Ice patented handpiece for improved comfort and durability</li>
          <li>Lightweight applicator (0.5kg) for easier operation, especially on small areas</li>
          <li>Intelligent safety system with real-time monitoring</li>
          <li>High 2500W power and adjustable energy up to 120J/cm² for faster treatments</li>
          <li>Proven results with fewer sessions (3-5 sessions for visible effect)</li>
        </ul>
      </>
    ),
    badge: "2 years warranty",
  },
  {
    title: "Ice Cube",
    image: "https://klfmasfbi2f0kmeu.public.blob.vercel-storage.com/equipment/Ice%20Cube-mMmvq582dUNxKv3MwphwEupLcNKYzy.png",
    description: (
      <>
        <b>ICE CUBE Diode Laser — Triple Wavelength Painless Hair Removal</b>
        <ul className="list-disc ml-6 mt-2 text-base font-normal">
          <li>Triple wavelengths (755/808/1064nm) — effective for all skin & hair types</li>
          <li>USA Coherent laser bars with REAL 50 million shots lifespan</li>
          <li>High power options: 1000W / 1200W / 1600W / 1800W for maximum efficiency</li>
          <li>Large sapphire handpiece — 15×26mm or 15×35mm spot sizes</li>
          <li>Ice cooling system with sapphire crystal for pain-free treatments</li>
          <li>Advanced TEC double cooling, air + water circulation, compressor — ensures continuous work up to 20 hours</li>
          <li>Android system with 15.6-inch 4K color touch screen, Wi-Fi, Bluetooth, 15 language options</li>
          <li>Smart linkage: adjust settings directly from the handle or mobile device</li>
          <li>Remote control, patient database, cloud access</li>
          <li>Modular internal design, safe hydropower separation, hidden wiring for easy maintenance</li>
        </ul>
      </>
    ),
    badge: "2 years warranty",
  },
  {
    title: "Ice Discovery",
    image: "https://klfmasfbi2f0kmeu.public.blob.vercel-storage.com/equipment/Ice%20Discovery-VNDYE4FH2IY11b7hYZqEXQenuJDBss.png",
    description: (
      <>
        <b>Next-Gen Diode Laser — Adjustable Spot, Maximum Comfort, Fast ROI</b>
        <ul className="list-disc ml-6 mt-2 text-base font-normal">
          <li>4 wavelengths (755/808/940/1064nm) — suits any skin tone and hair type</li>
          <li>USA Coherent laser bar with 50 million guaranteed shots</li>
          <li>Fast -24°C TEC condenser cooling for truly pain-free experience</li>
          <li>Adjustable spot sizes (8mm, 15×17mm, 15×26mm, 15×35mm) for precise face and body treatments</li>
          <li>Remote control and cloud access via mobile app</li>
          <li>Smart screen linkage for quick, easy energy and cooling adjustments</li>
          <li>New ergonomic design with improved heat dissipation and modular maintenance</li>
          <li>Rapid results: 3–8 sessions for permanent hair reduction</li>
          <li>Designed for maximum profitability — fast return on investment, stable performance</li>
        </ul>
      </>
    ),
    badge: "2 years warranty",
  },
  {
    title: "Zun Laser",
    image: "https://klfmasfbi2f0kmeu.public.blob.vercel-storage.com/equipment/Zun%20Laser-wKXZGdlBQqjalQYviEKdS17D8JGqja.png",
    description: (
      <>
        <b>Quattro 3-Wave Diode Laser — Smart Hair Removal with Maximum Coverage</b>
        <ul className="list-disc ml-6 mt-2 text-base font-normal">
          <li>Triple wavelength system (755nm + 808nm + 1064nm) for all skin types, from light to dark</li>
          <li>Large treatment spot options: 15×26mm or 15×35mm for faster sessions</li>
          <li>Up to 50 million shots — ideal for high-traffic clinics</li>
          <li>Android system with Wi-Fi, Bluetooth, 4K screen, easy setup</li>
          <li>Smart screen linkage — control energy, fluence, and cooling directly from the handle</li>
          <li>Integrated cooling system with 6 ventilation holes for longer working time</li>
          <li>Powerful TEC cooling (1500W) for continuous 18–20 hours operation</li>
          <li>Ergonomic, modern design for maximum comfort and durability</li>
          <li>Suitable for face, body, bikini, arms, chest, beard, underarms, and more</li>
        </ul>
      </>
    ),
    badge: "2 years warranty",
  },
];
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
        <div className="text-sm text-gray-500">
          Your request has been received.<br />Our team will contact you soon.
        </div>
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

export default function EquipmentBlock() {
  const [current, setCurrent] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const slidesCount = slides.length;

const swipeThreshold = 40;    // минимальная длина свайпа
const angleTolerance = 1;   // максимально допустимый вертикальный угол
const touchStart = useRef<{ x: number; y: number } | null>(null);

  

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
    if (deltaX > 0) prevSlide();
    else nextSlide();
  }

  touchStart.current = null;
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
    <section
  id="equipment"
  className="w-full flex flex-col items-center justify-center py-2 md:py-2 px-2 scroll-mt-20"
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
      alt={`Evallume - ${slides[current].title} Laser Equipment`}
      width={400}
      height={400}
      className="object-cover w-full h-full"
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
{/* Стрелки для десктопа — по бокам блока */}
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