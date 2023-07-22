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
        ["", "Label 1", "Label 2"],
        ["Dataset 1", "Value", "Value"],
        ["Dataset 2", "Value", "Value"],
      ]);
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      downloadXlsxFile(wb, "LineChartSample.xlsx");
      break;
    case 3:
    case 6:
      ws = XLSX.utils.aoa_to_sheet([
        ["My Excel Title"],
        ["", "Dataset 1", "Dataset 2"],
        ["Label 1", "Value", "Value"],
        ["Label 2", "Value", "Value"],
        ["Label 3", "Value", "Value"],
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
