export default function PeriodToggle({ period, setPeriod }) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => setPeriod("MTD")}
        className={`px-3 py-1 rounded-lg text-sm font-semibold transition
          ${period === "MTD"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-700"}`}
      >
        MTD
      </button>

      <button
        onClick={() => setPeriod("YTD")}
        className={`px-3 py-1 rounded-lg text-sm font-semibold transition
          ${period === "YTD"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-700"}`}
      >
        YTD
      </button>
    </div>
  );
}
