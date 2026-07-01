"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { RajAirCoolerModal } from "@/components/RajAirCoolerModal";
import { GopalSnacksModal } from "@/components/GopalSnacksModal";
import { MahalaxmiMasalaModal } from "@/components/MahalaxmiMasalaModal";
import { DtcStillWatersModal } from "@/components/DtcStillWatersModal";
import { DaburLalTailModal } from "@/components/DaburLalTailModal";
import { SurbhikaMarigoldModal } from "@/components/SurbhikaMarigoldModal";
import { SummercoolBigBModal } from "@/components/SummercoolBigBModal";

const projects = [
  {
    id: 1,
    name: "Mahalaxmi Masala",
    category: "SOCIAL MEDIA CAMPAIGN",
    bg: "linear-gradient(160deg, #3d1a06 0%, #1e0e04 40%, #0a0805 100%)",
    videoUrl: "/selected-work/Mahalaxmi-masala/preview.mp4",
  },
  {
    id: 2,
    name: "Gopal Snacks",
    category: "SOCIAL MEDIA CAMPAIGN",
    bg: "linear-gradient(160deg, #3d1a06 0%, #1e0e04 40%, #0a0805 100%)",
    videoUrl: "/selected-work/gopal-snacks/preview.mp4",
  },

  {
    id: 4,
    name: "Raj Air Cooler",
    category: "SOCIAL MEDIA CAMPAIGN",
    bg: "linear-gradient(160deg, #1a202c 0%, #111827 40%, #000000 100%)",
    videoUrl: "/selected-work/raj-air-cooler/preview.mp4",
  },
  {
    id: 5,
    name: "DTC Still Waters",
    category: "Brand Film",
    bg: "linear-gradient(160deg, #0a1e08 0%, #061208 40%, #050705 100%)",
    videoUrl: "/selected-work/DTC Still Waters/preview.mp4",
  },
  {
    id: 6,
    name: "Dabur Lal Tail",
    category: "Brand Film",
    bg: "linear-gradient(160deg, #1a100a 0%, #100804 40%, #080706 100%)",
    videoUrl: "/selected-work/dabur lal tail/preview.mp4",
  },
  {
    id: 7,
    name: "Surbhika Marigold",
    category: "3D Product Visualization",
    bg: "linear-gradient(160deg, #3d2a06 0%, #1e1404 40%, #0a0805 100%)",
    videoUrl: "/all-work/3d-product-visualization/01-surbhika-marigold-petals.mp4",
  },
  {
    id: 8,
    name: "Summercool Big-B",
    category: "3D Product Visualization",
    bg: "linear-gradient(160deg, #0a1e1e 0%, #061212 40%, #050707 100%)",
    videoUrl: "/all-work/3d-product-visualization/02-summercool-big-b-jumbo-cooler.mp4",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.0, ease: [0.76, 0, 0.24, 1] as any },
  },
};

const ProjectCard = ({ project, onClick }: { project: any, onClick?: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "200px 0px" });

  return (
    <motion.div
      ref={ref}
      key={project.id}
      variants={itemVariants}
      onClick={onClick}
      className="group relative w-full aspect-[4/5] rounded-xl overflow-hidden cursor-pointer"
    >
      {/* Background / Video */}
      <div className="absolute inset-0 w-full h-full" style={{ background: project.bg }}>
        {project.videoUrl && (
          <video
            src={isInView ? project.videoUrl : ""}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-50 group-hover:opacity-80 transition-opacity duration-700 ease-[0.16,1,0.3,1]"
          />
        )}
        
        {/* Removed heavy SVG noise overlay for vastly improved hover performance */}
        
        {/* Image scale effect */}
        <div className="absolute inset-0 bg-transparent group-hover:scale-105 transition-transform duration-1000 ease-[0.16,1,0.3,1] z-0 pointer-events-none" />
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10 transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-105">
        <h3 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-2 text-center drop-shadow-2xl">
          {project.name}
        </h3>
        <p className="text-xs md:text-sm text-white/60 tracking-[0.2em] uppercase font-semibold text-center opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-500 ease-[0.16,1,0.3,1]">
          {project.category}
        </p>
      </div>
      
      {/* Hover borders */}
      <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 rounded-xl transition-colors duration-700 ease-[0.16,1,0.3,1] pointer-events-none z-20"></div>
    </motion.div>
  );
};

