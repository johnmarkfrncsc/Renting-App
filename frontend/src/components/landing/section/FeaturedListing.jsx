import { useState } from "react";
import PropertyCard from "../feature/PropertyCard.jsx";

const filters = [
  "All",
  "Studio",
  "1 Bedroom",
  "2 Bedrooms",
  "House",
  "Pet-friendly",
];

const listings = [
  {
    id: 1,
    tag: "Condo",
    title: "2BR at Alveo Ventura, BGC",
    location: "Bonifacio Global City, Taguig",
    price: "₱45,000",
    status: "available",
    gradientClass: "bg-gradient-to-br from-primary/10 to-primary/30",
    icon: (
      <svg width="44" height="44" viewBox="0 0 40 40" fill="none">
        <rect
          x="6"
          y="18"
          width="28"
          height="18"
          rx="2"
          fill="currentColor"
          opacity="0.65"
        />
        <path
          d="M4 20L20 8L36 20"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <rect
          x="15"
          y="26"
          width="10"
          height="10"
          rx="1"
          fill="white"
          opacity="0.75"
        />
      </svg>
    ),
  },
  {
    id: 2,
    tag: "Studio",
    title: "Modern Studio at The Trion, QC",
    location: "Quezon City, Metro Manila",
    price: "₱18,500",
    status: "available",
    gradientClass: "bg-gradient-to-br from-base-200 to-base-300",
    icon: (
      <svg width="44" height="44" viewBox="0 0 40 40" fill="none">
        <rect
          x="8"
          y="14"
          width="24"
          height="22"
          rx="2"
          fill="currentColor"
          opacity="0.1"
        />
        <rect
          x="14"
          y="20"
          width="6"
          height="8"
          rx="1"
          fill="currentColor"
          opacity="0.22"
        />
        <rect
          x="22"
          y="20"
          width="6"
          height="8"
          rx="1"
          fill="currentColor"
          opacity="0.22"
        />
        <rect
          x="8"
          y="10"
          width="24"
          height="6"
          rx="1"
          fill="currentColor"
          opacity="0.16"
        />
      </svg>
    ),
  },
  {
    id: 3,
    tag: "House",
    title: "4BR Townhouse, Filinvest Alabang",
    location: "Muntinlupa City, Metro Manila",
    price: "₱72,000",
    status: "available",
    gradientClass: "bg-gradient-to-br from-warning/10 to-warning/30",
    icon: (
      <svg width="44" height="44" viewBox="0 0 40 40" fill="none">
        <rect
          x="4"
          y="20"
          width="32"
          height="16"
          rx="2"
          fill="currentColor"
          opacity="0.45"
        />
        <path
          d="M4 22L20 10L36 22"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <rect
          x="10"
          y="24"
          width="8"
          height="12"
          rx="1"
          fill="currentColor"
          opacity="0.65"
        />
        <rect
          x="22"
          y="24"
          width="8"
          height="12"
          rx="1"
          fill="currentColor"
          opacity="0.65"
        />
      </svg>
    ),
  },
  {
    id: 4,
    tag: "1 Bedroom",
    title: "1BR at Celadon Residences, Makati",
    location: "Salcedo Village, Makati City",
    price: "₱28,000",
    status: "soon",
    gradientClass: "bg-gradient-to-br from-error/10 to-error/30",
    icon: (
      <svg width="44" height="44" viewBox="0 0 40 40" fill="none">
        <rect
          x="8"
          y="12"
          width="24"
          height="24"
          rx="2"
          fill="currentColor"
          opacity="0.22"
        />
        <rect
          x="14"
          y="18"
          width="6"
          height="8"
          rx="1"
          fill="currentColor"
          opacity="0.45"
        />
        <rect
          x="22"
          y="18"
          width="6"
          height="8"
          rx="1"
          fill="currentColor"
          opacity="0.45"
        />
        <rect
          x="8"
          y="8"
          width="24"
          height="6"
          rx="1"
          fill="currentColor"
          opacity="0.32"
        />
      </svg>
    ),
  },
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
            className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-150
              ${
                activeFilter === filter
                  ? "bg-primary text-primary-content border-primary"
                  : "bg-base-100 text-base-content/55 border-base-300 hover:bg-base-300"
              }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap -mx-2">
        {listings.map((listing) => (
          <div key={listing.id} className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4">
            <PropertyCard {...listing} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedListings;
