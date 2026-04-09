import { Search, SlidersHorizontal } from "lucide-react";

const PropertyFilters = ({
  searchTerm,
  onSearch,
  onOpenFilters,
  hasActiveFilters,
}) => {
  return (
    <div className="bg-base-200 border border-base-300 rounded-xl p-4 mb-6 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
      {/* Search */}
      <div className="relative w-full md:max-w-sm">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-base-content/40" />
        <input
          type="text"
          placeholder="Search properties"
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 border-2 border-base-300 rounded-lg text-sm bg-base-200 text-base-content focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
      </div>

      {/* Filters Button */}
      <button
        onClick={onOpenFilters}
        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition cursor-pointer
          ${
            hasActiveFilters
              ? "bg-primary text-primary-content border-primary"
              : "bg-base-100 border-base-300 hover:bg-base-200"
          }
        `}
      >
        <SlidersHorizontal size={16} />
        Filters
      </button>
    </div>
  );
};

export default PropertyFilters;
