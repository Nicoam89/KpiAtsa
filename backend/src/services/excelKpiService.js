import ExcelJS from "exceljs";
import path from "path";

const FILE_PATH = path.resolve("data/Consolidacion_KPI.xlsx");

const CACHE_TTL = 60 * 1000;

let cache = { MTD: null, YTD: null };
let lastLoad = { MTD: 0, YTD: 0 };

async function readSheet(sheetName) {
  const workbook = new ExcelJS.Workbook();

  await workbook.xlsx.readFile(FILE_PATH);

  const sheet = workbook.getWorksheet(sheetName);

  const rows = [];

  sheet.eachRow((row, index) => {
    if (index === 1) return; // saltar header

    rows.push({
      id: row.getCell(1).value,
      value: row.getCell(2).value,
      target: row.getCell(3).value
    });
  });

  return rows;
}

export async function getKpisFromExcel(period = "MTD") {
  const now = Date.now();

  if (cache[period] && now - lastLoad[period] < CACHE_TTL) {
    console.log("⚡ usando cache", period);
    return cache[period];
  }

  console.log("📖 leyendo Excel hoja:", period);

  const rows = await readSheet(period);

  const data = rows.map(r => {
    const value = Number(r.value || 0);
    const target = Number(r.target || 0);

    return {
      id: r.id,
      value,
      target,
      variation:
        target === 0 ? 0 : ((value - target) / target) * 100
    };
  });

  cache[period] = data;
  lastLoad[period] = now;

  return data;
}
