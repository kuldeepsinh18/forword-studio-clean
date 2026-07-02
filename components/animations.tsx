"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef, ReactNode, useState, useEffect } from "react";

// ─── Shared Easing Curves ────────────────────────────────────────
export const EASE_PREMIUM = [0.76, 0, 0.24, 1] as const;
export const EASE_OUT_EXPO = [0.19, 1, 0.22, 1] as const;
export const EASE_IN_OUT_QUART = [0.77, 0, 0.175, 1] as const;

// ─── Custom Hook for Mobile Detection ────────────────────────────
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return isMobile;
}

// ─── Shared Variants ─────────────────────────────────────────────

export const fadeUp: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease: EASE_PREMIUM },
  },
};

export const slideUp: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 0.85, ease: EASE_OUT_EXPO },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.02,
    },
  },
};

// ─── Reusable AnimateIn Wrapper ───────────────────────────────────

interface AnimateInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  once?: boolean;
  threshold?: number;
}

export function AnimateIn({
  children,
  className,
  delay = 0,
  duration = 0.8,
  direction = "up",
  distance = 40,
  once = true,
  threshold = 0.1,
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-5% 0px" });
  const isMobile = useIsMobile();
  
  // Reduce motion distance and duration on mobile
  const activeDistance = isMobile ? distance / 2 : distance;
  const activeDuration = isMobile ? duration * 0.75 : duration;

  const getInitial = () => {
    switch (direction) {
      case "up": return { y: activeDistance, opacity: 0 };
      case "down": return { y: -activeDistance, opacity: 0 };
      case "left": return { x: activeDistance, opacity: 0 };
      case "right": return { x: -activeDistance, opacity: 0 };
      case "none": return { opacity: 0 };
      default: return { y: activeDistance, opacity: 0 };
    }
  };

  const getAnimate = () => {
    switch (direction) {
      case "up":
      case "down": return { y: 0, opacity: 1 };
      case "left":
      case "right": return { x: 0, opacity: 1 };
      case "none": return { opacity: 1 };
      default: return { y: 0, opacity: 1 };
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getInitial()}
      animate={inView ? getAnimate() : getInitial()}
      transition={{
        duration: activeDuration,
        delay,
        ease: EASE_OUT_EXPO,
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── Text Reveal (character-by-character) ────────────────────────

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export function TextReveal({
  text,
  className,
  delay = 0,
  stagger = 0.025,
  tag: Tag = "span",
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  const isMobile = useIsMobile();

  const words = text.split(" ");
  // Faster stagger on mobile
  const activeStagger = isMobile ? stagger * 0.5 : stagger;
  const activeDuration = isMobile ? 0.5 : 0.75;
  const initialY = isMobile ? "50%" : "110%";

  return (
    <div ref={ref} className={className} aria-label={text}>
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          style={{ display: "inline-block", overflow: "hidden", marginRight: "0.25em" }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: initialY, opacity: isMobile ? 0 : 1 }}
            animate={inView ? { y: "0%", opacity: 1 } : { y: initialY, opacity: isMobile ? 0 : 1 }}
            transition={{
              duration: activeDuration,
              delay: delay + wordIndex * activeStagger,
              ease: EASE_OUT_EXPO,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

// ─── Line Reveal (whole line) ─────────────────────────────────────

interface LineRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function LineReveal({ children, delay = 0, className }: LineRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  const isMobile = useIsMobile();

  const activeDuration = isMobile ? 0.6 : 0.85;
  const initialY = isMobile ? "50%" : "110%";

  return (
    <div ref={ref} style={{ overflow: "hidden" }} className={className}>
      <motion.div
        initial={{ y: initialY, opacity: isMobile ? 0 : 1 }}
        animate={inView ? { y: "0%", opacity: 1 } : { y: initialY, opacity: isMobile ? 0 : 1 }}
        transition={{
          duration: activeDuration,
          delay,
          ease: EASE_OUT_EXPO,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
