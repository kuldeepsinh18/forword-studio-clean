"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface Project {
  id: string;
  name: string;
  category: string;
  media: string[];
}

interface UnifiedProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
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
      delay: i * 0.04,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    }
  })
};

export function UnifiedProjectModal({ isOpen, onClose, project }: UnifiedProjectModalProps) {
  const [selectedMedia, setSelectedMedia] = useState<{ url: string; isVideo: boolean } | null>(null);
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

  if (!project) return null;

  const isSingleAsset = project.media.length === 1;

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
              
              {/* Header */}
              <motion.div
                variants={itemVariants}
                custom={0}
                initial="hidden"
                animate="visible"
                className="w-full text-center mb-12 md:mb-16 lg:mb-24"
              >
                <h2 className="text-[40px] md:text-[80px] lg:text-[120px] font-bold tracking-tight text-white leading-none mb-3 md:mb-4 lg:mb-6 drop-shadow-2xl">
                  {project.name}
                </h2>
                <p className="text-[12px] md:text-[14px] lg:text-[18px] text-white/70 tracking-[0.2em] uppercase font-medium">
                  {project.category}
                </p>
              </motion.div>

              {isSingleAsset ? (
                /* Cinematic Video Container (Brand Films) */
                <div className="w-full flex justify-center mb-8 lg:mb-16">
                  <motion.div
                    custom={1}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                    onClick={() => setSelectedMedia({ url: project.media[0], isVideo: project.media[0].endsWith('.mp4') })}
                    className="w-[90vw] h-[85vh] lg:h-[90vh] max-w-[1800px] bg-black rounded-2xl overflow-hidden relative shadow-[0_30px_80px_rgba(0,0,0,0.8)] z-10 cursor-pointer"
                  >
                    <div className="relative w-full h-full overflow-hidden rounded-2xl flex items-center justify-center">
                      {project.media[0].endsWith('.mp4') ? (
                        <video
                          src={project.media[0]}
                          autoPlay
                          muted
                          controls
                          playsInline
                          preload="metadata"
                          className="absolute inset-0 w-full h-full object-cover object-center"
                        />
                      ) : (
                        <img 
                          src={project.media[0]} 
                          alt={project.name} 
                          className="absolute inset-0 w-full h-full object-cover object-center"
                        />
                      )}
                    </div>
                    <div className="absolute inset-0 pointer-events-none rounded-2xl shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]"></div>
                  </motion.div>
                </div>
              ) : (
                /* Multiple Assets Grid Container (Campaigns/3D) */
                <div className={`w-full grid ${project.media.every(m => m.endsWith('.mp4')) ? "grid-cols-1 md:grid-cols-2" : "grid-cols-2 lg:grid-cols-4"} gap-4 md:gap-8 lg:gap-10 mb-16 lg:mb-32`}>
                  {project.media.map((url, index) => {
                    const isVideo = url.endsWith('.mp4');
                    // Check if all media are videos to determine aspect ratio
                    const allVideos = project.media.every(m => m.endsWith('.mp4'));
                    const aspectRatioClass = allVideos ? "aspect-video md:aspect-[21/9]" : "aspect-[4/5]";
                    
                    return (
                      <motion.div
                        key={url}
                        custom={index + 1}
                        variants={itemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                        onClick={() => setSelectedMedia({ url, isVideo })}
                        className={`w-full ${aspectRatioClass} bg-transparent rounded-xl overflow-hidden relative transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-3 hover:scale-[1.03] hover:shadow-[0_30px_60px_rgba(0,0,0,0.6)] z-10 hover:z-20 cursor-pointer`}
                      >
                        {isVideo ? (
                          <>
                              <video
                                src={url}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover pointer-events-none"
                              />
                            <div className="absolute inset-0 pointer-events-none rounded-xl shadow-[inset_0_0_30px_rgba(0,0,0,0.3)]"></div>
                          </>
                        ) : (
                          <img
                            src={url}
                            alt={`${project.name} asset ${index + 1}`}
                            className="w-full h-full object-cover"
                            loading={index < 4 ? undefined : "lazy"}
                            // @ts-ignore
                            fetchPriority={index < 4 ? "high" : "auto"}
                            decoding={index < 4 ? "sync" : "async"}
                          />
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>

          {/* Inline Media Preview Overlay */}
          <AnimatePresence>
            {selectedMedia && (
              <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedMedia(null)}
                  className="absolute inset-0 bg-black/95 backdrop-blur-xl cursor-pointer"
                />
                
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedMedia(null)}
                  className="absolute top-4 right-4 md:top-8 md:right-8 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </motion.button>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative z-10 w-full max-w-[90vw] md:max-w-[80vw] h-[80vh] flex items-center justify-center"
                >
                  {selectedMedia.isVideo ? (
                    <video 
                      src={selectedMedia.url} 
                      autoPlay 
                      controls 
                      className="max-w-full max-h-full rounded-xl object-contain outline-none" 
                    />
                  ) : (
                    <img 
                      src={selectedMedia.url} 
                      alt="Preview" 
                      className="max-w-full max-h-full rounded-xl object-contain" 
                    />
                  )}
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
}
