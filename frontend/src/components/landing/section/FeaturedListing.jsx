import { useState } from "react";
import PropertyCard from "../feature/PropertyCard.jsx";
import featureListingData from "../data/featureListingData.js";

const filters = [
  "All",
  "Studio",
  "1 Bedroom",
  "2 Bedrooms",
  "House",
  "Pet-friendly",
];

const FeaturedListings = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-6 pb-16">
      <div className="flex items-baseline justify-between mb-5">
        <h2 className="font-serif text-xl md:text-2xl tracking-tight">
          Featured listings
        </h2>
        <a
          href="#"
          className="text-sm font-medium text-primary hover:underline"
        >
          See all →
        </a>
      </div>

      {/*filter pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-6">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-150 cursor-pointer
              ${
                activeFilter === filter
                  ? "bg-primary text-primary-content border-primary"
                  : "bg-base-200 text-base-content/55 border-base-300 hover:bg-base-300"
              }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap -mx-2">
        {featureListingData.map((listing) => (
          <div key={listing.id} className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4">
            <PropertyCard {...listing} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedListings;
