import { getKpiStatus } from "../utils/kpiStatus";
import { formatValue } from "../utils/formatters";


export default function KpiCard({ title, value, target, unit, variation, direction = "up" }) {
  const status = getKpiStatus(value, target, direction);

  const trafficLight = {
    good: "bg-green-500",
    warning: "bg-yellow-400",
    bad: "bg-red-500"
  };

  const arrow =
    variation > 0 ? "▲" : variation < 0 ? "▼" : "—";

  const arrowColor =
    variation > 0
      ? "text-green-600"
      : variation < 0
      ? "text-red-600"
      : "text-gray-500";

  return (
    <div className="relative rounded-xl bg-white p-4 shadow-sm">
      
      {/* SEMÁFORO */}
      <span
        className={`absolute top-4 right-4 h-6 w-6 rounded-full ${trafficLight[status]} shadow`}
        title={`Status: ${status}`}
      />

      {/* Título */}
      <h3 className="text-sm font-medium text-gray-500 mb-2">
        {title}
      </h3>

      {/* Valor */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold text-gray-900">
            {formatValue(value, unit)}{" "}
            <span className="text-sm font-medium text-gray-500">
              {unit}
            </span>
          </p>

          <p className="text-xs text-gray-500">
            Target: {target.toLocaleString()} {unit}
          </p>
        </div>

        {/* Variación */}
        <div className={`text-sm font-semibold ${arrowColor}`}>
          {arrow} {Math.abs(variation)}%
        </div>
      </div>
    </div>
  );
}
