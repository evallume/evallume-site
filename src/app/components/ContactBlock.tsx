"use client";
import { useState } from "react";
import { Send, MessageCircle } from "lucide-react";
import Image from "next/image";

export default function ContactBlock() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  // WhatsApp link (замени на свой номер!)
  const whatsappLink = "https://wa.me/8615920900944";

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const response = await fetch("https://formspree.io/f/mrbkrpyo", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: form.message,
    }),
  });

  if (response.ok) {
    setSent(true);
  } else {
    alert("Ошибка отправки. Попробуйте позже!");
  }
};

  return (
    <section
      id="contact"
      className="relative py-8 md:py-14 rounded-3xl overflow-hidden"
      aria-label="Contact Evallume"
    >
      {/* Фоновое изображение с overlay */}
      <div className="absolute inset-0 w-full h-full hidden md:block">
        <Image
  src="https://klfmasfbi2f0kmeu.public.blob.vercel-storage.com/img/apparatus-bg-vOdQgvSwZMdDIMXWMeLVHxyJ0UyoFf.jpg"
  alt="Evallume Device"
  width={1920}         // <-- поставь реальные размеры твоего файла
  height={1080}
  className="w-full h-full object-cover object-center opacity-50"
/>
        <div className="absolute inset-0 w-full h-full bg-transparent md:hidden" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#bfcbd8]/80 via-white/80 to-[#e6dad1]/80" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-4">
        <div className="rounded-3xl bg-white/90 shadow-xl p-8 md:p-12 flex flex-col gap-6 items-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center font-sans mb-3">
            Contact Us
          </h2>
          <p className="text-lg text-brandbrown text-center mb-4">
            Please fill out the form below and our team will contact you shortly with personalized information and offers.
          </p>

          {!sent ? (
            <form
              className="w-full flex flex-col gap-4"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <input
                type="text"
                name="_gotcha"
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
                />
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  required
                  type="tel"
                  placeholder="Phone"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <textarea
                placeholder="Your message (optional)"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base min-h-[70px]"
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
              />

              {/* КНОПКИ: WhatsApp и Request Consultation — одинаковые! */}
                              <button
                  type="submit"
                  className="w-60 mx-auto bg-[#bfcbd8] hover:bg-[#9d5a4d] transition text-white font-bold rounded-xl py-3 flex items-center justify-center gap-2 shadow-lg hover:scale-[1.03] duration-200 text-base"
                  style={{ minWidth: 240 }}
                >
                  <Send size={18} /> Request Consultation
                </button>
              <div className="flex flex-col items-center gap-2 mt-4">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-60 mx-auto inline-flex items-center justify-center gap-2 px-0 py-3 rounded-xl bg-[#25d366] text-white font-bold text-base shadow-lg hover:bg-[#22b255] transition duration-200"
                  style={{ minWidth: 240 }}
                >
                  <MessageCircle size={18} /> Write us on WhatsApp
                </a>
              </div>
            </form>
          ) : (
            <div className="text-center py-10 text-xl font-semibold text-primary">
              Thank you!<br />
              Our team will contact you soon.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
