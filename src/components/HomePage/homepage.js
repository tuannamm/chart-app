import React, { useEffect, useState } from "react";
import "./homepage.scss";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <div className="feature-button">
        <div className="feature-button-left">
          <button className="btn">Annotate</button>
          <button className="btn">Properties</button>
          <button className="btn">Data</button>
        </div>
        <div className="feature-button-right">
          <button className="btn ">Import data</button>
          <button className="btn">Download</button>
        </div>
      </div>
      <div className="chart-container"></div>
    </div>
  );
};

export default HomePage;
