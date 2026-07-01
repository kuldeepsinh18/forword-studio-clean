"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { UnifiedProjectModal } from "@/components/UnifiedProjectModal";

// Attempt to load dynamic data, fallback to empty array
let dynamicData = { categories: [] as any[] };
try {
  dynamicData = require('@/data/work-data.json');
} catch (e) {
  console.warn("No dynamic work data found. Run npm run predev to generate assets manifest.");
}

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
      <div className="absolute inset-0 w-full h-full" style={{ background: "linear-gradient(160deg, #1a100a 0%, #100804 40%, #050505 100%)" }}>
        {project.preview && project.preview.endsWith('.mp4') ? (
          <video
            src={isInView ? project.preview : ""}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-50 group-hover:opacity-80 transition-opacity duration-700 ease-[0.16,1,0.3,1]"
          />
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
        <h3 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-2 text-center drop-shadow-2xl">
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
      <div className="absolute inset-0 w-full h-full" style={{ background: "linear-gradient(160deg, #1a100a 0%, #100804 40%, #050505 100%)" }}>
        {project.preview && project.preview.endsWith('.mp4') ? (
          <video
            src={isInView ? project.preview : ""}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-50 group-hover:opacity-80 transition-opacity duration-700 ease-[0.16,1,0.3,1]"
          />
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
  const [activeProject, setActiveProject] = useState<any | null>(null);

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

      {dynamicData.categories.map((category, index) => {
        // Use portrait cards for campaigns, landscape for everything else
        const isCampaign = category.name.toLowerCase().includes('campaign');
        const CardComponent = isCampaign ? ProjectCard : BrandFilmCard;
        const gridClass = isCampaign
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10"
          : "grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10";

        return (
          <div key={category.id} className="max-w-[1600px] mx-auto mb-24 lg:mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-10 lg:mb-14 flex items-center gap-6"
            >
              <h2 className="text-xl md:text-2xl font-medium tracking-widest uppercase text-white/80">
                {category.name}
              </h2>
              <div className="flex-1 h-[1px] bg-white/10"></div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className={gridClass}
            >
              {category.projects.map((project: any) => (
                <CardComponent
                  key={project.id}
                  project={project}
                  onClick={() => setActiveProject(project)}
                />
              ))}
            </motion.div>
          </div>
        );
      })}

      {dynamicData.categories.length === 0 && (
        <div className="text-center text-white/40 py-32">
          <p className="text-lg">No dynamic work found.</p>
          <p className="text-sm mt-2">Add folders to <code className="bg-white/10 px-2 py-1 rounded">public/all-work/</code> and run build.</p>
        </div>
      )}

      <UnifiedProjectModal 
        isOpen={!!activeProject} 
        onClose={() => setActiveProject(null)} 
        project={activeProject} 
      />
    </div>
  );
}
