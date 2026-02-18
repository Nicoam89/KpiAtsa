const API = import.meta.env.VITE_API_URL;

export async function fetchKpis(period) {
  const res = await fetch(`${API}/kpis?period=${period}`);

  if (!res.ok) throw new Error("Error cargando KPIs");

  return res.json();
}
