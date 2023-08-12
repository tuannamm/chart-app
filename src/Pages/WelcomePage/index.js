import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Container, NavLink, Navbar } from "react-bootstrap";

import "./welcomePage.scss";
import constant from "../../utils/constant";
import icons from "../../utils/icons";

const { AiFillLinkedin, AiFillGithub } = icons;

const WelcomePage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/gallery");
  };

  return (
    <div>
      <Navbar bg="white" expand="lg" className="header-container">
        <Container className="container">
          <NavLink to="/" className="nav-link navbar-brand">
            <img
              src="https://res.cloudinary.com/dgd57kdbo/image/upload/f_auto,q_auto/gsebpvlmuutrkbsw1rs1"
              alt=""
              style={{ width: "18.75rem" }}
            />
          </NavLink>
          <NavLink style={{ display: "flex", gap: "10px", padding: "10px" }}>
            <h4 style={{ color: "gray" }}>By Tuan Nam</h4>
            <span style={{ fontSize: "20px" }}>
              <AiFillLinkedin />
            </span>
            <span style={{ fontSize: "20px" }}>
              <AiFillGithub />
            </span>
            <span></span>
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Container>
      </Navbar>
      <div className="welcome-page-content">
        <div className="image-1">
          <img
            src="https://res.cloudinary.com/dgd57kdbo/image/upload/f_auto,q_auto/qttbvljxfvpafm1iauw5"
            alt=""
            style={{ width: "750px", padding: "30px" }}
            className="bounce-in-right"
          />
          <div>
            <button className="btn-welcome" onClick={handleClick}>
              {constant.get_started}
            </button>
          </div>
        </div>

        <div className="image-2">
          <img
            src="https://res.cloudinary.com/dgd57kdbo/image/upload/f_auto,q_auto/jp9uif2ee8wfgq7o1lke"
            alt=""
            style={{ width: "800px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(WelcomePage);
