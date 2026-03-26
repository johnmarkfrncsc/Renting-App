const TableSkeleton = () => {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <tr key={index} className="hover:bg-gray-50 transition-colors">
          <td className="px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded shrink-0 animate-pulse">
                {/* image */}
              </div>
              <div className="flex flex-col gap-2 min-w-0 flex-1">
                <div className="h-4 w-40 bg-gray-200 rounded animate-pulse ">
                  {/* title */}
                </div>
                <div className="h-3 w-32 bg-gray-200 rounded animate-pulse ">
                  {/* address */}
                </div>
              </div>
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-28 ml-5">
              {/* type */}
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="h-5 bg-gray-200 rounded-full animate-pulse w-28">
              {/* status */}
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-16">
              {/* price */}
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-28">
              {/* tenant */}
            </div>
          </td>
          <td className="px-6 py-4 text-center">
            <div className="h-4 w-4 bg-gray-200 rounded animate-pulse mx-auto">
              {/* action */}
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};
export default TableSkeleton;
