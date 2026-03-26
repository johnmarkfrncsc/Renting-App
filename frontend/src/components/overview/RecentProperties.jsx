const RecentProperties = ({ property }) => {
  return (
    <tr className="hover:bg-base-200 transition capitalize">
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          {property.rentImageURL ? (
            <img
              src={property.rentImageURL}
              alt={property.rentTitle}
              className="w-8 h-8 rounded object-cover"
            />
          ) : (
            <div className="w-8 h-8 bg-base-300 rounded" />
          )}
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-sm text-base-content truncate">
              {property.rentTitle}
            </span>
            <span className="text-xs text-base-content/60 truncate">
              {property.rentAddress}
            </span>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 font-bold text-success">
        ${property.rentPrice.toLocaleString()}
      </td>
    </tr>
  );
};

export default RecentProperties;
