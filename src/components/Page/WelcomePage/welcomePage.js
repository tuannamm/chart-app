import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChartPie } from "react-icons/fa";
import { IoIosPie } from "react-icons/io";

import "./welcomePage.scss";

const WelcomePage = () => {
  const navigate = useNavigate();
  const [transformed, setTransformed] = useState(false);

  const handleClick = () => {
    navigate("/gallery");
  };

  useEffect(() => {
    setTransformed(true);
    setTimeout(() => {
      setTransformed(false);
    }, 2000);
  }, []);

  return (
    <div className="welcome-page-container">
      <div className="welcome-page-title">
        {transformed ? (
          <IoIosPie size={"2em"} color={"#00bfff"} className="icon-logo" />
        ) : (
          <FaChartPie size={"2em"} color={"#00bfff"} className="icon-logo" />
        )}{" "}
        Chart App
      </div>
      <div className="welcome-page-desc">
        Modern & Interactive Open-source Charts
      </div>
      <div className="">
        <button className="btn-welcome" onClick={handleClick}>
          GET STARTED
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
