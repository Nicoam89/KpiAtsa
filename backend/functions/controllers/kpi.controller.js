import { getKpisFromExcel } from "../services/excelKpiService.js";

export async function getKpis(req, res) {
  try {
    const period = req.query.period || "MTD";

    const data = await getKpisFromExcel(period);

    res.json(data);
  } catch (err) {
    console.error("❌ ERROR KPI:", err);
    res.status(500).json({ error: "Error leyendo KPIs" });
  }
}
