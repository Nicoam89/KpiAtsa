import { useEffect, useState } from "react";
import { apiRequest } from "../services/api";

export default function useKpis(period) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const array = await apiRequest(`/kpis?period=${period}`);

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
