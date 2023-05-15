import React, { useEffect, useState } from "react";
import "./homepage.scss";

import LoadingScreen from "../LoadingScreen/loadingScreen";

const HomePage = () => {
  const [loadingScreen, setLoadingScreen] = useState(undefined);

  useEffect(() => {
    setTimeout(() => {
      setLoadingScreen(true);
    }, 2000);
  }, []);

  return (
    <div className="homepage-container">
      {!loadingScreen ? (
        <LoadingScreen
          className="loading-screen"
          type="bars"
          color="black"
          height={150}
          width={375}
        />
      ) : (
        <h1>Hello</h1>
      )}
    </div>
  );
};

export default HomePage;
