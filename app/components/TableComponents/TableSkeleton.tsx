export const TableSkeleton = () => {
  return (
    <div className="w-full">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            {Array.from({ length: 4 }).map((_, index) => (
              <th
                key={index}
                className="px-6 py-3 bg-gray-50"
              >
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.from({ length: 10 }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: 4 }).map((_, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-6 py-4"
                >
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
