import "./gallery.scss";
import "../Header/header.scss";
import { NavLink, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { FaChartPie } from "react-icons/fa";
import { Container, Nav, Navbar } from "react-bootstrap";

import Setting from "../Setting/setting";

const chartListData = [
  {
    id: 1,
    img: "avc",
    title: "LINE",
  },
  {
    id: 2,
    img: "avc",
    title: "AREA",
  },
  {
    id: 3,
    img: "avc",
    title: "COLUMN",
  },
  {
    id: 4,
    img: "avc",
    title: "BAR",
  },
  {
    id: 5,
    img: "avc",
    title: "MIXED",
  },
  {
    id: 6,
    img: "avc",
    title: "RANGE AREA",
  },
];

const Gallery = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="header-container">
        <Container>
          <NavLink to="/" className="nav-link navbar-brand ">
            <FaChartPie size={"2em"} color={"00bfff"} />
            Chart App
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <button className="btn-login" onClick={() => handleLogin()}>
                Log in
              </button>
              <button className="btn-signup" onClick={() => handleSignUp()}>
                Sign up
              </button>
              <Setting />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="card-chart-container">
        {chartListData &&
          chartListData.map((chart) => (
            <Card
              style={{ width: "25rem", height: "20rem" }}
              key={chart.id}
              onClick={() =>
                navigate("/home", {
                  state: {
                    chartId: chart.id,
                  },
                })
              }
              className="card-chart"
            >
              <Card.Img className="chart-image" variant="top" src="" />
              <Card.Body>
                <Card.Title>{chart.title}</Card.Title>
              </Card.Body>
            </Card>
          ))}
      </div>
    </>
  );
};

export default Gallery;
