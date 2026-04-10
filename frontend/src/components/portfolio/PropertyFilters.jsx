import { Search, SlidersHorizontal, X } from "lucide-react";

const PropertyFilters = ({
  searchTerm,
  onSearch,
  onOpenFilters,
  hasActiveFilters,
  appliedFilters,
  onRemoveFilter,
}) => {
  return (
    <div className="mb-6 flex flex-col gap-3">
      <div className="flex gap-3 items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-base-content/40" />
          <input
            type="text"
            placeholder="Search properties"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border-2 border-base-300 rounded-lg text-sm bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
        {/* Filter btn */}
        <button
          onClick={onOpenFilters}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition cursor-pointer whitespace-nowrap
            ${
              hasActiveFilters
                ? "bg-primary text-primary-content border-primary"
                : "bg-base-100 border-base-300 hover:bg-base-200 text-base-content"
            }
          `}
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>
      </div>

      {/* active filter chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {appliedFilters.category.map((c) => (
            <span
              key={c}
              className="flex items-center gap-1 pl-2 pr-0.5 py-1 rounded-full bg-primary/10 text-base-content text-xs font-medium border border-primary capitalize"
            >
              {c}
              <button
                onClick={() => onRemoveFilter("category", c)}
                className="hover:text-base-content/60 cursor-pointer"
              >
                <X className="h-3 w-4.5" />
              </button>
            </span>
          ))}
          {appliedFilters.type.map((t) => (
            <span
              key={t}
              className="flex items-center gap-1 pl-2 pr-0.5 py-1 rounded-full bg-primary/10 text-base-content text-xs font-medium border border-primary capitalize"
            >
              {t}
              <button
                onClick={() => onRemoveFilter("type", t)}
                className="hover:text-base-content/60 cursor-pointer"
              >
                <X className="h-3 w-4.5" />
              </button>
            </span>
          ))}
          {appliedFilters.status.map((s) => (
            <span
              key={s}
              className="flex items-center gap-1 pl-2 pr-0.5 py-1 rounded-full bg-primary/10 text-base-content text-xs font-medium border border-primary capitalize"
            >
              {s}
              <button
                onClick={() => onRemoveFilter("status", s)}
                className="hover:text-base-content/60 cursor-pointer"
              >
                <X className="h-3 w-4.5" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyFilters;
