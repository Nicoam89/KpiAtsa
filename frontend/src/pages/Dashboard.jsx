import { useState } from "react";
import Header from "../components/Header";
import KpiGrid from "../components/KpiGrid";
import SkeletonGrid from "../components/SkeletonGrid";
import useKpis from "../hooks/useKpis";

export default function Dashboard() {
  const [period, setPeriod] = useState("MTD");

  const { data, loading, error } = useKpis(period);

  if (loading) return <SkeletonGrid />;
  if (error) return <div>Error cargando KPIs</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header period={period} setPeriod={setPeriod} />

      <KpiGrid data={data} />
    </div>
  );
}
