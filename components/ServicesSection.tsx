"use client";

import { motion, cubicBezier } from "framer-motion";

const services = [
  {
    num: "01",
    title: "Brand Strategy",
    desc: "Positioning and core messaging that define your brand.",
  },
  {
    num: "02",
    title: "Campaign Planning",
    desc: "Strategic blueprints for high-impact market presence.",
  },
  {
    num: "03",
    title: "Creative Direction",
    desc: "Guiding the visual and conceptual narrative.",
  },
  {
    num: "04",
    title: "Content Production",
    desc: "High-end visual assets, video, and editorial design.",
  },
  {
    num: "05",
    title: "Performance Marketing",
    desc: "Data-driven media buying and audience targeting.",
  },
  {
    num: "06",
    title: "Visual Identity",
    desc: "Logo, typography, and cohesive design systems.",
  },
];

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

export function ServicesSection() {
  return (
    <section id="services" className="w-full bg-[#050505] text-white py-[80px] lg:py-[140px] px-5 lg:px-[4.5rem]">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Header - Clean left-aligned stack */}
        <div className="flex flex-col items-start mb-16 lg:mb-24 gap-4 lg:gap-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
          >
            <h2 className="text-[12px] lg:text-[14px] font-medium tracking-widest uppercase text-white/40">
              Services
            </h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
          >
            <h3 className="text-[34px] md:text-[48px] lg:text-[60px] font-medium tracking-[-0.02em] leading-[1] text-white m-0">
              What We Do
            </h3>
          </motion.div>
        </div>

        {/* Services List */}
        <div className="flex flex-col w-full border-b border-white/10">
          {services.map((service, index) => (
            <motion.div
              key={service.num}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUpVariant}
              className="group border-t border-white/10 flex flex-col lg:flex-row items-start lg:items-center justify-between py-6 lg:py-10 gap-4 lg:gap-0 cursor-pointer"
            >
              {/* Number */}
              <div className="w-full lg:w-[15%] text-[13px] lg:text-[15px] text-white/40 font-medium tracking-wide">
                {service.num}
              </div>

              {/* Title */}
              <div className="w-full lg:w-[45%]">
                <h4 className="text-[20px] md:text-[26px] lg:text-[32px] font-medium tracking-normal text-white/70 group-hover:text-white transition-all duration-500 ease-out group-hover:translate-x-3">
                  {service.title}
                </h4>
              </div>

              {/* Description */}
              <div className="w-full lg:w-[40%] flex lg:justify-end">
                <p className="text-[14px] lg:text-[16px] text-white/50 group-hover:text-white/80 transition-colors duration-500 max-w-xs lg:text-right font-light leading-[1.7]">
                  {service.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
