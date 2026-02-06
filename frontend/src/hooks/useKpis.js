import { useEffect, useState } from "react";

export default function useKpis(period) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/api/kpis?period=${period}`)
      .then(r => r.json())
      .then(d => {
        setData(d);
        setLoading(false);
      });
  }, [period]);


  
  return { data, loading, error: null };
}

