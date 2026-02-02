import ExcelJS from "exceljs";
import path from "path";

export async function readExcel(fileName) {
  const filePath = path.join(process.cwd(), "data", fileName);

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  const worksheet = workbook.worksheets[0];

  const rows = [];

  const headers = [];

  // tomar headers (fila 1)
  worksheet.getRow(1).eachCell((cell, colNumber) => {
    headers[colNumber - 1] = cell.value;
  });

  // recorrer datos
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;

    const obj = {};

    row.eachCell((cell, colNumber) => {
      obj[headers[colNumber - 1]] = cell.value;
    });

    rows.push(obj);
  });

  return rows;
}
