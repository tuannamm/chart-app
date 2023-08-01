import React, { memo } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-bootstrap";

import icons from "../../utils/icons";
import constant from "../../utils/constant";
import Setting from "../../Setting/setting";
import { Link } from "react-router-dom";

const { FaChartPie } = icons;

const NavBar = (props) => {
  return (
    <div>
      <Navbar bg="white" expand="md" className="header-container">
        <Container>
          <NavLink to="/home" className="nav-link navbar-brand ">
            <FaChartPie size={"2em"} color={"00bfff"} /> {constant.app_name}
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/gallery" className="nav-link">
                {constant.gallery}
              </Link>
            </Nav>
            <Setting />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default memo(NavBar);
