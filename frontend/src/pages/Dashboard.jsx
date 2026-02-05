import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import KpiGrid from "../components/KpiGrid";
import SkeletonGrid from "../components/SkeletonGrid";
import useKpis from "../hooks/useKpis";

export default function Dashboard() {
  const [period, setPeriod] = useState("MTD");

  const navigate = useNavigate(); 

  const { data, loading, error } = useKpis(period);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

if (loading) return <SkeletonGrid />;
if (error) return <div>Error cargando KPIs</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header
        period={period}
        setPeriod={setPeriod}
        onLogout={handleLogout}
      />

      <KpiGrid data={data} />
    </div>
  );
}
