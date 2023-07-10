import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import "./buttonGroup.scss";

const GroupButton = ({ title, setLineStyle }) => {
  return (
    <ButtonGroup size="sm" className="button-group">
      <label style={{ marginRight: "5px" }}>{title}</label>
      <Button variant="light" onClick={() => setLineStyle("smooth")}>
        Smooth
      </Button>
      <Button variant="light" onClick={() => setLineStyle("straight")}>
        Straight
      </Button>
      <Button variant="light" onClick={() => setLineStyle("stepline")}>
        Stepline
      </Button>
    </ButtonGroup>
  );
};

export default GroupButton;
