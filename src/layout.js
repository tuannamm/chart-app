// import library
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import component
import HomePage from "./components/HomePage/homepage";
import App from "./App";
import SignUp from "./components/Auth/signup";
import Login from "./components/Auth/login";
import Admin from "./components/Admin/admin";
import Gallery from "./components/Gallery/gallery";
import WelcomePage from "./components/Page/WelcomePage/welcomePage";

const Layout = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/home" element={<App />}>
            <Route index element={<HomePage />} />
          </Route>
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
};

export default Layout;
