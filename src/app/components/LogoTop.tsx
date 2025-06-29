"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const LOGO_HEIGHT = 80; // px

const LogoTop = () => (
  <div
    id="logo-top"
    style={{ height: LOGO_HEIGHT }}
    className="w-full justify-center py-0 transition-all duration-300 hidden md:flex"
  >
    <Link href="/" scroll={false}>
      <motion.img
        src="/img/logo.png"
        alt="Evallume Logo"
        className="h-24 object-contain"
        style={{ cursor: "pointer", maxWidth: 120 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
      />
    </Link>
  </div>
);

export default LogoTop;
