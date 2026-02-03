import { useEffect, useState } from "react";

export default function useKpis(period) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchKpis() {
      try {
        setLoading(true);

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/kpis?period=${period}`)
;

        if (!res.ok) throw new Error("Error API");

        const json = await res.json();

        setData(json);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false); // 🔥 CLAVE
      }
    }

    fetchKpis();
  }, [period]);

  return { data, loading, error };
}
