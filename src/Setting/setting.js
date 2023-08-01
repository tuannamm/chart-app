import React from "react";
import { useTranslation } from "react-i18next";
import { Nav, NavDropdown } from "react-bootstrap";

const Setting = () => {
  const { i18n } = useTranslation();

  return (
    <Nav>
      <NavDropdown title={"Setting"} id="basic-nav-dropdown">
        <NavDropdown.Item onClick={() => i18n.changeLanguage("en")}>
          English
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => i18n.changeLanguage("vn")}>
          Việt Nam
        </NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );
};

export default Setting;
