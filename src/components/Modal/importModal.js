import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";

import "./importModal.scss";
import { useDispatch } from "react-redux";
import { setChartData } from "../../store/action/chartAction";

function DragDrop({ handleFile }) {
  const [drag, setDrag] = useState(false);

  const dragOver = (e) => {
    e.preventDefault();
    setDrag(true);
  };

  const dragEnter = (e) => {
    e.preventDefault();
    setDrag(true);
  };

  const dragLeave = (e) => {
    e.preventDefault();
    setDrag(false);
  };

  const fileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFile(files);
    }
    setDrag(false);
  };

  return (
    <div
      className={`drag-drop-styling ${drag ? "dragging" : ""}`}
      onDragOver={dragOver}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDrop={fileDrop}
    >
      Drag &amp; Drop your Excel file here or click to select file
      <input type="file" onChange={(e) => handleFile(e.target.files)} />
    </div>
  );
}

function ExcelImportModal({
  showImportModal,
  setShowImportModal,
  setData,
  chartId,
}) {
  const dispatch = useDispatch();

  const fileHandler = (files) => {
    let file = files[0];

    if (
      ![
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ].includes(file.type)
    ) {
      toast.error("Invalid file input, select an Excel file", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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
        const data = row.slice(1);
        return { name, data };
      });

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
      toast.success("Import successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    };

    reader.readAsBinaryString(file);
  };

  const downloadSampleFile = () => {
    const ws = XLSX.utils.aoa_to_sheet([
      ["My Excel Title"],
      ["", "Label1", "Label2"],
      ["Dataset1", "Value", "Value"],
      ["Dataset2", "Value", "Value"],
    ]);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

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
    link.download = "sample.xlsx";
    link.click();
  };

  return (
    <Modal show={showImportModal} onHide={() => setShowImportModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Import Excel File</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button onClick={downloadSampleFile} style={{ marginTop: "10px" }}>
          Download Sample Excel File
        </Button>
        <DragDrop handleFile={fileHandler} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowImportModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ExcelImportModal;
