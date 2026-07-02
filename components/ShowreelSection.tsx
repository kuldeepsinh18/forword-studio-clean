"use client";

import { motion, cubicBezier, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export function ShowreelSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "400px" });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="w-full bg-[#050505] pt-2 pb-[60px] lg:pt-3 lg:pb-[100px] overflow-hidden flex justify-center">
      <motion.div 
        ref={containerRef}
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.6, ease: cubicBezier(0.76, 0, 0.24, 1) }}
        className="w-full max-w-[1920px] relative leading-none"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload={isMobile ? "none" : "metadata"}
          className="w-full h-auto block"
          style={{ 
            imageRendering: "crisp-edges", 
            transform: "translateZ(0)",
            willChange: "transform"
          }}
        >
          {isInView && <source src="/Video/showreel.mp4" type="video/mp4" />}
        </video>

        {/* Minimal centered text over the video exactly like Daima */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              color: "#FFFFFF",
              fontSize: "clamp(24px, 4vw, 48px)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            Forward Studio
          </span>
        </div>
      </motion.div>
    </section>
  );
}
