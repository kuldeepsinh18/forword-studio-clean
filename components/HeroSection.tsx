export function HeroSection() {
  return (
    <section
      id="home"
      className="relative h-[60vh] bg-[#050505] flex flex-col"
    >
      {/* Top 65% empty space */}
      <div className="h-[65%] w-full" />

      {/* Bottom 35% headline area */}
      <div className="h-[35%] w-full flex items-end px-5 lg:px-[4.5rem] pb-6 lg:pb-[25px]">
        <div className="max-w-[1600px] w-full mx-auto flex justify-between items-end">
          <h1 className="m-0 text-white text-[32px] md:text-[5vw] lg:text-[68px] font-medium tracking-[-0.04em] leading-[0.95] max-w-[800px]">
            Forward Creative Studio
          </h1>
          
          {/* Scroll Down */}
          <div className="hidden md:block text-white text-[11px] font-medium tracking-[0.05em]">
            SCROLL DOWN
          </div>
        </div>
      </div>
    </section>
  );
}
