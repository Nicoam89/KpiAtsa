import xlsx from "xlsx";
import path from "path";

const FILE_PATH = path.resolve("data/Consolidacion_KPI.xlsx");

const CACHE_TTL = 60 * 1000;

let cache = { MTD: null, YTD: null };
let lastLoad = { MTD: 0, YTD: 0 };

function readSheet(sheetName) {
  const workbook = xlsx.readFile(FILE_PATH);
  const sheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json(sheet);
}

export async function getKpis(period = "MTD") {
  const now = Date.now();

  if (cache[period] && now - lastLoad[period] < CACHE_TTL) {
    console.log("⚡ usando cache", period);
    return cache[period];
  }

  console.log("📖 leyendo Excel hoja:", period);

  const rows = readSheet(period);

  const data = rows.map(r => {
    const value = Number(r.value || 0);
    const target = Number(r.target || 0);

    const variation =
      target === 0 ? 0 : ((value - target) / target) * 100;

    return {
      id: r.id,
      value,
      target,
      variation
    };
  });

  cache[period] = data;
  lastLoad[period] = now;

  return data;
}
