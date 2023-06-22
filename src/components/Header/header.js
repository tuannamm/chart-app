import "./header.scss";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-bootstrap";
import { FaChartPie } from "react-icons/fa";

import Setting from "../Setting/setting";

const Header = () => {
  return (
    <Navbar bg="light" expand="lg" className="header-container">
      <Container>
        <NavLink to="/home" className="nav-link navbar-brand ">
          <FaChartPie size={"2em"} color={"00bfff"} /> Chart App
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink href="/user" className="nav-link">
              User
            </NavLink>
            <NavLink href="/admin" className="nav-link">
              Admin
            </NavLink>
            <NavLink href="/gallery" className="nav-link">
              Gallery
            </NavLink>
          </Nav>
          <Setting />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
