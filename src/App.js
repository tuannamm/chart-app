import React, { useEffect, useState } from "react";
import "./App.scss";
import { Outlet } from "react-router-dom";

// import component
import Header from "./components/Header/Header";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [loadingScreen, setLoadingScreen] = useState(undefined);

  useEffect(() => {
    setTimeout(() => {
      setLoadingScreen(true);
    }, 1500);
  }, []);

  return (
    <>
      {!loadingScreen ? (
        <LoadingScreen
          className="loading-screen"
          type="bars"
          color="black"
          height={100}
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
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      )}
    </>
  );
};

export default App;
