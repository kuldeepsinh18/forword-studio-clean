"use client";

import { motion, cubicBezier } from "framer-motion";

export function ShowreelSection() {
  return (
    <section className="w-full bg-[#050505] py-[60px] lg:py-[100px] overflow-hidden flex justify-center">
      <motion.div 
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
          preload="auto"
          className="w-full h-auto block"
          style={{ 
            imageRendering: "crisp-edges", 
            transform: "translateZ(0)",
            willChange: "transform"
          }}
        >
          <source src="/Video/showreel.mp4" type="video/mp4" />
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
