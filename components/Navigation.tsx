"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Works", href: "/works" },
  { label: "Services", href: "/#services" },
];

export function Navigation() {
  const { scrollY } = useScroll();
  const background = useTransform(
    scrollY,
    [0, 50],
    ["rgba(5, 5, 5, 0)", "rgba(5, 5, 5, 0.8)"]
  );
  const backdropFilter = useTransform(
    scrollY,
    [0, 50],
    ["blur(0px)", "blur(12px)"]
  );

  return (
    <motion.header
      style={{ background, backdropFilter }}
      className="fixed top-0 left-0 right-0 z-[100] flex items-start justify-between pt-4 pb-4 px-5 lg:px-[4.5rem]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
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
