import React from "react";
import FeaturedCondo from "../../assets/images/featuredImages/FeaturedCondo.jpg";

const FeaturedSection = () => {
  return (
    <section className="px-4 py-8 md:px-8 lg:px-16 min-h-screen bg-neutral-100">
      <div className="text-center mb-6">
        <h2 className="text-black text-2xl md:text-3xl font-semibold">
          Top-rated vacation rentals in Manila
        </h2>
        <p className="text-neutral-500 text-sm md:text-base">
          Guests agree: these stays are highly rated for location, cleanliness,
          and more.
        </p>
      </div>

      <div className="flex justify-center">
        <div className="bg-amber-400 rounded-3xl overflow-hidden shadow-lg">
          <img
            src={FeaturedCondo}
            alt="Featured condo"
            className="
              w-full 
              h-56 sm:h-72 md:h-80 lg:h-112 
              object-cover 
              transition-transform 
              duration-300 
              hover:scale-105
            "
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
