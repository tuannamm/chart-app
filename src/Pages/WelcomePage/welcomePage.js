import React from "react";
import { useNavigate } from "react-router-dom";

import "./welcomePage.scss";
import icons from "../../utils/icons";
import constant from "../../utils/constant";

const { FaChartPie } = icons;

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/gallery");
  };

  return (
    <div className="welcome-page-container">
      <div className="welcome-page-content">
        <div>
          {" "}
          <div className="welcome-page-title">
            <FaChartPie
              size={"2em"}
              color={"#00bfff"}
              className="icon-logo rotate-in-down-left"
            />{" "}
            <div className="bounce-in-right"> {constant.app_name}</div>
          </div>
          <div className="welcome-page-desc">{constant.description}</div>
          <div className="grow">
            <button className="btn-welcome" onClick={handleClick}>
              {constant.get_started}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
