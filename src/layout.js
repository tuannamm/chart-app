// import library
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import component
import HomePage from "./components/HomePage/homepage";
import App from "./App";
import SignUp from "./components/Auth/signup";
import Login from "./components/Auth/login";

import WelcomePage from "./Pages/WelcomePage/welcomePage";
import Admin from "./Pages/Admin/admin";
import User from "./Pages/User/user";
import Gallery from "./Pages/Gallery/gallery";

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
          <Route path="/user" element={<User />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
};

export default Layout;
