import "./gallery.scss";
import "../Header/header.scss";
import { NavLink, useNavigate } from "react-router-dom";

import Card from "react-bootstrap/Card";
import { FaChartPie } from "react-icons/fa";
import { Navbar } from "react-bootstrap";

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

  return (
    <>
      <Navbar bg="light" expand="lg" className="header-container">
        <NavLink to="/" className="nav-link navbar-brand ">
          <FaChartPie size={"2em"} color={"00bfff"} />
          Chart App
        </NavLink>
      </Navbar>
      <div className="card-chart-container">
        {chartListData &&
          chartListData.map((chart) => (
            <Card
              style={{ width: "25rem", height: "20rem" }}
              key={chart.id}
              onClick={() =>
                navigate("/", {
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
