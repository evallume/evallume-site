"use client";
import { useState } from "react";

const DEVICE_LIST = [
  { label: "Esthetician", value: "Esthetician", price: 20000 },
  { label: "FG2000-D", value: "FG2000-D", price: 20000 },
  { label: "Ice Cube", value: "Ice Cube", price: 20000 },
  { label: "Ice Discovery", value: "Ice Discovery", price: 20000 },
  { label: "Zun Laser", value: "Zun Laser", price: 20000 },
  { label: "PS10", value: "PS10", price: 20000 },
];

export default function ROICalculator() {
  const [device, setDevice] = useState(DEVICE_LIST[0]);
  const [rent, setRent] = useState(1500);
  const [payroll, setPayroll] = useState(3500);
  const [sessionsPerDay, setSessionsPerDay] = useState(3);
  const [sessionPrice, setSessionPrice] = useState(150);
  const [staffPercent, setStaffPercent] = useState(10);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    email: "",
    name: "",
    phone: "",
    comment: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // Можно добавить anti-spam honeypot поле, если нужно!
  const response = await fetch("https://formspree.io/f/meokvarg", {
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
      device: device.value, // Можно отправлять выбранное устройство
      rent,
      payroll,
      sessionsPerDay,
      sessionPrice,
      staffPercent,
    }),
  });

  if (response.ok) {
    setSent(true);
    setShowForm(false);
  } else {
    alert("Ошибка отправки. Попробуйте позже!");
  }
};

  // Универсальный стиль для числовых полей
  const numberBoxStyle = {
    width: 330, // Можешь поменять на 100, 140, 160 — как нравится!
    margin: "0 auto",
  };

  return (
    <section id="calculator" aria-label="ROI Calculator" className="py-8 md:py-12 font-sans">
      {/* SEO title & description */}
      <meta name="title" content="ROI Calculator for Aesthetic Equipment | Evallume" />
      <meta name="description" content="Estimate your profits with Evallume's interactive ROI calculator for laser equipment. Designed for US medspas, estheticians, and clinics investing in diode or pico lasers." />
      <meta itemProp="name" content="ROI Calculator for Aesthetic Equipment | Evallume" />
      <meta itemProp="description" content="Estimate your return on investment with Evallume’s interactive profitability calculator. Ideal for med-spas and dermatology clinics in the United States." />

<div className="max-w-5xl mx-auto px-4 rounded-3xl bg-white shadow-xl">
  <div className="flex flex-col md:flex-row justify-center items-center py-8">
    <div className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-2 text-primary font-sans tracking-tight">
        ROI Calculator
      </h2>
      <p className="text-lg text-brandbrown font-sans">
        Use our ROI Calculator to project your earnings, optimize treatment pricing, and plan your business growth with confidence.
      </p>
    </div>
    </div>
        {/* Первая линия полей */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <label className="block font-medium mb-2 text-gray-700">Choose Equipment</label>
            <select
              className="w-full rounded-2xl border px-4 py-3 bg-gray-100 font-medium"
              value={device.value}
              onChange={e => setDevice(DEVICE_LIST.find(d => d.value === e.target.value) || device)}
            >
              {DEVICE_LIST.map((d) => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium mb-2 text-gray-700">Office Rent per Month, $</label>
            <div className="flex justify-center">
              <div
                className="rounded-2xl bg-gray-100 mb-2 py-2 text-center font-medium text-base"
                style={numberBoxStyle}
              >
                {rent.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}
              </div>
            </div>
            <input
              type="range"
              min={500}
              max={50000}
              step={100}
              value={rent}
              onChange={e => setRent(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block font-medium mb-2 text-gray-700">Staff Payroll per Month, $</label>
            <div className="flex justify-center">
              <div
                className="rounded-2xl bg-gray-100 mb-2 py-2 text-center font-medium text-base"
                style={numberBoxStyle}
              >
                {payroll.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}
              </div>
            </div>
            <input
              type="range"
              min={1000}
              max={50000}
              step={500}
              value={payroll}
              onChange={e => setPayroll(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
        {/* Вторая линия полей */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <label className="block font-medium mb-2 text-gray-700">Sessions per Day</label>
            <div className="flex justify-center">
              <div
                className="flex items-center justify-center bg-gray-100 rounded-2xl px-2 py-2 mb-2"
                style={{ ...numberBoxStyle, minWidth: 90, maxWidth: 330 }}
              >
                <button
                  type="button"
                  className="text-lg px-2"
                  onClick={() => setSessionsPerDay(Math.max(1, sessionsPerDay - 1))}
                >-</button>
                <span className="font-medium text-base mx-2">{sessionsPerDay}</span>
                <button
                  type="button"
                  className="text-lg px-2"
                  onClick={() => setSessionsPerDay(sessionsPerDay + 1)}
                >+</button>
              </div>
            </div>
          </div>
          <div>
            <label className="block font-medium mb-2 text-gray-700">Average Session Price, $</label>
            <div className="flex justify-center">
              <div
                className="rounded-2xl bg-gray-100 mb-2 py-2 text-center font-medium text-base"
                style={numberBoxStyle}
              >
                {sessionPrice.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}
              </div>
            </div>
            <input
              type="range"
              min={40}
              max={1000}
              step={10}
              value={sessionPrice}
              onChange={e => setSessionPrice(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block font-medium mb-2 text-gray-700">Staff Commission, %</label>
            <div className="flex justify-center">
              <div
                className="rounded-2xl bg-gray-100 mb-2 py-2 text-center font-medium text-base"
                style={numberBoxStyle}
              >
                {staffPercent}%
              </div>
            </div>
            <input
              type="range"
              min={0}
              max={50}
              step={1}
              value={staffPercent}
              onChange={e => setStaffPercent(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
        {/* Кнопка и форма */}
        {!showForm && !sent && (
          <div className="flex justify-end">
            <button
              className="w-60 mx-auto bg-[#bfcbd8] hover:bg-[#9d5a4d] transition text-white font-bold rounded-xl py-3 flex items-center justify-center gap-2 shadow-lg hover:scale-[1.03] duration-200 text-base"
              onClick={e => {
                e.preventDefault();
                setShowForm(true);
              }}
            >
              Calculate My Profit Potential
            </button>
          </div>
        )}
        {showForm && !sent && (
          <form
            className="bg-[#f8fafc] rounded-2xl p-8 mt-6 text-center shadow-inner flex flex-col gap-4 max-w-md mx-auto"
            onSubmit={handleSubmit}
          >
            <div className="mb-4 text-xl font-bold text-[#ed5762]">Get a Personal ROI Calculation</div>
            <input
            type="text"
            name="_gotcha"
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
            />

            <input
              required
              type="text"
              placeholder="Your name"
              className="w-full border px-4 py-2 rounded-xl"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
            <input
              required
              type="email"
              placeholder="Your email"
              className="w-full border px-4 py-2 rounded-xl"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
            <input
              required
              type="tel"
              placeholder="Phone"
              className="w-full border px-4 py-2 rounded-xl"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
            />
            <textarea
              placeholder="Your comment (optional)"
              className="w-full border px-4 py-2 rounded-xl"
              value={form.comment}
              onChange={e => setForm({ ...form, comment: e.target.value })}
            />
            <button
              type="submit"
              className="bg-[#bfcbd8] hover:bg-[#9d5a4d] text-white px-6 py-2 rounded-xl font-semibold shadow hover:bg-[#1a5364] transition"
            >
              Request Calculation
            </button>
          </form>
        )}
        {sent && (
          <div className="text-center py-12 text-xl font-semibold text-[#133c47]">
            Thank you for your request!<br />
            Our team will review your inputs and send your personalized ROI calculation within 24 hours.
          </div>
        )}
        <div className="text-xs text-gray-400 mt-12 pb-4 text-center">
          Calculation is for reference only. Results depend on your location, marketing, and service quality.
        </div>
      </div>
    </section>
  );
}
