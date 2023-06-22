import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import UseAnimations from "react-useanimations";
import settings from "react-useanimations/lib/settings";

const Setting = () => {
  const settingIcon = <UseAnimations animation={settings} size={30} />;
  return (
    <Nav>
      <NavDropdown title={"Setting"} id="basic-nav-dropdown">
        <NavDropdown.Item>Action</NavDropdown.Item>
        <NavDropdown.Item>Another action</NavDropdown.Item>
        <NavDropdown.Item>Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item>Log out</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );
};

export default Setting;
