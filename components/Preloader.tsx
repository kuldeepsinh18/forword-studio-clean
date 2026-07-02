"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Prevent scroll during preloader
    document.documentElement.style.overflow = "hidden";

    let currentProgress = 0;
    // Speed up interval to reduce blocking wait time
    const interval = 16; // ~60fps
    const increment = 100 / (800 / interval); // Faster initial load (0.8s)
    let timer: NodeJS.Timeout;

    const updateProgress = () => {
      currentProgress += increment;
      
      // If page is fully loaded, allow jumping to 100
      if (document.readyState === "complete" && currentProgress > 60) {
        currentProgress = 100;
      } else if (currentProgress > 99) {
        currentProgress = 99; // Hold at 99% until loaded
      }

      setProgress(Math.min(Math.round(currentProgress), 100));

      if (currentProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            setIsVisible(false);
            document.documentElement.style.overflow = "";
            initBackgroundPreloader(); // Start smart background preloading
          }, 900);
        }, 300);
      }
    };

    timer = setInterval(updateProgress, interval);

    // Ensure it eventually closes even if something hangs (fallback safety 5s)
    const fallback = setTimeout(() => {
      if (currentProgress < 100) {
        currentProgress = 100;
      }
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(fallback);
      document.documentElement.style.overflow = "";
    };
  }, []);

  const logoLetters = ["F", "O", "R", "W", "A", "R", "D"];
  const logo2Letters = ["S", "T", "U", "D", "I", "O"];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.9,
            ease: cubicBezier(0.76, 0, 0.24, 1),
            delay: isExiting ? 0 : 0,
          }}
        >
          {/* Logo Text */}
          <div className="preloader__logo">
            <div style={{ display: "flex" }}>
              {logoLetters.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.1 + i * 0.04,
                    ease: cubicBezier(0.19, 1, 0.22, 1),
                  }}
                  style={{ display: "inline-block", overflow: "hidden" }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.45, ease: cubicBezier(0.19, 1, 0.22, 1) }}
            >
              <span className="nav__logo-dot" style={{ display: "inline-block" }} />
            </motion.span>
            <div style={{ display: "flex" }}>
              {logo2Letters.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.2 + i * 0.04,
                    ease: cubicBezier(0.19, 1, 0.22, 1),
                  }}
                  style={{ display: "inline-block" }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <motion.div
            className="preloader__progress-bar"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease: cubicBezier(0.19, 1, 0.22, 1) }}
            style={{ transformOrigin: "left" }}
          >
            <motion.div
              className="preloader__progress-fill"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </motion.div>

          {/* Counter */}
          <motion.span
            className="preloader__counter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            {String(progress).padStart(3, "0")}
          </motion.span>

          {/* Exit curtain sweep */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isExiting ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.8, ease: cubicBezier(0.76, 0, 0.24, 1) }}
            style={{
              position: "absolute",
              inset: 0,
              background: "#050505",
              transformOrigin: "top",
              zIndex: 1,
            }}
          />

          {/* Invisible Metadata Cache for Videos - handled by background preloader */}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Helper to gracefully preload assets without blocking main thread
function initBackgroundPreloader() {
  if (typeof window === 'undefined') return;
  
  const preloadAssets = () => {
    const assets = [
      "/selected-work/DTC Still Waters/VIDEO.mp4",
      "/selected-work/DTC Still Waters/preview.mp4",
      "/selected-work/dabur lal tail/dabur lal tail.mp4",
      "/selected-work/dabur lal tail/preview.mp4",
      "/selected-work/gopal-snacks/post-01.png",
      "/selected-work/gopal-snacks/post-02.png",
      "/selected-work/gopal-snacks/post-03.png",
      "/selected-work/gopal-snacks/post-04.png",
      "/selected-work/gopal-snacks/post-05.png",
      "/selected-work/gopal-snacks/post-06.png",
      "/selected-work/gopal-snacks/reel-01.mp4",
      "/selected-work/gopal-snacks/reel-02.mp4",
      "/selected-work/Mahalaxmi-masala/post-01.png",
      "/selected-work/Mahalaxmi-masala/post-02.png",
      "/selected-work/Mahalaxmi-masala/post-03.png",
      "/selected-work/Mahalaxmi-masala/post-04.png",
      "/selected-work/Mahalaxmi-masala/post-05.png",
      "/selected-work/Mahalaxmi-masala/post-06.png",
      "/selected-work/Mahalaxmi-masala/reel-01.mp4",
      "/selected-work/Mahalaxmi-masala/reel-02.mp4",
      "/selected-work/raj-air-cooler/post-01.png",
      "/selected-work/raj-air-cooler/post-02.png",
      "/selected-work/raj-air-cooler/post-03.png",
      "/selected-work/raj-air-cooler/post-04.png",
      "/selected-work/raj-air-cooler/post-05.png",
      "/selected-work/raj-air-cooler/post-06.png",
      "/selected-work/raj-air-cooler/reel-01.mp4",
      "/selected-work/raj-air-cooler/reel-02.mp4",
      "/all-work/3d-product-visualization/summercool-big-b.mp4",
      "/all-work/3d-product-visualization/surbhika-marigold.mp4"
    ];

    let i = 0;
    const preloadNext = () => {
      if (i >= assets.length) return;
      const url = assets[i];
      i++;
      
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = url;
      if (url.endsWith('.mp4')) {
        link.as = 'video';
      } else {
        link.as = 'image';
      }
      document.head.appendChild(link);
      
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(preloadNext);
      } else {
        setTimeout(preloadNext, 50);
      }
    };
    
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(preloadNext);
    } else {
      setTimeout(preloadNext, 500);
    }
  };

  // Give homepage priority, wait a little before starting heavy preloads
  setTimeout(preloadAssets, 2000);
}
