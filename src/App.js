import React from "react";
import "./App.css";
import { Outlet } from "react-router-dom";

// import component
import Header from "./components/Header/header";

const App = () => {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="app-content">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
