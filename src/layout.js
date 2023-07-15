// import library
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

// import component

import App from "./App";

import WelcomePage from "./Pages/WelcomePage";
import Gallery from "./Pages/Gallery/gallery";
import HomePage from "./Pages/HomePage";
import Admin from "./Pages/Admin";
import User from "./Pages/User";

import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/Signup";

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
