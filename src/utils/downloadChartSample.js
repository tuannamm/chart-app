import * as XLSX from "xlsx";

const downloadSampleFile = (chartId, downloadXlsxFile) => {
  let ws;
  const wb = XLSX.utils.book_new();

  switch (chartId) {
    case 1:
    case 2:
    case 5:
      ws = XLSX.utils.aoa_to_sheet([
        ["My Excel Title"],
        ["", "Label1", "Label2"],
        ["Dataset1", "Value", "Value"],
        ["Dataset2", "Value", "Value"],
      ]);
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      downloadXlsxFile(wb, "LineChartSample.xlsx");
      break;
    case 3:
    case 6:
      ws = XLSX.utils.aoa_to_sheet([
        ["My Excel Title"],
        ["", "Nam", "Nom"],
        ["Thang 1", "12", "45"],
        ["Thang 2", "18", "67"],
        ["Thang 3", "56", "76"],
      ]);
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      downloadXlsxFile(wb, "ColumnChartSample.xlsx");
      break;
    case 4:
      ws = XLSX.utils.aoa_to_sheet([
        ["My Excel Title"],
        ["Label1", "Value1"],
        ["Label2", "Value2"],
        ["Label3", "Value3"],
      ]);
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      downloadXlsxFile(wb, "PieChartSample.xlsx");
      break;

    default:
      return;
  }
};

export default downloadSampleFile;
