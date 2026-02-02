import { readExcel } from "./excel.service.js";

const CACHE_TTL = 60 * 1000; // 60 segundos

let cache = {
  MTD: null,
  YTD: null
};

let lastLoad = {
  MTD: 0,
  YTD: 0
};

export async function getKpis(period = "MTD") {
  const now = Date.now();

  // ✅ si existe cache y no venció → devolver
  if (
    cache[period] &&
    now - lastLoad[period] < CACHE_TTL
  ) {
    console.log("⚡ usando cache", period);
    return cache[period];
  }

  console.log("📖 leyendo Excel", period);

  const file =
    period === "YTD"
      ? "kpis_ytd.xlsx"
      : "kpis_mtd.xlsx";

  const rows = await readExcel(file);

  const data = rows.map(r => {
    const value = Number(r.value || 0);
    const target = Number(r.target || 0);

    const variation =
      target === 0
        ? 0
        : ((value - target) / target) * 100;

    return {
      id: r.id,
      value,
      target,
      variation
    };
  });

  // ✅ guardar cache
  cache[period] = data;
  lastLoad[period] = now;

  return data;
}
