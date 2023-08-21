import React, { memo } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-bootstrap";

import constant from "../../utils/constant";
import Setting from "../../Setting/setting";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  return (
    <div>
      <Navbar bg="white" expand="md" className="header-container">
        <Container>
          <Link to="/" className="nav-link navbar-brand ">
            <img
              src="https://res.cloudinary.com/dgd57kdbo/image/upload/f_auto,q_auto/gsebpvlmuutrkbsw1rs1"
              alt=""
              style={{ width: "18.75rem" }}
            />
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/gallery" className="nav-link">
                {constant.gallery}
              </Link>
            </Nav>
            {/* <Setting /> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default memo(NavBar);
