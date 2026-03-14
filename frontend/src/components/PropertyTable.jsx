import { useState, useEffect, useContext } from "react";
import { Search, MoreHorizontal, Loader, AlertCircle } from "lucide-react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useModal } from "./hooks/useModal";
import ViewPropertyModal from "./ViewPropertyModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import ActionMenu from "./ActionMenu";

const PropertyTable = ({ refreshTrigger }) => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [properties, setProperties] = useState([]);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);

  // Modal state
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

  // Fetch user's properties
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

  // Handle search
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProperties(properties);
    } else {
      const filtered = properties.filter(
        (property) =>
          property.rentTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.rentAddress.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredProperties(filtered);
    }

    if (statusFilter) {
      setFilteredProperties((prev) =>
        prev.filter(
          (property) =>
            property.rentStatus.toLowerCase() === statusFilter.toLowerCase(),
        ),
      );
    }
  }, [searchTerm, properties, statusFilter]);

  //Toggle action menu

  const handleMenuToggle = (propertyId) => {
    setOpenMenuId((prevId) => (prevId === propertyId ? null : propertyId));
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setOpenMenuId(null);
      setIsExpanded(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredLabel = statusFilter === "" ? "All Status" : statusFilter;

  return (
    <>
      {/* Filter Bar */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search properties"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
          />
        </div>
        {/* Status Filter */}
        <div onMouseDown={(e) => e.stopPropagation()}>
          {isExpanded ? (
            <div className="flex gap-2">
              {["", "occupied", "vacant", "under renovation"].map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setStatusFilter(status);
                    setIsExpanded(false);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                    statusFilter === status
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "text-gray-500 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {status === "" ? "All" : status}
                </button>
              ))}
            </div>
          ) : (
            <button
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors cursor-pointer 
                ${statusFilter ? "bg-indigo-600 text-white" : `${statusFilter}`} `}
              onClick={() => setIsExpanded(true)}
            >
              {filteredLabel}
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        {isLoading && (
          <div className="flex items-center justify-center p-8">
            <Loader size={24} className="animate-spin text-gray-400" />
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-50 text-red-700 border-b border-red-200">
            <AlertCircle size={18} />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {!isLoading && filteredProperties.length === 0 && !error && (
          <div className="flex flex-col items-center justify-center p-8 text-gray-500">
            <p className="text-sm">No properties found</p>
            <p className="text-xs mt-1">
              Create your first listing to get started
            </p>
          </div>
        )}

        {!isLoading && filteredProperties.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[800px]">
              <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 ">
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
                {filteredProperties.map((property, index) => (
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
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* View/Edit Modal */}
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

      {/* Delete Confirmation Modal */}
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

const statusColor = {
  occupied: "text-green-600 bg-green-700/20 rounded-sm px-3 py-2",
  vacant: "text-yellow-600 bg-yellow-700/20 rounded-sm px-3 py-2",
};
// Row Component
const PropertyRow = ({
  property,
  onView,
  onDelete,
  openMenuId,
  onMenuToggle,
  index,
  totalCount,
}) => {
  const isLastRow = index === totalCount - 1;

  return (
    <tr className="hover:bg-gray-50 transition-colors capitalize">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          {property.rentImageURL ? (
            <img
              src={property.rentImageURL}
              alt={property.rentTitle}
              className="w-8 h-8 bg-gray-200 rounded shrink-0 object-cover"
            />
          ) : (
            <div className="w-8 h-8 bg-gray-200 rounded shrink-0"></div>
          )}
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-sm text-gray-900 truncate capitalize">
              {property.rentTitle}
            </span>
            <span className="text-xs text-gray-500 truncate">
              {property.rentAddress}
            </span>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-gray-900 text-sm font-semibold">
        <span className="truncate block">{property.rentCategory}</span>
      </td>
      <td className="px-6 py-4 text-sm">
        <span
          className={`font-semibold whitespace-nowrap ${statusColor[property.rentStatus] || "text-red-600 bg-red-700/20 rounded-sm px-3 py-2"}`}
        >
          {property.rentStatus}
        </span>
      </td>
      <td className="px-6 py-4 font-bold text-green-700">
        ${property.rentPrice.toLocaleString()}
      </td>
      <td className="px-6 py-4 text-gray-900 text-sm font-semibold">
        <span className="truncate block">Tenant</span>
      </td>
      <td className="px-6 py-4 text-right relative flex justify-center">
        <button
          className="cursor-pointer p-1  hover:bg-gray-50 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onMenuToggle();
          }}
        >
          <MoreHorizontal size={16} />
        </button>
        <ActionMenu
          isLastRow={isLastRow}
          isOpen={openMenuId === property._id}
          onView={onView}
          onDelete={onDelete}
        />
      </td>
    </tr>
  );
};

export default PropertyTable;
