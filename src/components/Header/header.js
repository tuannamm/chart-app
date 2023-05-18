import "./header.scss";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaChartPie } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };
  return (
    <Navbar bg="light" expand="lg" className="header-container">
      <Container>
        <NavLink to="/" className="nav-link navbar-brand ">
          <FaChartPie size={"2em"} color={"00bfff"} />
          Chart App
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

          <Nav>
            <button className="btn-login" onClick={() => handleLogin()}>
              Log in
            </button>
            <button className="btn-signup" onClick={() => handleSignUp()}>
              Sign up
            </button>

            <NavDropdown title="Setting" id="basic-nav-dropdown">
              <NavDropdown.Item>Action</NavDropdown.Item>
              <NavDropdown.Item>Another action</NavDropdown.Item>
              <NavDropdown.Item>Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
