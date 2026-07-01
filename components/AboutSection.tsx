"use client";

import { motion, cubicBezier } from "framer-motion";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: cubicBezier(0.21, 0.47, 0.32, 0.98),
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function AboutSection() {
  return (
    <section id="about" className="w-full bg-[#050505] text-white py-[80px] lg:py-[140px] px-5 lg:px-[4.5rem] relative overflow-hidden">
      {/* Subtle Noise Texture */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-15% 0px" }}
        variants={staggerContainer}
        className="max-w-[1400px] mx-auto"
      >
        {/* Top Left Label */}
        <motion.div variants={fadeUpVariant} className="mb-12 lg:mb-[60px]">
          <h2 className="text-[12px] font-medium tracking-[0.05em] uppercase text-white/40 m-0">
            About
          </h2>
        </motion.div>

        {/* Main Editorial Text Block */}
        <motion.div
          variants={fadeUpVariant}
          className="w-full lg:w-[65%] mb-16 lg:mb-[100px]"
        >
          <p className="text-[24px] md:text-[32px] lg:text-[42px] font-normal leading-[1.3] tracking-[-0.01em] m-0 text-white">
            Forward Studio is a creative agency focused on building memorable
            campaigns, strategic storytelling, and high-impact visuals that help
            brands grow.
          </p>
        </motion.div>

        {/* Bottom Content - 3 Columns */}
        <motion.div
          variants={fadeUpVariant}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-10 w-full lg:w-[65%]"
        >
          {/* Column 1 */}
          <div>
            <h3 className="text-[14px] font-medium text-white mb-3 m-0">
              Strategy
            </h3>
            <p className="text-[14px] leading-[1.5] text-white/50 m-0 mt-3">
              Strong brand positioning and campaign planning.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-[14px] font-medium text-white mb-3 m-0">
              Creative
            </h3>
            <p className="text-[14px] leading-[1.5] text-white/50 m-0 mt-3">
              High-impact visuals and storytelling.
            </p>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-[14px] font-medium text-white mb-3 m-0">
              Execution
            </h3>
            <p className="text-[14px] leading-[1.5] text-white/50 m-0 mt-3">
              Precision delivery across digital platforms.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
