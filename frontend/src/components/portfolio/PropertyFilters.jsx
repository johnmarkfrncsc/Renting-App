import { Search } from "lucide-react";

const status = ["", "occupied", "vacant", "under renovation"];

const PropertyFilters = ({
  searchTerm,
  onSearch,
  statusFilter,
  onStatusChange,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
      <div className="relative w-full lg:w-72">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search properties"
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
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
                ? "bg-indigo-600 text-white border-indigo-600"
                : "text-gray-500 border-gray-200 hover:bg-gray-50"
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
