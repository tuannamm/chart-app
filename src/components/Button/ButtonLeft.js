import React, { memo } from "react";
import { useSelector } from "react-redux";

import DropdownAnnotate from "../Dropdown";
import constant from "../../utils/constant";
import icons from "../../utils/icons";

const { BiData, AiOutlineSetting } = icons;

const ButtonLeft = ({
  setSelectedShape,
  handleButtonClick,
  handleShowDataModal,
  handleShowPropertyModal,
  canvasRef,
}) => {
  const dataChart = useSelector((state) => state?.chartDataReducer.data);

  return (
    <div style={{ display: "flex" }}>
      <DropdownAnnotate
        setSelectedShape={setSelectedShape}
        handleButtonClick={handleButtonClick}
        canvasRef={canvasRef}
      />
      <button className="btn" onClick={handleShowDataModal}>
        <span>
          <BiData className="icons text" /> {constant.data}
        </span>
        <span>
          <BiData className="icons text" />
        </span>
      </button>
      {dataChart && dataChart[0]?.series.length >= 10 && (
        <button className="btn" onClick={handleShowPropertyModal}>
          <span>
            <AiOutlineSetting className="icons text" /> Properties
          </span>
          <span>
            <AiOutlineSetting className="icons text" />
          </span>
        </button>
      )}
    </div>
  );
};

export default memo(ButtonLeft);
