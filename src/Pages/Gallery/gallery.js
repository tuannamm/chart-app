import React, { useEffect, useState } from "react";

import "./gallery.scss";
import "../../components/Header/header.scss";
import { NavLink, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Container, Nav, Navbar } from "react-bootstrap";

import Setting from "../../Setting/setting";
import Spinner from "../../components/AtomicSpinner/AtomicSpinner";
import constant from "../../utils/constant";
import icons from "../../utils/icons";

const { FaChartPie } = icons;

const chartListData = [
  {
    id: 1,
    img: "avc",
    title: "LINE",
    url: "https://res.cloudinary.com/dgd57kdbo/image/upload/v1686807160/line_hgbnnk.png",
  },
  {
    id: 2,
    img: "avc",
    title: "AREA",
    url: "https://res.cloudinary.com/dgd57kdbo/image/upload/v1686807369/area_fxvdbf.png",
  },
  {
    id: 3,
    img: "avc",
    title: "COLUMN",
    url: "https://res.cloudinary.com/dgd57kdbo/image/upload/v1686798924/Screenshot_from_2023-06-15_10-15-06_hbzseg.png",
  },
  {
    id: 4,
    img: "avc",
    title: "BAR",
    url: "https://res.cloudinary.com/dgd57kdbo/image/upload/v1686807289/bar_twq9sx.png",
  },
  {
    id: 5,
    img: "avc",
    title: "MIXED",
    url: "https://res.cloudinary.com/dgd57kdbo/image/upload/v1686799291/mixed_npae4s.png",
  },
  {
    id: 6,
    img: "avc",
    title: "RANGE AREA",
    url: "https://res.cloudinary.com/dgd57kdbo/image/upload/v1686799435/rangeArea_xyelt7.png",
  },
];

const Gallery = () => {
  const navigate = useNavigate();
  const [loadingScreen, setLoadingScreen] = useState(undefined);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  useEffect(() => {
    setTimeout(() => {
      setLoadingScreen(true);
    }, 1500);
  }, []);

  return (
    <>
      {!loadingScreen ? (
        <div className="spinner">
          <Spinner electronColorPalette="rgb(0, 191, 255)" />
        </div>
      ) : (
        <>
          <Navbar bg="light" expand="lg" className="header-container">
            <Container>
              <NavLink to="/" className="nav-link navbar-brand ">
                <FaChartPie size={"2em"} color={"00bfff"} />
                {constant.app_name}
              </NavLink>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto"></Nav>
                <Nav>
                  <button className="btn-login" onClick={() => handleLogin()}>
                    {constant.log_in}
                  </button>
                  <button className="btn-signup" onClick={() => handleSignUp()}>
                    {constant.sign_up}
                  </button>
                  <Setting />
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <div className="card-chart-container bounce">
            <div className="list-chart">
              {chartListData &&
                chartListData.map((chart) => (
                  <Card
                    style={{ width: "25rem", height: "20rem" }}
                    key={chart.id}
                    onClick={() =>
                      navigate("/home", {
                        state: {
                          chartId: chart?.id,
                        },
                      })
                    }
                    className="card-chart"
                  >
                    <Card.Img
                      className="chart-image"
                      variant="top"
                      src={chart?.url}
                    />
                    <Card.Body>
                      <Card.Title>{chart?.title}</Card.Title>
                    </Card.Body>
                  </Card>
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Gallery;
