import PeriodToggle from "./PeriodToggle";
import logo from "../assets/logo-.jpg";
import "../styles/layout.css";

export default function Header({ period, setPeriod, onLogout }) {
  return (
    <header className="flex items-center justify-between app-header">
      
      {/* izquierda: logo + título */}
      <div className="flex items-center gap-4">
        <img
          src={logo}
          alt="Logo empresa"
          className="h-10 w-auto object-contain"
        />

        <h1 className="text-2xl font-bold">
          Dashboard Ejecutivo
        </h1>
      </div>

      {/* derecha: acciones */}
      <div className="flex items-center gap-4">
        <PeriodToggle period={period} setPeriod={setPeriod} />

        <button
          onClick={onLogout}
          className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
        >
          Salir
        </button>
      </div>
    </header>
  );
}
