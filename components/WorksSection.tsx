"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, cubicBezier } from "framer-motion";
import Link from "next/link";
import { RajAirCoolerModal } from "./RajAirCoolerModal";
import { GopalSnacksModal } from "./GopalSnacksModal";
import { MahalaxmiMasalaModal } from "./MahalaxmiMasalaModal";
import { DtcStillWatersModal } from "./DtcStillWatersModal";
import { DaburLalTailModal } from "./DaburLalTailModal";

const ease = cubicBezier(0.76, 0, 0.24, 1);

const works = [
  {
    id: 1,
    name: "Gopal Snacks",
    category: "SOCIAL MEDIA CAMPAIGN",
    bg: "linear-gradient(160deg, #3d1a06 0%, #1e0e04 40%, #0a0805 100%)",
    videoUrl: "/selected-work/gopal-snacks/preview.mp4",
  },
  {
    id: 2,
    name: "Raj Air Cooler",
    category: "SOCIAL MEDIA CAMPAIGN",
    bg: "linear-gradient(160deg, #1a202c 0%, #111827 40%, #000000 100%)", // Cool tone gradient
    videoUrl: "/selected-work/raj-air-cooler/preview.mp4",
  },
  {
    id: 3,
    name: "Mahalaxmi Masala",
    category: "SOCIAL MEDIA CAMPAIGN",
    bg: "linear-gradient(160deg, #3d1a06 0%, #1e0e04 40%, #0a0805 100%)",
    videoUrl: "/selected-work/Mahalaxmi-masala/preview.mp4",
  },
  {
    id: 4,
    name: "DTC Still Waters",
    category: "Brand Film",
    bg: "linear-gradient(160deg, #0a1e08 0%, #061208 40%, #050705 100%)",
    videoUrl: "/selected-work/DTC Still Waters/preview.mp4",
  },
  {
    id: 5,
    name: "Dabur Lal Tail",
    category: "Brand Film",
    bg: "linear-gradient(160deg, #1a100a 0%, #100804 40%, #080706 100%)",
    videoUrl: "/selected-work/dabur lal tail/preview.mp4",
  },
];

// Individual project — 100vw × 100vh, text centered, background parallax
function ProjectItem({ work, onClick }: { work: (typeof works)[0], onClick?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Subtle parallax: background moves slower than the page
  const bgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  // Text parallax — moves slightly faster than background for depth
  const textY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  // Lazy loading video
  const isInView = useInView(ref, { once: true, margin: "200px 0px" });

  const isClickable = work.id === 1 || work.id === 2 || work.id === 3 || work.id === 4 || work.id === 5;

  return (
    <motion.div
      ref={ref}
      className={`relative w-full overflow-hidden group ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}
      style={{ height: "100vh" }}
      onClick={isClickable ? onClick : undefined}
    >
      {/* Full-bleed background with parallax */}
      <motion.div
        className="absolute inset-0 w-full overflow-hidden"
        style={{
          background: work.bg,
          y: bgY,
          // Slightly taller than container to allow parallax movement without gaps
          height: "120%",
          top: "-10%",
        }}
      >
        {work.videoUrl && (
          <video
            src={isInView ? work.videoUrl : ""}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className={`absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-700 ease-out ${work.category === 'Brand Film' ? 'scale-[1.35]' : ''}`}
          />
        )}
        
        {/* Film grain noise over background/video */}
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />
        
        {/* Cinematic dark overlay */}
        {work.videoUrl && (
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        )}
      </motion.div>

      {/* Text — centered horizontally, positioned in upper-center area of the frame */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10 transition-transform duration-700 ease-out group-hover:scale-105"
        style={{ y: textY }}
      >
        <h3
          className="m-0 text-white text-center font-medium leading-none tracking-[-0.02em]"
          style={{ fontSize: "clamp(36px, 5vw, 72px)" }}
        >
          {work.name}
        </h3>
        <p
          className="m-0 text-white/60 group-hover:text-white/90 transition-colors duration-500 text-center font-semibold tracking-[0.15em]"
          style={{ fontSize: "clamp(10px, 1vw, 13px)" }}
        >
          {work.category}
        </p>
        {!isClickable && (
          <span className="text-white/30 text-xs tracking-widest uppercase mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">Coming Soon</span>
        )}
      </motion.div>
    </motion.div>
  );
}

export function WorksSection() {
  const [rajOpen, setRajOpen] = useState(false);
  const [gopalOpen, setGopalOpen] = useState(false);
  const [mahalaxmiOpen, setMahalaxmiOpen] = useState(false);
  const [dtcOpen, setDtcOpen] = useState(false);
  const [daburOpen, setDaburOpen] = useState(false);

  // Removed heavy image preloading to vastly improve initial page load performance
  
  return (
    <>

      <section id="works" className="w-full bg-[#050505] text-white">

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, ease }}
          className="w-full px-5 lg:px-[4.5rem] pt-[100px] lg:pt-[140px]"
        >
          <div className="max-w-[1600px] mx-auto pb-6 lg:pb-8">
            <span
              className="text-white font-medium tracking-[-0.02em] leading-none"
              style={{ fontSize: "clamp(28px, 3.5vw, 52px)" }}
            >
              Selected Work
            </span>
          </div>
          {/* Full-width thin divider */}
          <div className="w-full h-px bg-white/[0.08]" />
        </motion.div>

        {/* ── PROJECTS ── */}
        <div className="w-full mt-[60px] lg:mt-[80px]">
          {works.map((work) => (
            <ProjectItem 
              key={work.id} 
              work={work} 
              onClick={() => {
                if (work.id === 1) setGopalOpen(true);
                if (work.id === 2) setRajOpen(true);
                if (work.id === 3) setMahalaxmiOpen(true);
                if (work.id === 4) setDtcOpen(true);
                if (work.id === 5) setDaburOpen(true);
              }} 
            />
          ))}
        </div>

        {/* ── ALL WORKS CTA ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.0, ease }}
          className="w-full flex items-center justify-center"
          style={{ height: "90vh" }}
        >
          <Link href="/works" className="group flex items-center gap-0 cursor-pointer">
            <motion.span
              className="text-white font-medium leading-none tracking-[-0.03em]"
              style={{ fontSize: "clamp(48px, 7vw, 100px)" }}
              whileHover={{ opacity: 0.7 }}
              transition={{ duration: 0.3 }}
            >
              All Works (5)
            </motion.span>
          </Link>
        </motion.div>

      </section>

      {/* Campaign Detail Modals */}
      <RajAirCoolerModal 
        isOpen={rajOpen} 
        onClose={() => setRajOpen(false)} 
      />
      <GopalSnacksModal 
        isOpen={gopalOpen} 
        onClose={() => setGopalOpen(false)} 
      />
      <MahalaxmiMasalaModal
        isOpen={mahalaxmiOpen}
        onClose={() => setMahalaxmiOpen(false)}
      />
      <DtcStillWatersModal
        isOpen={dtcOpen}
        onClose={() => setDtcOpen(false)}
      />
      <DaburLalTailModal
        isOpen={daburOpen}
        onClose={() => setDaburOpen(false)}
      />
    </>
  );
}
