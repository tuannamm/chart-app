import React, { useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import icons from "../../utils/icons";
import { setChartData } from "../../store/action/chartAction";
import "./importModal.scss";

const { BiDownload } = icons;

function ExcelImportModal({ showImportModal, setShowImportModal, setData }) {
  const dispatch = useDispatch();
  const dropRef = useRef();
  const fileInputRef = useRef();

  const handleFileUpload = (event) => {
    let file = event.target.files[0];

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
      });
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
        <Button className="btn-download" onClick={downloadSampleFile}>
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
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ExcelImportModal;
