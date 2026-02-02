import ExcelJS from "exceljs";
import path from "path";

// 📂 archivo único
const FILE_PATH = path.resolve("data/Consolidacion KPI.xlsx");

// cache por período
const cache = {
  MTD: null,
  YTD: null,
  lastLoad: {
    MTD: 0,
    YTD: 0
  }
};

const CACHE_TTL = 60 * 1000; // 1 min

async function readExcel(period) {
  console.log(`📂 Leyendo Excel hoja: ${period}`);

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(FILE_PATH);

  const sheet = workbook.getWorksheet(period);

  if (!sheet) {
    throw new Error(`Hoja ${period} no encontrada`);
  }

  const result = {};

  sheet.eachRow((row, i) => {
  if (i === 1) return;

  const id = String(row.getCell(1).value).trim();

  const value = Number(row.getCell(2).value) || 0;
  const target = Number(row.getCell(3).value) || 0;

  let variation = 0;

  if (target !== 0) {
    variation = ((value - target) / target) * 100;
  }

  result[id] = {
    value,
    target,
    variation: Number(variation.toFixed(1))
  };
});


  console.log("RESULT:", result);

  return result;
}

export async function getKpisFromExcel(period = "MTD") {
  const now = Date.now();

  // cache hit
  if (cache[period] && now - cache.lastLoad[period] < CACHE_TTL) {
    console.log(`⚡ Cache hit: ${period}`);
    return cache[period];
  }

  const data = await readExcel(period);

  cache[period] = data;
  cache.lastLoad[period] = now;

  return data;
}
