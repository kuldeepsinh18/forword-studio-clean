"use client";

import { motion, cubicBezier } from "framer-motion";
import Link from "next/link";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: cubicBezier(0.21, 0.47, 0.32, 0.98),
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function FooterSection() {
  return (
    <footer id="contact" className="w-full bg-[#050505] text-white pt-[80px] lg:pt-[200px] pb-[40px] px-6 lg:px-10 relative overflow-hidden">
      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')] bg-repeat bg-[length:200px_200px]"></div>

      <div className="max-w-[1600px] w-full mx-auto relative z-10">
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="w-full flex flex-col"
        >
          {/* Main Content: Structured Grid Layout */}
          <motion.div 
            variants={fadeUpVariant}
            className="w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-8 mb-12 lg:mb-24 items-start"
          >
            {/* Left Column: WEBSITE */}
            <div className="flex flex-col gap-6 lg:col-span-4 lg:col-start-1 items-start text-left">
              <span className="text-[12px] font-medium tracking-[0.2em] uppercase text-white/40 mb-2">
                WEBSITE
              </span>
              <div className="flex flex-col gap-4 items-start text-left">
                {['Home', 'About', 'Works', 'Services', 'Contact'].map((link) => (
                  <Link 
                    key={link} 
                    href={link === 'Home' ? '/' : `#${link.toLowerCase()}`}
                    className="text-[16px] lg:text-[18px] font-light tracking-wide text-white/60 hover:text-white transition-colors duration-[400ms] ease-out inline-block"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Column: SOCIAL */}
            <div className="flex flex-col gap-6 lg:col-span-4 lg:col-start-7 items-start text-left">
              <span className="text-[12px] font-medium tracking-[0.2em] uppercase text-white/40 mb-2">
                SOCIAL
              </span>
              <div className="flex flex-col gap-4 items-start text-left">
                {[
                  { label: 'Instagram', href: 'https://instagram.com/frward_studio' },
                  { label: 'WhatsApp', href: 'https://wa.me/918866035771' },
                  { label: 'Mail', href: 'mailto:zalahardip70@gmail.com' }
                ].map((link) => (
                  <a 
                    key={link.label} 
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-1.5 text-[16px] lg:text-[18px] font-light tracking-wide text-white/60 hover:text-white transition-colors duration-[400ms] ease-out"
                  >
                    {link.label}
                    <span className="inline-block transition-transform duration-[400ms] ease-out group-hover:translate-x-1 group-hover:-translate-y-1">
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bottom Area */}
          <motion.div 
            variants={fadeUpVariant}
            className="w-full flex flex-col sm:flex-row justify-between items-start gap-4 border-t border-white/10 pt-8"
          >
            <div className="text-[13px] font-light text-white/40 tracking-wide">
              © 2026 Forward Studio. All Rights Reserved
            </div>
          </motion.div>
        </motion.div>
        
      </div>
    </footer>
  );
}
