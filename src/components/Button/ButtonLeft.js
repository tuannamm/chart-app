import React from "react";

import DropdownAnnotate from "../Dropdown";
import constant from "../../utils/constant";
import icons from "../../utils/icons";

const { BiData } = icons;

const ButtonLeft = ({
  setSelectedShape,
  handleButtonClick,
  handleShowDataModal,
  canvasRef,
}) => {
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
    </div>
  );
};

export default ButtonLeft;
