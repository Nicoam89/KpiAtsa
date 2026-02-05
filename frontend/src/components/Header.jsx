import PeriodToggle from "./PeriodToggle";

export default function Header({ period, setPeriod }) {
  return (
    <div className="app-header">
      <h1 className="text-2xl font-bold">
        Dashboard Ejecutivo
      </h1>

      <PeriodToggle period={period} setPeriod={setPeriod} />

<button
          onClick={onLogout}
          className="ml-4 px-3 py-1 rounded-lg text-sm font-semibold bg-red-500 text-white hover:bg-red-600"
        >
          Logout
        </button>
    </div>
  );
}
