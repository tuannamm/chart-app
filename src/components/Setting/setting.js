import { Nav, NavDropdown } from "react-bootstrap";

const Setting = () => {
  return (
    <Nav>
      <NavDropdown title="Setting" id="basic-nav-dropdown">
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
