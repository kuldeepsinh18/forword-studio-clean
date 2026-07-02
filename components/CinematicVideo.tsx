"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";

interface CinematicVideoProps {
  src: string;
  custom?: number;
  variants?: Variants;
}

export function CinematicVideo({ src, custom, variants }: CinematicVideoProps) {
  const [aspectRatio, setAspectRatio] = useState<"16/9" | "9/16" | null>(null);

  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.videoWidth > video.videoHeight) {
      setAspectRatio("16/9");
    } else {
      setAspectRatio("9/16");
    }
  };

  // On mobile: use detected aspect ratio (or default h-[85vh] while loading)
  // On desktop: keep exactly as it was (lg:h-[90vh] lg:aspect-auto)
  const mobileAspectClass = !aspectRatio
    ? "h-[85vh]"
    : aspectRatio === "16/9"
    ? "aspect-video"
    : "aspect-[9/16]";

  return (
    <motion.div
      custom={custom}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className={`w-[90vw] max-w-[1800px] bg-black rounded-2xl overflow-hidden relative shadow-[0_30px_80px_rgba(0,0,0,0.8)] z-10 ${mobileAspectClass} lg:h-[90vh] lg:aspect-auto`}
    >
      {/* Media Wrapper */}
      <div className="relative w-full h-full overflow-hidden rounded-2xl">
        <video
          src={src}
          autoPlay
          muted
          controls
          playsInline
          preload="metadata"
          onLoadedMetadata={handleLoadedMetadata}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </div>
      {/* Subtle vignette/gradient overlay for premium cinematic feel */}
      <div className="absolute inset-0 pointer-events-none rounded-2xl shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]"></div>
    </motion.div>
  );
}
