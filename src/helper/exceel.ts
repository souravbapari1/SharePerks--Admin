import * as XLSX from "xlsx";

export function downloadExcel(data: any[], fileName: string) {
  // Convert JSON data to a worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Create a new workbook
  const workbook = XLSX.utils.book_new();

  // Append the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Generate an Excel file and trigger the download
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
}
