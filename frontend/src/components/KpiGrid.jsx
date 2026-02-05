import KpiCard from "./KpiCard";
import { KPI_CONFIG } from "../config/kpis.config";

export default function KpiGrid({ data }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {KPI_CONFIG.map(kpi => {
        const kpiData = data[kpi.id] || {};

        return (
          <KpiCard
            key={kpi.id}
            title={kpi.title}
            value={kpiData.value ?? 0}
            target={kpiData.target ?? 0}
            variation={kpiData.variation ?? 0}
            unit={kpi.unit}
            direction={kpi.direction}
          />
        );
      })}
    </div>
  );
  
}
