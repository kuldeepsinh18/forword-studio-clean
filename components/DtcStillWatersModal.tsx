"use client";

import { useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface CampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    }
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    }
  }
};

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.6 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.04, // Fast, premium ripple
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1], // Premium easing
    }
  })
};

export function DtcStillWatersModal({ isOpen, onClose }: CampaignModalProps) {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center">

          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="absolute inset-0 bg-[rgba(0,0,0,0.95)] backdrop-blur-[20px] cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full h-full bg-transparent overflow-y-auto overflow-x-hidden overscroll-none flex flex-col"
          >
            {/* Close Button */}
            <div className="absolute top-4 right-4 md:top-6 md:right-6 lg:top-12 lg:right-12 z-50 mix-blend-difference">
              <button
                onClick={onClose}
                className="group flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-all duration-500 backdrop-blur-md"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="w-[92vw] max-w-[1700px] mx-auto px-2 md:px-4 lg:px-6 pt-[100px] md:pt-[120px] lg:pt-[160px] pb-24 flex flex-col items-center">

              {/* Section 1: Header */}
              <motion.div
                variants={itemVariants}
                custom={0}
                initial="hidden"
                animate="visible"
                className="w-full text-center mb-12 md:mb-16 lg:mb-24"
              >
                <h2 className="text-[40px] md:text-[80px] lg:text-[120px] font-bold tracking-tight text-white leading-none mb-3 md:mb-4 lg:mb-6 drop-shadow-2xl">
                  DTC Still Waters
                </h2>
                <p className="text-[12px] md:text-[14px] lg:text-[18px] text-white/70 tracking-[0.2em] uppercase font-medium">
                  Brand Film
                </p>
              </motion.div>

              {/* Cinematic Video Container */}
              <div className="w-full flex justify-center mb-8 lg:mb-16">
                <motion.div
                  custom={1}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  className="w-[90vw] h-[85vh] lg:h-[90vh] max-w-[1800px] bg-black rounded-2xl overflow-hidden relative shadow-[0_30px_80px_rgba(0,0,0,0.8)] z-10"
                >
                  {/* Media Wrapper */}
                  <div className="relative w-full h-full overflow-hidden rounded-2xl">
                    <video
                      src="/selected-work/DTC Still Waters/VIDEO.mp4"
                      autoPlay
                      muted
                      controls
                      playsInline
                      preload="metadata"
                      className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                  </div>
                  {/* Subtle vignette/gradient overlay for premium cinematic feel */}
                  <div className="absolute inset-0 pointer-events-none rounded-2xl shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]"></div>
                </motion.div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
