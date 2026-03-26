import { MoreHorizontal } from "lucide-react";
import ActionMenu from "../portfolio/ActionMenu";

const statusColor = {
  occupied: "text-green-600 bg-green-700/20 rounded-full px-2 py-1",
  vacant: "text-yellow-600 bg-yellow-700/20 rounded-full px-2 py-1",
};

const noTenantStyle = "text-gray-500 italic";

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
            <div className="w-8 h-8 bg-gray-200 rounded shrink-0" />
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
          className={`font-semibold whitespace-nowrap ${
            statusColor[property.rentStatus] ||
            "text-red-600 bg-red-700/20 rounded-full px-2 py-1"
          }`}
        >
          {property.rentStatus}
        </span>
      </td>
      <td className="px-6 py-4 font-bold text-green-700">
        ${property.rentPrice.toLocaleString()}
      </td>
      <td className="px-6 py-4 text-gray-900 text-sm font-semibold">
        <span
          className={`truncate block ${
            property.rentTenant === "No Tenant" ? noTenantStyle : ""
          }`}
        >
          {property.rentTenant}
        </span>
      </td>
      <td className="px-6 py-4 relative flex justify-center">
        <button
          className="cursor-pointer pt-2 hover:bg-gray-50 transition-colors"
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

export default PropertyRow;
