import { useCallback } from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";

export const useExportExcel = (chartId) => {
  const exportData = useCallback(
    async (data) => {
      const workbook = new ExcelJS.Workbook();

      if (chartId === 1 || chartId === 2) {
        data.forEach((datum, index) => {
          const worksheet = workbook.addWorksheet(`Sheet ${index + 1}`);

          worksheet.addRow([datum.title]);

          const labelRow = worksheet.addRow([""].concat(datum.labels));

          labelRow.eachCell((cell) => {
            cell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "FFFFFF00" },
            };

            cell.font = {
              bold: true,
            };

            cell.border = {
              top: { style: "thin" },
              left: { style: "thin" },
              bottom: { style: "thin" },
              right: { style: "thin" },
            };
          });

          datum.series.forEach((serie) => {
            worksheet.addRow([serie.name].concat(serie.data));
          });
        });
      }

      if (chartId === 4) {
        data.forEach((datum, index) => {
          const worksheet = workbook.addWorksheet(`Sheet ${index + 1}`);

          const titleRow = worksheet.addRow([datum.title]);
          titleRow.font = { size: 16, bold: true };

          for (let i = 0; i < datum.labels.length; i++) {
            worksheet.addRow([datum.labels[i], datum.series[i]]);
          }

          const headerRow = worksheet.getRow(3);
          headerRow.eachCell((cell) => {
            cell.font = {
              bold: true,
            };

            cell.border = {
              top: { style: "thin" },
              left: { style: "thin" },
              bottom: { style: "thin" },
              right: { style: "thin" },
            };
          });
        });
      }

      if (chartId === 3 || chartId === 6) {
        data.forEach((datum, index) => {
          const worksheet = workbook.addWorksheet(`Sheet ${index + 1}`);

          const titleRow = worksheet.addRow([datum.title]);
          titleRow.font = { size: 16, bold: true };

          const allMonths = new Set();
          datum.series.forEach((serie) => {
            serie.data.forEach((datapoint) => {
              allMonths.add(datapoint.x);
            });
          });
          const headerRow = worksheet.addRow(["", ...Array.from(allMonths)]);

          datum.series.forEach((serie) => {
            let row = Array(allMonths.size + 1).fill("");
            row[0] = serie.name;
            serie.data.forEach((datapoint) => {
              let index = Array.from(allMonths).indexOf(datapoint.x) + 1;
              row[index] = datapoint.y;
            });
            worksheet.addRow(row);
          });

          headerRow.eachCell((cell) => {
            cell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "FFFFFF00" },
            };

            cell.font = {
              bold: true,
            };

            cell.border = {
              top: { style: "thin" },
              left: { style: "thin" },
              bottom: { style: "thin" },
              right: { style: "thin" },
            };
          });
        });
      }

      const buffer = await workbook.xlsx.writeBuffer();

      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, `${data[0].title}.xlsx`);
      toast.success("Export successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
    [chartId]
  );

  return { exportData };
};
