const Hero = () => {
  return (
    <div className="relative text-center px-5 pt-12 pb-10 md:pt-20 md:pb-16 max-w-full mx-auto">
      {/*gradient*/}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 60% 40% at 20% 60%, color-mix(in oklch, var(--color-primary) 7%, transparent), transparent),
            radial-gradient(ellipse 50% 35% at 80% 30%, color-mix(in oklch, var(--color-primary) 4%, transparent), transparent)
          `,
        }}
      />

      <h1 className="fade-up d2 font-serif text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight mb-4 md:mb-5">
        Find a place that feels like{" "}
        <em className="text-primary not-italic font-serif">home</em>
      </h1>

      <p className="fade-up d3 text-sm md:text-base font-light text-base-content/55 max-w-sm mx-auto mb-7 md:mb-9">
        Discover apartments, condos, and houses for rent with transparent
        pricing and no hidden fees.
      </p>

      {/* Search bar */}
      <div className="fade-up d4 flex items-center gap-2 bg-base-100 border border-base-300 rounded-xl px-3 py-1.5 max-w-[520px] mx-auto mb-10 md:mb-14 shadow-sm">
        <svg
          width="15"
          height="15"
          viewBox="0 0 16 16"
          fill="none"
          className="text-base-content/30 shrink-0"
        >
          <circle
            cx="7"
            cy="7"
            r="4.5"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <path
            d="M10.5 10.5L13 13"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
        <input
          type="text"
          placeholder="Search by city or property…"
          className="flex-1 min-w-0 bg-transparent border-none outline-none text-[13px] md:text-[13.5px] font-light text-base-content placeholder:text-base-content/30"
        />
        <button className="shrink-0 px-3 md:px-4 py-[7px] rounded-lg text-[13px] md:text-[13.5px] font-medium bg-primary text-primary-content hover:opacity-85 transition-all whitespace-nowrap">
          Search
        </button>
      </div>

      {/* Stats */}
      <div className="fade-up d5 flex items-center justify-center gap-5 md:gap-10 flex-wrap">
        <div>
          <div className="font-serif text-xl md:text-2xl">4,200+</div>
          <div className="text-[10.5px] md:text-[11.5px] mt-0.5 text-base-content/45">
            Active listings
          </div>
        </div>
        <div className="w-px h-7 md:h-8 bg-base-300" />
        <div>
          <div className="font-serif text-xl md:text-2xl">38 cities</div>
          <div className="text-[10.5px] md:text-[11.5px] mt-0.5 text-base-content/45">
            Across the Philippines
          </div>
        </div>
        <div className="w-px h-7 md:h-8 bg-base-300" />
        <div>
          <div className="font-serif text-xl md:text-2xl">98%</div>
          <div className="text-[10.5px] md:text-[11.5px] mt-0.5 text-base-content/45">
            Verified landlords
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
