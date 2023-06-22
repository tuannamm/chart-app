import React from "react";
import { useNavigate } from "react-router-dom";
import { FaChartPie } from "react-icons/fa";

import "./welcomePage.scss";

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/gallery");
  };

  return (
    <div className="welcome-page-container">
      <div className="welcome-page-title">
        <FaChartPie
          size={"2em"}
          color={"#00bfff"}
          className="icon-logo rotate-in-down-left"
        />
        <div className="bounce-in-right"> Chart App</div>
      </div>
      <div className="welcome-page-desc">
        Modern & Interactive Open-source Charts
      </div>
      <div className="grow">
        <button className="btn-welcome" onClick={handleClick}>
          GET STARTED
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
