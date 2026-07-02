"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface CampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const modalVariants: Variants = {
  hidden: { opacity: 0, y: "100%" },
  visible: { 
    opacity: 1, 
    y: "0%",
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // Custom smooth ease out
    }
  },
  exit: { 
    opacity: 0, 
    y: "100%",
    transition: {
      duration: 0.6,
      ease: [0.7, 0, 0.84, 0], // Smooth ease in
    }
  }
};

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    }
  }
};

export function CampaignModal({ isOpen, onClose }: CampaignModalProps) {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          
          {/* Overlay */}
          <motion.div 
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full h-full bg-[#050505] overflow-y-auto overflow-x-hidden flex flex-col"
          >
            {/* Close Button */}
            <div className="absolute top-6 right-6 lg:top-12 lg:right-12 z-50 mix-blend-difference">
              <button 
                onClick={onClose}
                className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-all duration-300 backdrop-blur-md"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="w-full max-w-[1400px] mx-auto px-5 lg:px-12 pt-[120px] lg:pt-[160px] pb-24 flex flex-col items-center"
            >
              
              {/* Section 1: Header */}
              <motion.div variants={itemVariants} className="w-full text-center mb-16 lg:mb-24">
                <h2 className="text-[48px] md:text-[80px] lg:text-[120px] font-bold tracking-tight text-white leading-none mb-4 lg:mb-6">
                  LEDVANCE
                </h2>
                <p className="text-[14px] lg:text-[18px] text-white/50 tracking-[0.2em] uppercase font-medium">
                  Social Media Campaign
                </p>
              </motion.div>

              {/* Section 2: Hero Post */}
              <motion.div variants={itemVariants} className="w-full mb-12 lg:mb-20">
                <div className="relative w-full aspect-[4/5] md:aspect-[16/9] lg:aspect-[2/1] bg-white/5 rounded-xl overflow-hidden group">
                  <img 
                    src="/campaigns/ledvance/post-01.jpg" 
                    alt="LEDVANCE Hero Post" 
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03]"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100%25" height="100%25" viewBox="0 0 800 400"%3E%3Crect width="800" height="400" fill="%23111"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23555" font-family="sans-serif" font-size="24"%3EUpload post-01.jpg to public/campaigns/ledvance/%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>
              </motion.div>

              {/* Section 3: Posts 2 & 3 */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-8 lg:mb-12">
                {[2, 3].map((num) => (
                  <motion.div key={num} variants={itemVariants} className="w-full aspect-square bg-white/5 rounded-xl overflow-hidden group">
                    <img 
                      src={`/campaigns/ledvance/post-0${num}.jpg`} 
                      alt={`LEDVANCE Post 0${num}`} 
                      className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03]"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100%25" height="100%25" viewBox="0 0 400 400"%3E%3Crect width="400" height="400" fill="%23111"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23555" font-family="sans-serif" font-size="16"%3Epost-0${num}.jpg%3C/text%3E%3C/svg%3E`;
                      }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Section 4: Posts 4 & 5 */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-8 lg:mb-12">
                {[4, 5].map((num) => (
                  <motion.div key={num} variants={itemVariants} className="w-full aspect-[4/5] bg-white/5 rounded-xl overflow-hidden group">
                    <img 
                      src={`/campaigns/ledvance/post-0${num}.jpg`} 
                      alt={`LEDVANCE Post 0${num}`} 
                      className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03]"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100%25" height="100%25" viewBox="0 0 400 500"%3E%3Crect width="400" height="500" fill="%23111"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23555" font-family="sans-serif" font-size="16"%3Epost-0${num}.jpg%3C/text%3E%3C/svg%3E`;
                      }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Section 5: Posts 6 & 7 */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16 lg:mb-32">
                {[6, 7].map((num) => (
                  <motion.div key={num} variants={itemVariants} className="w-full aspect-square bg-white/5 rounded-xl overflow-hidden group">
                    <img 
                      src={`/campaigns/ledvance/post-0${num}.jpg`} 
                      alt={`LEDVANCE Post 0${num}`} 
                      className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03]"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100%25" height="100%25" viewBox="0 0 400 400"%3E%3Crect width="400" height="400" fill="%23111"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23555" font-family="sans-serif" font-size="16"%3Epost-0${num}.jpg%3C/text%3E%3C/svg%3E`;
                      }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Section 6: Full Width Video */}
              <motion.div variants={itemVariants} className="w-full">
                <div className="relative w-full aspect-[16/9] bg-white/5 rounded-xl overflow-hidden">
                  <video 
                    src="/campaigns/ledvance/video.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  {/* Fallback text if video is missing */}
                  <div className="absolute inset-0 flex items-center justify-center -z-10 bg-[#111]">
                     <span className="text-[#555] font-sans">Upload video.mp4 to public/campaigns/ledvance/</span>
                  </div>
                </div>
              </motion.div>

            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
