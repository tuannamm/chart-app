import React, { memo } from "react";

import { useExportExcel } from "../../Hooks/useExportExcel";

import icons from "../../utils/icons";
import constant from "../../utils/constant";

const { BiDownload, BiImport, BiExport } = icons;

const ButtonRight = ({
  setShowImportModal,
  downloadScreenshot,
  isCanvasVisible,
  handleRemoveCanvas,
  data,
  chartId,
}) => {
  const { exportData } = useExportExcel(chartId);

  return (
    <div style={{ display: "flex" }}>
      <button className="btn" onClick={() => setShowImportModal(true)}>
        <span>
          <BiImport className="icons text" /> {constant.import_data}
        </span>
        <span>
          <BiImport className="icons text" />
        </span>
      </button>
      <button className="btn" onClick={() => exportData(data)}>
        <span>
          <BiExport className="icons text" /> {constant.export_data}
        </span>
        <span>
          <BiExport className="icons text" />
        </span>
      </button>
      <button className="btn" onClick={downloadScreenshot}>
        <span>
          <BiDownload className="icons text" /> {constant.download}
        </span>
        <span>
          <BiDownload className="icons text" />
        </span>
      </button>
      {isCanvasVisible && (
        <button className="btn cancel" onClick={handleRemoveCanvas}>
          {constant.cancel}
        </button>
      )}
    </div>
  );
};

export default memo(ButtonRight);
