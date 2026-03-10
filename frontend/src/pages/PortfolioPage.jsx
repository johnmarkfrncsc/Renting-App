import PropertyTable from "../components/PropertyTable.jsx";
import React, { useState } from "react";
import { useModal } from "../components/hooks/useModal";
import AddListingModal from "../components/AddListingModal";
import { Plus, Download } from "lucide-react";

const PortfolioPage = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const handleListingAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div>
      {/* Desktop Title & Actions */}
      <header>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 ">
          <h2 className="hidden md:block text-3xl font-bold text-gray-900">
            Portfolio
          </h2>
          <div className="flex gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              <Download size={16} /> Import
            </button>
            <button
              onClick={openModal}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 cursor-pointer bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors"
            >
              <Plus size={16} /> Add Property
            </button>
          </div>
        </div>
      </header>

      {/* Table */}
      <PropertyTable refreshTrigger={refreshTrigger} />

      <AddListingModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onListingAdded={handleListingAdded}
      />
    </div>
  );
};

export default PortfolioPage;
