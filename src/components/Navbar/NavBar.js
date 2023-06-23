import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-bootstrap";

import icons from "../../utils/icons";
import constant from "../../utils/constant";
import Setting from "../../Setting/setting";

const { FaChartPie } = icons;

const NavBar = (props) => {
  const { title, user, admin, gallery } = props;
  return (
    <div>
      {" "}
      <Navbar bg="light" expand="lg" className="header-container">
        <Container>
          <NavLink to="/home" className="nav-link navbar-brand ">
            <FaChartPie size={"2em"} color={"00bfff"} /> {constant.app_name}
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink href="/user" className="nav-link">
                {constant.user}
              </NavLink>
              <NavLink href="/admin" className="nav-link">
                {constant.admin}
              </NavLink>
              <NavLink href="/gallery" className="nav-link">
                {constant.gallery}
              </NavLink>
            </Nav>
            <Setting />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
