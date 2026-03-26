const TableSkeleton = () => {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <tr key={index} className="hover:bg-base-200 transition-colors">
          <td className="px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-base-300 rounded shrink-0 animate-pulse" />
              <div className="flex flex-col gap-2 min-w-0 flex-1">
                <div className="h-4 w-40 bg-base-300 rounded animate-pulse" />
                <div className="h-3 w-32 bg-base-300 rounded animate-pulse" />
              </div>
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="h-4 bg-base-300 rounded animate-pulse w-28 ml-5" />
          </td>
          <td className="px-6 py-4">
            <div className="h-5 bg-base-300 rounded-full animate-pulse w-28" />
          </td>
          <td className="px-6 py-4">
            <div className="h-4 bg-base-300 rounded animate-pulse w-16" />
          </td>
          <td className="px-6 py-4">
            <div className="h-4 bg-base-300 rounded animate-pulse w-28" />
          </td>
          <td className="px-6 py-4 text-center">
            <div className="h-4 w-4 bg-base-300 rounded animate-pulse mx-auto" />
          </td>
        </tr>
      ))}
    </>
  );
};

export default TableSkeleton;
