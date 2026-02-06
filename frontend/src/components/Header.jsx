import PeriodToggle from "./PeriodToggle";
import "../styles/layout.css";


export default function Header({ period, setPeriod, onLogout }) {
  return (
    <div className="app-header">
      <h1 className="text-2xl font-bold">
        Dashboard Ejecutivo
      </h1>

      <PeriodToggle period={period} setPeriod={setPeriod} />

  <button onClick={onLogout}>Salir</button>
    </div>
  );
}
