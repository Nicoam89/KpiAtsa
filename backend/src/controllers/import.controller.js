import ExcelJS from "exceljs";
import { Facturacion } from "../models/Facturacion.js";

export const importFacturacion = async (req, res) => {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile("data/Consolidacion KPI 2026 values.xlsx");

    const sheet = workbook.getWorksheet("Facturacion");

    if (!sheet) {
      return res.status(400).json({ error: "No existe la hoja Facturacion" });
    }

    const rows = [];

    // Leemos encabezados
    const headerRow = sheet.getRow(1);
    const headers = headerRow.values.map(h =>
      typeof h === "string" ? h.trim() : h
    );

    // Buscamos índices de cada columna
    const idxNegocio = headers.indexOf("Negocio") + 1;
    const idxValor = headers.indexOf("Valor USD") + 1;
    const idxForecast = headers.indexOf("Forecast USD") + 1;
    const idxVariacion = headers.indexOf("Variacion") + 1;

    if (
      idxNegocio === 0 ||
      idxValor === 0 ||
      idxForecast === 0 ||
      idxVariacion === 0
    ) {
      return res.status(400).json({
        error: "No se encontraron todos los encabezados requeridos"
      });
    }

    // Leemos filas de datos
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // saltamos encabezados

      const negocio = row.getCell(idxNegocio).value;

      const valorUSD = Number(row.getCell(idxValor).value) || 0;
      const forecastUSD = Number(row.getCell(idxForecast).value) || 0;
      const variacion = Number(row.getCell(idxVariacion).value) || 0;

      if (!negocio) return;

      rows.push({
        negocio,
        valorUSD,
        forecastUSD,
        variacion
      });
    });

    // Limpiamos y volvemos a cargar
    await Facturacion.deleteMany();
    await Facturacion.insertMany(rows);

    res.json({
      message: "✅ Facturación importada correctamente",
      count: rows.length
    });

  } catch (error) {
    console.error("🔥 ERROR IMPORTACIÓN:", error);
    res.status(500).json({ error: "Error importando facturación" });
  }
};
