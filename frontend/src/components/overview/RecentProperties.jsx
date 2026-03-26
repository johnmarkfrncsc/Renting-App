const RecentProperties = ({ property }) => {
  return (
    <tr className="hover:bg-gray-50 transition capitalize">
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          {property.rentImageURL ? (
            <img
              src={property.rentImageURL}
              alt={property.rentTitle}
              className="w-8 h-8 rounded object-cover"
            />
          ) : (
            <div className="w-8 h-8 bg-gray-200 rounded"></div>
          )}

          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-sm truncate">
              {property.rentTitle}
            </span>
            <span className="text-xs text-gray-500 truncate">
              {property.rentAddress}
            </span>
          </div>
        </div>
      </td>

      <td className="px-4 py-4 font-bold text-green-700">
        ${property.rentPrice.toLocaleString()}
      </td>
    </tr>
  );
};

export default RecentProperties;
