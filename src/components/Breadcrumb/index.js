import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";

import typeChart from "../../utils/typeChart";

import "./breadcrumb.scss";

const BreadcrumbComponent = ({ chartId }) => {
  const chart = typeChart(chartId.id);

  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to="/gallery">Gallery</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item active>{chart}</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;
