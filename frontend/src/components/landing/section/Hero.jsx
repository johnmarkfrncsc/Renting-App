const Hero = () => {
  return (
    <div className="relative text-center px-6 pt-20 pb-16 max-w-full mx-auto">
      {/* gradient background  */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 60% 40% at 20% 60%, color-mix(in oklch, var(--color-primary) 7%, transparent), transparent),
              radial-gradient(ellipse 50% 35% at 80% 30%, color-mix(in oklch, var(--color-primary) 4%, transparent), transparent)
            `,
          }}
        />
      </div>
      {/* Headline */}
      <h1 className="fade-up d2 font-serif text-[clamp(2rem,5vw,3.1rem)] leading-[1.15] tracking-tight mb-5">
        Find a place that feels like
        <br />
        <em className="text-primary not-italic font-serif">home</em>
      </h1>

      {/* Subtext */}
      <p className="fade-up d3 text-[15.5px] font-light text-base-content/55 max-w-[420px] mx-auto mb-9">
        Discover apartments, condos, and houses for rent — with transparent
        pricing and no hidden fees.
      </p>

      {/* Search bar */}
      <div className="fade-up d4 flex items-center gap-2 bg-base-100 border border-base-300 rounded-xl px-3.5 py-1.5 max-w-[520px] mx-auto mb-14 shadow-sm">
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
          placeholder="Search by city, barangay, or property name…"
          className="flex-1 bg-transparent border-none outline-none text-[13.5px] font-light text-base-content placeholder:text-base-content/28"
        />
        <button className="px-4 py-[7px] rounded-lg text-[13.5px] font-medium bg-primary text-primary-content hover:opacity-85 transition-all whitespace-nowrap">
          Search
        </button>
      </div>

      {/* Stats */}
      <div className="fade-up d5 flex items-center justify-center gap-10 flex-wrap">
        <div>
          <div className="font-serif text-2xl">4,200+</div>
          <div className="text-[11.5px] mt-0.5 text-base-content/45">
            Active listings
          </div>
        </div>
        <div className="w-px h-8 bg-base-300" />
        <div>
          <div className="font-serif text-2xl">38 cities</div>
          <div className="text-[11.5px] mt-0.5 text-base-content/45">
            Across the Philippines
          </div>
        </div>
        <div className="w-px h-8 bg-base-300" />
        <div>
          <div className="font-serif text-2xl">98%</div>
          <div className="text-[11.5px] mt-0.5 text-base-content/45">
            Verified landlords
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
