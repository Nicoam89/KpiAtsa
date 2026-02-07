import { useEffect, useState } from "react";

export default function useKpis(period) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const res = await fetch(`/api/kpis?period=${period}`);

        if (!res.ok) throw new Error("Error HTTP");

        const array = await res.json(); // 👈 ESTA VARIABLE

        const objectById = {};

        array.forEach(k => {           // 👈 MISMO NOMBRE
          objectById[k.id] = k;
        });

        setData(objectById);

      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [period]);

  return { data, loading, error };
}
