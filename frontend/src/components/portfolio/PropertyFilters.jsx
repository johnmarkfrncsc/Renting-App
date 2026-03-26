import { Search } from "lucide-react";

const status = ["", "occupied", "vacant", "under renovation"];

const PropertyFilters = ({
  searchTerm,
  onSearch,
  statusFilter,
  onStatusChange,
}) => {
  return (
    <div className="bg-base-100 border border-base-300 rounded-xl p-4 mb-6 flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
      <div className="relative w-full flex-1">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-base-content/40" />
        <input
          type="text"
          placeholder="Search properties"
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 border border-base-300 rounded-lg text-sm bg-base-100 text-base-content placeholder:text-base-content focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
      </div>

      <div
        className="flex gap-2 overflow-x-auto pb-0.5 whitespace-nowrap"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {status.map((status) => (
          <button
            key={status}
            onClick={() => onStatusChange(status)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors cursor-pointer ${
              statusFilter === status
                ? "bg-primary text-primary-content border-primary"
                : "text-base-content/60 border-base-300 hover:bg-base-200"
            }`}
          >
            {status === "" ? "All" : status}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PropertyFilters;
