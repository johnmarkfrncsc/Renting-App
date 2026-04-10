import PropertyTable from "../components/portfolio/PropertyTable.jsx";
import { useState } from "react";
import { Plus, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PortfolioPage = () => {
  const navigate = useNavigate();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  return (
    <div>
      <header>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="hidden md:block text-3xl font-bold text-base-content pb-0.5">
            Portfolio
          </h2>
          <div className="flex gap-2 w-full md:w-auto">
            <button
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 cursor-pointer transition-colors 
              bg-base-200 text-base-content rounded-lg text-sm font-medium border-2 border-base-300 hover:bg-base-300 shadow-md"
            >
              <Download size={16} /> Import
            </button>
            <button
              onClick={() => navigate("/admin/portfolio/add")}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 cursor-pointer transition-colors 
              bg-base-200 text-base-content rounded-lg text-sm font-medium border-2 border-base-300 hover:bg-primary/90 hover:text-base-100 shadow-md"
            >
              <Plus size={16} /> Add Property
            </button>
          </div>
        </div>
      </header>

      <PropertyTable
        refreshTrigger={refreshTrigger}
        onRefresh={() => setRefreshTrigger((prev) => prev + 1)}
      />
    </div>
  );
};

export default PortfolioPage;
