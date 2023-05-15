// import library
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import component
import HomePage from "./components/HomePage/homepage";
import App from "./App";

const Layout = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default Layout;
