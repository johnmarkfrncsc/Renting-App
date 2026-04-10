import { useState, useEffect, useContext } from "react";
import { AlertCircle, Inbox } from "lucide-react";
import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import { useModal } from "../../components/hooks/useModal";
import ViewPropertySidebar from "../portfolio/viewProperty/ViewPropertySidebar";
import DeleteConfirmModal from "../portfolio/DeleteConfirmModal";
import TableSkeleton from "../portfolio/TableSkeleton";
import PropertyFilters from "../portfolio/PropertyFilters";
import PropertyRow from "../portfolio/PropertyRow";
import FilterModal from "../portfolio/FilterModal";

const PropertyTable = ({ refreshTrigger, onRefresh }) => {
  const { user } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [appliedFilters, setAppliedFilters] = useState({
    category: [],
    type: [],
    status: [],
  });

  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const {
    isModalOpen: isViewModalOpen,
    openModal: openViewModal,
    closeModal: closeViewModal,
  } = useModal();

  const {
    isModalOpen: isDeleteModalOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();

  const fetchUserProperties = async () => {
    if (!user?.id) return;

    setIsLoading(true);
    setError("");

    try {
      const params = {};

      if (appliedFilters.category.length > 0)
        params.rentCategory = appliedFilters.category.join(",");
      if (appliedFilters.type.length > 0)
        params.rentType = appliedFilters.type.join(",");

      const response = await api.get("/rents", { params });

      if (response.data.success) {
        const userProperties = response.data.data.filter(
          (property) => property.userId === user.id,
        );

        setProperties(userProperties);
        setFilteredProperties(userProperties);
      } else {
        setProperties([]);
        setFilteredProperties([]);
      }
    } catch (err) {
      setError("Failed to load properties");
      console.error("Error fetching properties:", err);
      setProperties([]);
      setFilteredProperties([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProperties();
  }, [appliedFilters, refreshTrigger]);

  useEffect(() => {
    let result = properties;

    if (searchTerm.trim()) {
      result = result.filter(
        (p) =>
          p.rentTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.rentLocation?.fullAddress
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
      );
    }

    if (appliedFilters.status) {
      result = result.filter(
        (p) =>
          appliedFilters.status.length === 0 ||
          appliedFilters.status.includes(p.rentStatus.toLowerCase()),
      );
    }

    setFilteredProperties(result);
  }, [searchTerm, appliedFilters.status, properties]);

  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuToggle = (propertyId) => {
    setOpenMenuId((prev) => (prev === propertyId ? null : propertyId));
  };

  const handleRemoveFilter = (filterType, value) => {
    setAppliedFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].filter((v) => v !== value),
    }));
  };

  const hasActiveFilters =
    appliedFilters.category.length > 0 ||
    appliedFilters.type.length > 0 ||
    appliedFilters.status.length > 0;

  return (
    <>
      <PropertyFilters
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        onOpenFilters={() => setIsFilterOpen(true)}
        hasActiveFilters={hasActiveFilters}
        appliedFilters={appliedFilters}
        onRemoveFilter={handleRemoveFilter}
      />

      <FilterModal
        isOpen={isFilterOpen}
        currentFilters={appliedFilters}
        onClose={() => setIsFilterOpen(false)}
        onApply={({ category, type, status }) => {
          setAppliedFilters({ category, type, status });
        }}
      />

      <div className="bg-base-100 border border-base-300 rounded-xl overflow-hidden shadow-sm">
        {error && (
          <div className="flex items-center gap-2 p-4 bg-error/10 text-error border-b border-error/20">
            <AlertCircle size={18} />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {!isLoading && filteredProperties.length === 0 && !error && (
          <div className="flex flex-col items-center justify-center p-8 text-base-content/50">
            <Inbox className="h-10 w-20" />
            <p className="text-sm">No properties found</p>
            <p className="text-xs mt-1">
              Create your first listing to get started
            </p>
          </div>
        )}

        {(isLoading || filteredProperties.length > 0) && !error && (
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[640px]">
              <thead className="bg-base-200 border-b border-base-300 text-xs font-semibold text-base-content/60">
                <tr>
                  <th className="px-6 py-4 uppercase">Property</th>
                  <th className="px-6 py-4 uppercase hidden md:table-cell">
                    Category
                  </th>
                  <th className="px-6 py-4 uppercase hidden md:table-cell">
                    Type
                  </th>
                  <th className="px-6 py-4 uppercase">Status</th>
                  <th className="px-6 py-4 uppercase whitespace-nowrap hidden lg:table-cell">
                    Market Rent
                  </th>
                  <th className="px-6 py-4 uppercase whitespace-nowrap hidden lg:table-cell">
                    Tenant Name
                  </th>
                  <th className="px-6 py-4 uppercase text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-base-300 text-sm">
                {isLoading ? (
                  <TableSkeleton />
                ) : (
                  filteredProperties.map((property, index) => (
                    <PropertyRow
                      key={property._id}
                      property={property}
                      onView={() => {
                        setSelectedProperty(property);
                        openViewModal();
                      }}
                      onDelete={() => {
                        setPropertyToDelete(property);
                        openDeleteModal();
                      }}
                      openMenuId={openMenuId}
                      onMenuToggle={() => handleMenuToggle(property._id)}
                      index={index}
                      totalCount={filteredProperties.length}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedProperty && (
        <ViewPropertySidebar
          isOpen={isViewModalOpen}
          onClose={() => {
            closeViewModal();
            setSelectedProperty(null);
          }}
          property={selectedProperty}
          onUpdate={onRefresh}
        />
      )}

      {propertyToDelete && (
        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            closeDeleteModal();
            setPropertyToDelete(null);
          }}
          property={propertyToDelete}
          onDelete={onRefresh}
        />
      )}
    </>
  );
};

export default PropertyTable;
