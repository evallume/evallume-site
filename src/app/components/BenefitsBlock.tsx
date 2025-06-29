"use client";
import { motion } from "framer-motion";
import {
  BadgeCheck, // FDA
  TrendingUp, // ROI
  GraduationCap, // Training
  Headphones, // Support
  Leaf, // Eco
  ShieldCheck, // Warranty
} from "lucide-react";

const benefits = [
  {
    icon: BadgeCheck,
    title: "FDA Certified Devices",
    desc: "Official US FDA approval for every device. Absolute safety & trust.",
    color: "from-[#bfcbd8] to-[#9d5a4d]",
    shadow: "shadow-[0_4px_32px_0_#bfcbd877]",
  },
  {
    icon: TrendingUp,
    title: "Fast ROI",
    desc: "Our clients see payback in as little as 3-8 months with proven profitability.",
    color: "from-[#e6dad1] to-[#bfcbd8]",
    shadow: "shadow-[0_4px_32px_0_#e6dad188]",
  },
  {
    icon: GraduationCap,
    title: "Online Training",
    desc: "Personalized training for your team — included free.",
    color: "from-[#bfcbd8] to-[#e6dad1]",
    shadow: "shadow-[0_4px_32px_0_#bfcbd877]",
  },
  {
    icon: Headphones,
    title: "24h Technical Support",
    desc: "Instant remote diagnostics and rapid local service for your peace of mind.",
    color: "from-[#9d5a4d] to-[#bfcbd8]",
    shadow: "shadow-[0_4px_32px_0_#9d5a4d33]",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly Commitment",
    desc: "Sustainable approach, carbon offset, every device helps plant trees.",
    color: "from-[#bfcbd8] to-[#e6dad1]",
    shadow: "shadow-[0_4px_32px_0_#bfcbd866]",
  },
  {
  icon: ShieldCheck,
  title: "2-Year Warranty",
  desc: "Industry-leading warranty with full parts & service coverage for peace of mind.",
  color: "from-[#bfcbd8] to-[#e6dad1]",
  shadow: "shadow-[0_4px_32px_0_#9d5a4d33]",
}

];

export default function BenefitsBlock() {
  return (
    <section
      id="benefits"
        className="relative py-8 md:py-16 overflow-hidden"
      aria-label="Evallume Benefits"
    >
      {/* Неоновый animated highlight/blur (background эффект) */}

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-primary text-center mb-3 font-sans drop-shadow-[0_2px_16px_#9d5a4d33]"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          Why Choose Evallume
        </motion.h2>
        <motion.p
          className="text-lg text-brandbrown text-center font-sans mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.4, 0, 0.2, 1] }}
        >
          Discover the benefits of working with Evallume: advanced technology, FDA certification, full training & local support.
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              className={`
                flex flex-col items-center text-center rounded-2xl px-6 py-8 bg-gradient-to-br ${b.color}
                hover:scale-[1.05] transition-transform duration-300 cursor-pointer ${b.shadow}
                shadow-xl border border-white/60 min-h-[250px] max-w-xs
              `}
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.11, ease: [0.38, 0.01, 0.22, 0.97] }}
              whileHover={{ scale: 1.08, boxShadow: "0 8px 32px #bfcbd899" }}
            >
              <span className="mb-4">
                <b.icon
                  size={42}
                  className="text-white drop-shadow-[0_2px_8px_#9d5a4d77]"
                />
              </span>
              <span className="font-bold text-primary text-lg md:text-xl mb-2 font-sans">
                {b.title}
              </span>
              <span className="text-sm text-[#333] font-sans opacity-85">{b.desc}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
