"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Works", href: "/works" },
  { label: "Services", href: "/#services" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      animate={{
        opacity: 1,
        background: isScrolled ? "rgba(5, 5, 5, 0.8)" : "rgba(5, 5, 5, 0)",
        backdropFilter: isScrolled ? "blur(12px)" : "blur(0px)",
      }}
      initial={{ opacity: 0, background: "rgba(5, 5, 5, 0)", backdropFilter: "blur(0px)" }}
      className="fixed top-0 left-0 right-0 z-[100] flex items-start justify-between pt-4 pb-4 px-5 lg:px-[4.5rem]"
      transition={{ duration: 1 }}
    >
      {/* ── Logo (Left) ── */}
      <Link
        href="/"
        aria-label="Forward Studio Home"
        className="text-[20px] lg:text-[24px] font-medium tracking-[-0.04em] text-white no-underline leading-none"
      >
        Forward Studio
      </Link>

      {/* ── Nav Links (Center) ── */}
      <nav
        aria-label="Main navigation"
        className="nav-center-links absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-4 top-[22px]"
      >
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-[13px] font-normal text-white no-underline"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* ── Right: Contact ── */}
      <div className="pt-1">
        <Link
          href="/#contact"
          className="text-[13px] font-normal text-white no-underline"
        >
          Contact
        </Link>
      </div>
    </motion.header>
  );
}
