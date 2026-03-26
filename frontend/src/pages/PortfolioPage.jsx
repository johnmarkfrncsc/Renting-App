import PropertyTable from "../components/portfolio/PropertyTable.jsx";
import { useState } from "react";
import { Plus, Download } from "lucide-react";
import AddListingSidebar from "../components/AddListingSidebar.jsx";

const PortfolioPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div>
      {/* Desktop Title & Actions */}
      <header>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="hidden md:block text-3xl font-bold text-base-content pb-0.5">
            Portfolio
          </h2>
          <div className="flex gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-base-100 border border-base-300 rounded-lg text-sm font-medium text-base-content hover:bg-base-200 transition-colors">
              <Download size={16} /> Import
            </button>
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 cursor-pointer transition-colors bg-primary text-primary-content rounded-lg text-sm font-medium hover:bg-primary/90"
            >
              <Plus size={16} /> Add Property
            </button>
          </div>
        </div>
      </header>

      {/* Table */}
      <PropertyTable refreshTrigger={refreshTrigger} />

      {/* Add Listing Sidebar */}
      <AddListingSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onSuccess={() => setRefreshTrigger((prev) => prev + 1)}
      />
    </div>
  );
};

export default PortfolioPage;
