export default function PeriodSelector({ period, onChange }) {
  return (
    <div className="flex rounded-lg bg-gray-200 p-1">
      {["MTD", "YTD"].map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`px-4 py-1 rounded-md text-sm font-medium transition
            ${period === p
              ? "bg-white shadow text-gray-900"
              : "text-gray-600 hover:text-gray-900"}`}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
