import { MoreHorizontal } from "lucide-react";
import ActionMenu from "../portfolio/ActionMenu";

const statusColor = {
  occupied: "text-base-100 bg-success rounded-full px-2 py-0.5 text-xs",
  vacant: "text-base-100 bg-warning rounded-full px-2 py-0.5 text-xs",
};

const noTenantStyle = "text-base-content/50 italic";

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
    <tr className="hover:bg-base-200 transition-colors capitalize">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          {property.rentImageURL ? (
            <img
              src={property.rentImageURL}
              alt={property.rentTitle}
              className="w-8 h-8 bg-base-300 rounded shrink-0 object-cover"
            />
          ) : (
            <div className="w-8 h-8 bg-base-300 rounded shrink-0" />
          )}
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-sm text-base-content truncate capitalize">
              {property.rentTitle}
            </span>
            <span className="text-xs text-base-content/60 truncate">
              {property.rentAddress}
            </span>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-base-content text-sm font-semibold">
        <span className="truncate block">{property.rentCategory}</span>
      </td>
      <td className="px-6 py-4 text-sm">
        <span
          className={`font-semibold whitespace-nowrap ${
            statusColor[property.rentStatus] ||
            "text-base-100 bg-error rounded-full px-2 py-0.5 text-xs"
          }`}
        >
          {property.rentStatus}
        </span>
      </td>
      <td className="px-6 py-4 font-bold text-success">
        ${property.rentPrice.toLocaleString()}
      </td>
      <td className="px-6 py-4 text-base-content text-sm font-semibold">
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
          className="cursor-pointer pt-2 hover:bg-base-300 transition-colors rounded-lg p-1"
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
