export function HeroSection() {
  return (
    <section
      id="home"
      className="relative h-[60vh] bg-[#050505] flex flex-col"
    >
      {/* Top 65% empty space */}
      <div className="h-[65%]" />

      {/* Bottom 35% headline area */}
      <div className="h-[35%] flex items-end px-5 lg:px-[4.5rem] pb-6 lg:pb-[25px]">
        <h1 className="m-0 text-white text-[32px] md:text-[5vw] lg:text-[68px] font-medium tracking-[-0.04em] leading-[0.95] max-w-[800px]">
          Forward Creative Studio
        </h1>
      </div>

      {/* Scroll Down */}
      <div className="absolute right-5 lg:right-[4.5rem] bottom-6 lg:bottom-[25px] text-white text-[11px] font-medium tracking-[0.05em]">
        SCROLL DOWN
      </div>
    </section>
  );
}