const BrandFilmCard = ({ project, onClick }: { project: any, onClick?: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "200px 0px" });

  return (
    <motion.div
      ref={ref}
      key={project.id}
      variants={itemVariants}
      onClick={onClick}
      className="group relative w-full aspect-video md:aspect-[21/9] rounded-xl overflow-hidden cursor-pointer"
    >
      {/* Background / Video */}
      <div className="absolute inset-0 w-full h-full" style={{ background: project.bg }}>
        {project.videoUrl && (
          <video
            src={isInView ? project.videoUrl : ""}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-50 group-hover:opacity-80 transition-opacity duration-700 ease-[0.16,1,0.3,1]"
          />
        )}
        
        {/* Image scale effect */}
        <div className="absolute inset-0 bg-transparent group-hover:scale-105 transition-transform duration-1000 ease-[0.16,1,0.3,1] z-0 pointer-events-none" />
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10 transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-105">
        <h3 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-2 text-center drop-shadow-2xl">
          {project.name}
        </h3>
        <p className="text-xs md:text-sm text-white/60 tracking-[0.2em] uppercase font-semibold text-center opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-500 ease-[0.16,1,0.3,1]">
          {project.category}
        </p>
      </div>
      
      {/* Hover borders */}
      <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 rounded-xl transition-colors duration-700 ease-[0.16,1,0.3,1] pointer-events-none z-20"></div>
    </motion.div>
  );
};


export default function WorksPage() {
  const [rajOpen, setRajOpen] = useState(false);
  const [gopalOpen, setGopalOpen] = useState(false);
  const [mahalaxmiOpen, setMahalaxmiOpen] = useState(false);
  const [dtcOpen, setDtcOpen] = useState(false);
  const [daburOpen, setDaburOpen] = useState(false);
  const [surbhikaOpen, setSurbhikaOpen] = useState(false);
  const [summercoolOpen, setSummercoolOpen] = useState(false);

  const handleProjectClick = (id: number) => {
    if (id === 1) setMahalaxmiOpen(true);
    if (id === 2) setGopalOpen(true);
    if (id === 4) setRajOpen(true);
    if (id === 5) setDtcOpen(true);
    if (id === 6) setDaburOpen(true);
    if (id === 7) setSurbhikaOpen(true);
    if (id === 8) setSummercoolOpen(true);
  };
  const campaigns = projects.filter(p => p.category.includes("CAMPAIGN"));
  const brandFilms = projects.filter(p => p.category.includes("Brand Film"));
  const product3d = projects.filter(p => p.category.includes("3D Product Visualization"));

  // Smooth scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 md:pt-32 pb-32 px-5 lg:px-[4.5rem]">
      {/* Navigation / Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1600px] mx-auto flex items-center justify-between mb-16 lg:mb-24"
      >
        <Link href="/" className="text-white/60 hover:text-white transition-colors duration-300 text-xs md:text-sm tracking-widest uppercase">
          ← Back to Home
        </Link>
        <h1 className="text-2xl md:text-5xl font-medium tracking-tight">All Works</h1>
        <div className="w-20 md:w-32"></div> {/* Spacer for centering */}
      </motion.div>

      {/* Campaigns Section */}
      <div className="max-w-[1600px] mx-auto mb-24 lg:mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 lg:mb-14 flex items-center gap-6"
        >
          <h2 className="text-xl md:text-2xl font-medium tracking-widest uppercase text-white/80">
            Campaigns
          </h2>
          <div className="flex-1 h-[1px] bg-white/10"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10"
        >
          {campaigns.map((project) => (
            <ProjectCard key={project.id} project={project} onClick={() => handleProjectClick(project.id)} />
          ))}
        </motion.div>
      </div>

      {/* Brand Films Section */}
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 lg:mb-14 flex items-center gap-6"
        >
          <h2 className="text-xl md:text-2xl font-medium tracking-widest uppercase text-white/80">
            Brand Films
          </h2>
          <div className="flex-1 h-[1px] bg-white/10"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10"
        >
          {brandFilms.map((project) => (
            <BrandFilmCard key={project.id} project={project} onClick={() => handleProjectClick(project.id)} />
          ))}
        </motion.div>
      </div>

      {/* 3D Product Visualization Section */}
      <div className="max-w-[1600px] mx-auto mt-24 lg:mt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 lg:mb-14 flex items-center gap-6"
        >
          <h2 className="text-xl md:text-2xl font-medium tracking-widest uppercase text-white/80">
            3D Product Visualization
          </h2>
          <div className="flex-1 h-[1px] bg-white/10"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10"
        >
          {product3d.map((project) => (
            <BrandFilmCard key={project.id} project={project} onClick={() => handleProjectClick(project.id)} />
          ))}
        </motion.div>
      </div>

      <RajAirCoolerModal isOpen={rajOpen} onClose={() => setRajOpen(false)} />
      <GopalSnacksModal isOpen={gopalOpen} onClose={() => setGopalOpen(false)} />
      <MahalaxmiMasalaModal isOpen={mahalaxmiOpen} onClose={() => setMahalaxmiOpen(false)} />
      <DtcStillWatersModal isOpen={dtcOpen} onClose={() => setDtcOpen(false)} />
      <DaburLalTailModal isOpen={daburOpen} onClose={() => setDaburOpen(false)} />
      <SurbhikaMarigoldModal isOpen={surbhikaOpen} onClose={() => setSurbhikaOpen(false)} />
      <SummercoolBigBModal isOpen={summercoolOpen} onClose={() => setSummercoolOpen(false)} />
    </div>
  );
}
