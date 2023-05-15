import React, { useEffect, useState } from "react";
import "./App.scss";
import { Outlet } from "react-router-dom";

// import component
import Header from "./components/Header/header";
import LoadingScreen from "./components/LoadingScreen/loadingScreen";

const App = () => {
  const [loadingScreen, setLoadingScreen] = useState(undefined);

  useEffect(() => {
    setTimeout(() => {
      setLoadingScreen(true);
    }, 2000);
  }, []);

  return (
    <>
      {!loadingScreen ? (
        <LoadingScreen
          className="loading-screen"
          type="bars"
          color="black"
          height={150}
          width={375}
        />
      ) : (
        <div className="app-container">
          <div className="header-container">
            <Header />
          </div>
          <div className="app-content">
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
};

export default App;
