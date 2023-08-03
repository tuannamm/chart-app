import React, { memo, useRef, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import * as XLSX from "xlsx";
import { useDispatch } from "react-redux";

import { setChartData } from "../../store/action/chartAction";
import downloadSampleFile from "../../utils/downloadChartSample";
import Toast from "../Toast";

import icons from "../../utils/icons";
import constant from "../../utils/constant";
import "./importModal.scss";

const { BiDownload } = icons;

const ExcelImportModal = ({
  showImportModal,
  setShowImportModal,
  setData,
  chartId,
}) => {
  const dispatch = useDispatch();
  const dropRef = useRef();
  const fileInputRef = useRef();
  const [importedData, setImportedData] = useState(null);

  const downloadXlsxFile = (workbook, fileName) => {
    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "binary" });

    const s2ab = (s) => {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    };

    const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });

    const blobURL = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobURL;
    link.download = fileName;
    link.click();
  };

  const handleFileUpload = (event) => {
    if (chartId === 1 || chartId === 2 || chartId === 5 || chartId === 5) {
      handleLineChartFile(event);
    } else if (chartId === 4) {
      handlePieChartFile(event);
    } else if (chartId === 6) {
      handleColumnChartFile(event);
    }
  };

  const handleLineChartFile = (event) => {
    let file = event.target.files[0];

    if (
      ![
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ].includes(file.type)
    ) {
      Toast("error", "Invalid file input, select an Excel file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const workbook = XLSX.read(bstr, { type: "binary" });

      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];

      const raw_data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const title = raw_data[0][0];
      const labels = raw_data[1].slice(1);
      const series = raw_data.slice(2).map((row) => {
        const name = row[0];
        const data = row.slice(1).map((value) => {
          const parsedValue = parseFloat(value);
          return isNaN(parsedValue) ? undefined : parsedValue;
        });
        if (data.some((value) => value === undefined || value === null)) {
          return null;
        }
        return { name, data };
      });

      if (series.some((serie) => serie === null || serie === undefined)) {
        Toast("error", "Data contains undefined or NaN values");
        return;
      }

      const data = [
        {
          title,
          labels,
          series,
        },
      ];

      setData(data || []);
      setImportedData({ title, labels, series });
      dispatch(setChartData(data));
      setShowImportModal(false);
      Toast("success", "Import successfully!");
    };
    reader.readAsBinaryString(file);
  };

  const handlePieChartFile = (event) => {
    let file = event.target.files[0];
    if (
      ![
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ].includes(file.type)
    ) {
      Toast("error", "Invalid file input, select an Excel file");
      return;
    }
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const workbook = XLSX.read(bstr, { type: "binary" });

      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];

      const raw_data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const title = raw_data[0][0];
      const labels = [];
      const series = [];

      for (let i = 1; i < raw_data.length; i++) {
        const label = raw_data[i][0];
        const value = raw_data[i][1];
        if (
          label === undefined ||
          label === null ||
          value === undefined ||
          value === null
        ) {
          Toast("error", "Data contains undefined or null values");
          return;
        }
        labels.push(label);
        series.push(value);
      }
      const data = [
        {
          title,
          labels,
          series,
        },
      ];

      setData(data);
      dispatch(setChartData(data));
      setShowImportModal(false);
      Toast("success", "Import successfully!");
    };
    reader.readAsBinaryString(file);
  };

  const handleColumnChartFile = (event) => {
    let file = event.target.files[0];

    if (
      ![
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ].includes(file.type)
    ) {
      Toast("error", "Invalid file input, select an Excel file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const workbook = XLSX.read(bstr, { type: "binary" });

      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];

      const raw_data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const title = raw_data[0][0];
      const seriesNames = raw_data[1].slice(1);
      const rows = raw_data.slice(2);

      const series = seriesNames.map((name, index) => {
        const data = rows.map((row) => ({
          x: row[0],
          y: isNaN(row[index + 1]) ? 0 : row[index + 1],
        }));
        return { name, data };
      });

      const data = [
        {
          title,
          series,
        },
      ];

      setData(data);
      dispatch(setChartData(data));
      setShowImportModal(false);
      Toast("success", "Import successfully!");
    };
    reader.readAsBinaryString(file);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropRef.current.classList.add("dragging");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropRef.current.classList.remove("dragging");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropRef.current.classList.remove("dragging");
    fileInputRef.current.files = e.dataTransfer.files;
    handleFileUpload(e);
  };

  return (
    <Modal show={showImportModal} onHide={() => setShowImportModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Import Excel File</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button
          className="btn-download"
          onClick={() => downloadSampleFile(chartId, downloadXlsxFile)}
        >
          <span>
            <BiDownload /> Sample excel file
          </span>
        </Button>
        <div
          className="drag-drop-styling"
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          ref={dropRef}
        >
          <label htmlFor="fileInput">
            <p>
              Drop your excel file from your computer or click{" "}
              <strong>here</strong> to select
            </p>
          </label>
          <input
            id="fileInput"
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowImportModal(false)}>
          {constant.close}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default memo(ExcelImportModal);
