const TableSkeleton = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left min-w-[800px]">
        <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500">
          <tr>
            <td className="px-6 py-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-20">
                {/* Property */}
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-20 ml-5">
                {/* Type */}
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-20 ">
                {/* Status */}
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-20">
                {/* Price */}
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-20">
                {/* Tenant */}
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-15">
                {/* Action */}
              </div>
            </td>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm">
          {[...Array(5)].map((_, index) => (
            <tr key={index} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded shrink-0 animate-pulse"></div>
                  <div className="flex flex-col gap-2 min-w-0 flex-1">
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse "></div>
                    <div className="h-3 w-30 bg-gray-200 rounded animate-pulse "></div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-30 ml-5"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-5 bg-gray-200 rounded-full animate-pulse w-28 "></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-28"></div>
              </td>
              <td className="px-6 py-4 text-center">
                <div className="h-4 w-4 bg-gray-200 rounded animate-pulse mx-auto"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
