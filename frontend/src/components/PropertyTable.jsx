import { useState, useEffect, useContext } from "react";
import { AlertCircle, Inbox } from "lucide-react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useModal } from "../components/hooks/useModal";
import ViewPropertyModal from "../components/portfolio/ViewPropertyModal";
import DeleteConfirmModal from "./portfolio/DeleteConfirmModal";
import TableSkeleton from "../components/portfolio/TableSkeleton";
import PropertyFilters from "../components/portfolio/PropertyFilters";
import PropertyRow from "../components/portfolio/PropertyRow";

const PropertyTable = ({ refreshTrigger }) => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
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

  // Fetch
  const fetchUserProperties = async () => {
    if (!user?.id) return;
    setIsLoading(true);
    setError("");
    try {
      const response = await api.get("/rents");
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
  }, [selectedProperty, refreshTrigger]);

  // Search + filter
  useEffect(() => {
    let result = properties;

    if (searchTerm.trim()) {
      result = result.filter(
        (p) =>
          p.rentTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.rentAddress.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (statusFilter) {
      result = result.filter(
        (p) => p.rentStatus.toLowerCase() === statusFilter.toLowerCase(),
      );
    }

    setFilteredProperties(result);
  }, [searchTerm, statusFilter, properties]);

  // Close action menu on outside click
  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuToggle = (propertyId) => {
    setOpenMenuId((prev) => (prev === propertyId ? null : propertyId));
  };

  return (
    <>
      <PropertyFilters
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-50 text-red-700 border-b border-red-200">
            <AlertCircle size={18} />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && filteredProperties.length === 0 && !error && (
          <div className="flex flex-col items-center justify-center p-8 text-gray-500">
            <Inbox className="h-10 w-20" />
            <p className="text-sm">No properties found</p>
            <p className="text-xs mt-1">
              Create your first listing to get started
            </p>
          </div>
        )}

        {/* Table */}
        {(isLoading || filteredProperties.length > 0) && !error && (
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[800px]">
              <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500">
                <tr>
                  <th className="px-6 py-4 uppercase">Property</th>
                  <th className="px-6 py-4 uppercase">Type</th>
                  <th className="px-6 py-4 uppercase">Status</th>
                  <th className="px-6 py-4 uppercase whitespace-nowrap">
                    Market Rent
                  </th>
                  <th className="px-6 py-4 uppercase whitespace-nowrap">
                    Tenant Name
                  </th>
                  <th className="px-6 py-4 uppercase text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
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
        <ViewPropertyModal
          isOpen={isViewModalOpen}
          onClose={() => {
            closeViewModal();
            setSelectedProperty(null);
          }}
          property={selectedProperty}
          onUpdate={fetchUserProperties}
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
          onDelete={fetchUserProperties}
        />
      )}
    </>
  );
};

export default PropertyTable;
