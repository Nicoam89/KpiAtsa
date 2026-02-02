import PeriodToggle from "./PeriodToggle";

export default function Header({ period, setPeriod }) {
  return (
    <div className="app-header">
      <h1 className="text-2xl font-bold">
        Dashboard Ejecutivo
      </h1>

      <PeriodToggle period={period} setPeriod={setPeriod} />
    </div>
  );
}
