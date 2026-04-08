const Hero = () => {
  return (
    <div className="relative w-full">
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 60% 40% at 20% 60%, color-mix(in oklch, var(--color-primary) 7%, transparent), transparent),
            radial-gradient(ellipse 50% 35% at 80% 30%, color-mix(in oklch, var(--color-primary) 4%, transparent), transparent)
          `,
        }}
      />

      <div className="relative text-center px-5 pt-12 pb-10 md:pt-20 md:pb-16 max-w-2xl mx-auto">
        <h1 className="fade-up d2 font-serif text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight mb-4 md:mb-5">
          Find a place that feels like{" "}
          <em className="text-primary not-italic font-serif">home</em>
        </h1>

        <p className="fade-up d3 text-sm md:text-base font-light text-base-content/60 max-w-sm mx-auto mb-7 md:mb-9">
          Discover apartments, condos, and houses for rent with transparent
          pricing and no hidden fees.
        </p>

        <div className="fade-up d5 flex items-center justify-center gap-5 md:gap-10 flex-wrap">
          <div>
            <div className="font-serif text-xl md:text-2xl">120+</div>
            <div className="text-xs mt-0.5 text-base-content/45">
              Available listings
            </div>
          </div>

          <div className="w-px h-7 md:h-8 bg-base-300" />

          <div>
            <div className="font-serif text-xl md:text-2xl">12 cities</div>
            <div className="text-xs mt-0.5 text-base-content/45">
              Metro Manila & nearby areas
            </div>
          </div>

          <div className="w-px h-7 md:h-8 bg-base-300" />

          <div>
            <div className="font-serif text-xl md:text-2xl">90%</div>
            <div className="text-xs mt-0.5 text-base-content/45">
              Verified property owners
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
