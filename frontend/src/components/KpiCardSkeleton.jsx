
export default function KpiCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow p-5 animate-pulse">
      {/* header */}
      <div className="flex items-center justify-between mb-4">
        <div className="h-4 w-24 bg-gray-300 rounded"></div>
        <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
      </div>

      {/* value */}
      <div className="h-8 w-20 bg-gray-300 rounded mb-3"></div>

      {/* target */}
      <div className="h-3 w-28 bg-gray-200 rounded"></div>
    </div>
  );
}
