"use client";

import { useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

export interface MediaPreview {
  url: string;
  type: "image" | "video";
}

interface MediaPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  media: MediaPreview | null;
}

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    y: 20,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    }
  }
};

export function MediaPreviewModal({ isOpen, onClose, media }: MediaPreviewModalProps) {
  // Prevent scrolling when preview is open
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scrolling only if no other modals are open
      // Since this sits on top of CampaignModal, CampaignModal will handle its own overflow
    }
  }, [isOpen]);

  if (!media) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8">
          {/* Overlay */}
          <motion.div 
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl cursor-pointer"
          />

          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute top-4 right-4 md:top-8 md:right-8 z-50 group flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-all duration-300 backdrop-blur-md"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </motion.button>

          {/* Media Container */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-10 max-w-full max-h-full flex items-center justify-center pointer-events-none"
          >
            <div className="relative w-auto h-auto max-w-[95vw] max-h-[90vh] md:max-w-[85vw] md:max-h-[85vh] rounded-xl overflow-hidden pointer-events-auto shadow-2xl">
              {media.type === 'video' ? (
                <video 
                  src={media.url}
                  autoPlay
                  controls
                  playsInline
                  className="w-full h-full max-h-[90vh] md:max-h-[85vh] object-contain rounded-xl outline-none"
                />
              ) : (
                <img 
                  src={media.url} 
                  alt="Preview" 
                  className="w-full h-full max-h-[90vh] md:max-h-[85vh] object-contain rounded-xl"
                />
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
