"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react"; // lucide-react для стрелочки-аккордеона

const faqs = [
  {
    q: "How long does delivery take?",
    a: "Delivery is free to all U.S. cities. Standard lead time is 7 to 20 days, depending on your location and equipment model. Express options are available upon request.",
  },
  {
    q: "Is training included with the device?",
    a: "Yes. Every purchase includes full training for your team — online and ongoing support.",
  },
  {
    q: "What warranty do you provide?",
    a: "All Evallume diode lasers come with a 2-year official warranty. We provide local U.S. technical support, diagnostics, and fast replacement parts.",
  },
{
  q: "Are there payment options available?",
  a: "Yes. We accept all major credit cards, which allows you to split the payment using your card provider's installment options. Contact us to discuss the best payment method for your situation.",
},
  {
  q: "Is FDA certification included?",
  a: "Yes, all Evallume diode lasers are FDA certified for use in the United States. Relevant documentation is provided with each device.",
},
{
  q: "Do you provide technical support?",
  a: "Absolutely. Our U.S.-based technical team offers remote diagnostics, phone support, and fast part replacements to minimize downtime.",
}
];


export default function FAQBlock() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="py-8 md:py-14"
      aria-label="Frequently Asked Questions"
    >
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-4 font-sans">
          FAQ
        </h2>
        <p className="text-lg text-brandbrown text-center font-sans mb-8">
          Find answers about Evallume laser devices, delivery, training, warranties, and payment options.
        </p>
        <div className="divide-y divide-brandbrown/20 rounded-2xl bg-white/90 shadow-xl overflow-hidden">
          {faqs.map((faq, idx) => (
            <div key={idx} className="relative">
              <button
                onClick={() => setOpen(open === idx ? null : idx)}
                className="w-full text-left px-6 py-5 focus:outline-none flex items-center justify-between group"
              >
                <span className="font-semibold text-base text-primary transition group-hover:text-brandbrown">
                  {faq.q}
                </span>
                <ChevronDown
                  size={22}
                  className={`transition-transform duration-300 text-brandbrown ml-4 ${
                    open === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {open === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.36, ease: [0.4, 0, 0.2, 1] }}
                    className="px-6 pb-4 text-gray-700 text-sm"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
