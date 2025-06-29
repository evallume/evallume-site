import { Instagram, Facebook, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-tr from-[#bfcbd8] via-[#f8fafc] to-[#e6dad1] py-10 px-4" role="contentinfo">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 border-t border-[#bfcbd8] pt-8">
        {/* Левая часть — копирайт */}
<div className="text-sm text-brandbrown font-sans mb-2 md:mb-0 text-center md:text-left">
  © 2025 Evallume. All rights reserved. <br className="hidden md:inline" /> Serving medspas, clinics & beauty <br className="hidden md:inline" /> professionals across the USA.

</div>
        {/* Центр — соцсети */}
        <div className="flex items-center gap-4 mb-2 md:mb-0">
          <a
            href="https://www.instagram.com/evallume?igsh=ZDhoY3lneW81c2gy"
            target="_blank"
            rel="noopener noreferrer"
            title="Follow us on Instagram"
            aria-label="Instagram"
            className="hover:scale-110 duration-150 text-[#9d5a4d] hover:text-[#133c47]"
          >
            <Instagram size={22} />
          </a>
          <a
            href="https://www.facebook.com/share/1DzyVFYnTL/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            title="Follow us on Facebook"
            aria-label="Facebook"
            className="hover:scale-110 duration-150 text-[#9d5a4d] hover:text-[#133c47]"
          >
            <Facebook size={22}/>
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="Connect on LinkedIn"
            aria-label="LinkedIn"
            className="hover:scale-110 duration-150 text-[#9d5a4d] hover:text-[#133c47]"
          >
            <Linkedin size={22}/>
          </a>
        </div>

        {/* Правая часть — ссылки */}
        <div className="flex flex-wrap items-center gap-4 justify-center md:justify-end text-xs font-sans">
          <a
            href="/privacy-policy"
            className="text-brandbrown hover:text-[#133c47] transition underline underline-offset-4"
          >
            Privacy Policy
          </a>
          <span className="text-brandbrown opacity-40">|</span>
          <a
            href="/terms-of-use"
            className="text-brandbrown hover:text-[#133c47] transition underline underline-offset-4"
          >
            Terms of Use
          </a>
        </div>
      </div>
    </footer>
  );
}
