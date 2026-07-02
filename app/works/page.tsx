"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { UnifiedProjectModal } from "@/components/UnifiedProjectModal";
import { RajAirCoolerModal } from "@/components/RajAirCoolerModal";
import { GopalSnacksModal } from "@/components/GopalSnacksModal";
import { MahalaxmiMasalaModal } from "@/components/MahalaxmiMasalaModal";
import { DtcStillWatersModal } from "@/components/DtcStillWatersModal";
import { DaburLalTailModal } from "@/components/DaburLalTailModal";
import { SurbhikaMarigoldModal } from "@/components/SurbhikaMarigoldModal";
import { SummercoolBigBModal } from "@/components/SummercoolBigBModal";

// Attempt to load dynamic data, fallback to empty array
let dynamicData = { categories: [] as any[] };
try {
  dynamicData = require('@/data/work-data.json');
} catch (e) {
  console.warn("No dynamic work data found. Run npm run predev to generate assets manifest.");
}

// 1. Hardcoded selected-work projects (Legacy)
const legacyProjects = [
  {
    id: 1,
    name: "Gopal Snacks",
    category: "Campaigns",
    bg: "linear-gradient(160deg, #3d1a06 0%, #1e0e04 40%, #0a0805 100%)",
    preview: "/selected-work/gopal-snacks/preview.mp4",
    isLegacy: true,
  },
  {
    id: 2,
    name: "Mahalaxmi Masala",
    category: "Campaigns",
    bg: "linear-gradient(160deg, #3d1a06 0%, #1e0e04 40%, #0a0805 100%)",
    preview: "/selected-work/Mahalaxmi-masala/preview.mp4",
    isLegacy: true,
  },
  {
    id: 4,
    name: "Raj Air Cooler",
    category: "Campaigns",
    bg: "linear-gradient(160deg, #1a202c 0%, #111827 40%, #000000 100%)",
    preview: "/selected-work/raj-air-cooler/preview.mp4",
    isLegacy: true,
  },
  {
    id: 5,
    name: "DTC Still Waters",
    category: "Brand Films",
    bg: "linear-gradient(160deg, #0a1e08 0%, #061208 40%, #050705 100%)",
    preview: "/selected-work/DTC Still Waters/preview.mp4",
    isLegacy: true,
  },
  {
    id: 6,
    name: "Dabur Lal Tail",
    category: "Brand Films",
    bg: "linear-gradient(160deg, #1a100a 0%, #100804 40%, #080706 100%)",
    preview: "/selected-work/dabur lal tail/preview.mp4",
    isLegacy: true,
  },
  {
    id: 7,
    name: "Surbhika Marigold",
    category: "3D Product Visualization",
    bg: "linear-gradient(160deg, #1a100a 0%, #100804 40%, #080706 100%)",
    preview: "/all-work/3d-product-visualization/surbhika-marigold.mp4",
    isLegacy: true,
  },
  {
    id: 8,
    name: "Summercool Big-B",
    category: "3D Product Visualization",
    bg: "linear-gradient(160deg, #1a100a 0%, #100804 40%, #080706 100%)",
    preview: "/all-work/3d-product-visualization/summercool-big-b.mp4",
    isLegacy: true,
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

// Universal Card Component forcing exact identical landscape ratio for ALL cards
const UniversalCard = ({ project, onClick }: { project: any, onClick?: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "200px 0px" });

  return (
    <motion.div
      ref={ref}
      key={project.id}
      variants={itemVariants}
      onClick={onClick}
      // Fixed aspect ratio (landscape) to guarantee consistent sizing exactly as requested
      // LOCKED DIMENSIONS: Do not change aspect-video md:aspect-[16/9] or spacing across desktop/tablet/mobile per client request
      className="group relative w-full aspect-video md:aspect-[16/9] rounded-xl overflow-hidden cursor-pointer"
    >
      <div className="absolute inset-0 w-full h-full" style={{ background: project.bg || "linear-gradient(160deg, #1a100a 0%, #100804 40%, #050505 100%)" }}>
        {project.preview && project.preview.endsWith('.mp4') ? (
          isInView && (
            <video
              src={project.preview}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-50 group-hover:opacity-80 transition-opacity duration-700 ease-[0.16,1,0.3,1]"
            />
          )
        ) : (
          project.preview && (
            <img
              src={project.preview}
              alt={project.name}
              className="absolute inset-0 w-full h-full object-cover object-center opacity-50 group-hover:opacity-80 transition-opacity duration-700 ease-[0.16,1,0.3,1]"
            />
          )
        )}
        <div className="absolute inset-0 bg-transparent group-hover:scale-105 transition-transform duration-1000 ease-[0.16,1,0.3,1] z-0 pointer-events-none" />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10 transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-105">
        <h3 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-2 text-center drop-shadow-2xl">
          {project.name}
        </h3>
        <p className="text-xs md:text-sm text-white/60 tracking-[0.2em] uppercase font-semibold text-center opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-500 ease-[0.16,1,0.3,1]">
          {project.category}
        </p>
      </div>
      
      <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 rounded-xl transition-colors duration-700 ease-[0.16,1,0.3,1] pointer-events-none z-20"></div>
    </motion.div>
  );
};


export default function WorksPage() {
  const [activeLegacyId, setActiveLegacyId] = useState<number | null>(null);
  const [activeDynamicProject, setActiveDynamicProject] = useState<any | null>(null);

  // Smooth scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Strict category order
  const categoryOrder = ["Campaigns", "Brand Films", "3D Product Visualization"];

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

      {categoryOrder.map((categoryName) => {
        // Find legacy and dynamic projects matching this category
        const legacyMatches = legacyProjects.filter(p => p.category === categoryName);
        const dynamicMatches = dynamicData.categories.find(c => c.name === categoryName)?.projects || [];
        const combinedProjects = [...legacyMatches, ...dynamicMatches];

        if (combinedProjects.length === 0) return null;

        return (
          <div key={categoryName} className="max-w-[1600px] mx-auto mb-24 lg:mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-10 lg:mb-14 flex items-center gap-6"
            >
              <h2 className="text-xl md:text-2xl font-medium tracking-widest uppercase text-white/80">
                {categoryName}
              </h2>
              <div className="flex-1 h-[1px] bg-white/10"></div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              // Identical 2-column grid for ALL cards to preserve flawless alignment and sizing
              className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10"
            >
              {combinedProjects.map((project: any) => (
                <UniversalCard
                  key={project.id}
                  project={project}
                  onClick={() => {
                    if (project.isLegacy) {
                      setActiveLegacyId(project.id);
                    } else {
                      setActiveDynamicProject(project);
                    }
                  }}
                />
              ))}
            </motion.div>
          </div>
        );
      })}

      {dynamicData.categories.length === 0 && legacyProjects.length === 0 && (
        <div className="text-center text-white/40 py-32">
          <p className="text-lg">No work found.</p>
        </div>
      )}

      {/* Dynamic Unified Modal */}
      <UnifiedProjectModal 
        isOpen={!!activeDynamicProject} 
        onClose={() => setActiveDynamicProject(null)} 
        project={activeDynamicProject} 
      />

      {/* Legacy Modals */}
      <RajAirCoolerModal isOpen={activeLegacyId === 4} onClose={() => setActiveLegacyId(null)} />
      <GopalSnacksModal isOpen={activeLegacyId === 1} onClose={() => setActiveLegacyId(null)} />
      <MahalaxmiMasalaModal isOpen={activeLegacyId === 2} onClose={() => setActiveLegacyId(null)} />
      <DtcStillWatersModal isOpen={activeLegacyId === 5} onClose={() => setActiveLegacyId(null)} />
      <DaburLalTailModal isOpen={activeLegacyId === 6} onClose={() => setActiveLegacyId(null)} />
      <SurbhikaMarigoldModal isOpen={activeLegacyId === 7} onClose={() => setActiveLegacyId(null)} />
      <SummercoolBigBModal isOpen={activeLegacyId === 8} onClose={() => setActiveLegacyId(null)} />
    </div>
  );
}
