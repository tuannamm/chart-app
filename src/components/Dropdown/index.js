import Dropdown from "react-bootstrap/Dropdown";

import icons from "../../utils/icons";
import "./dropdown.scss";
import { addShape } from "../../utils/addShape";
import { memo } from "react";

const {
  IoTextOutline,
  BsCircle,
  BsSquare,
  BsTriangle,
  BsPencil,
  GiStraightPipe,
  BiRectangle,
  MdArrowForward,
  IoShapesOutline,
  GrTooltip,
} = icons;

const DropdownAnnotate = ({
  setSelectedShape,
  handleButtonClick,
  canvasRef,
}) => {
  return (
    <Dropdown
      onSelect={(selectedKey) => {
        setSelectedShape(selectedKey);
        addShape(selectedKey, canvasRef);
      }}
      onClick={handleButtonClick}
    >
      <Dropdown.Toggle
        className="toggle-dropdown"
        style={{ backgroundColor: "white" }}
      >
        <span>
          <IoShapesOutline /> Annotation
        </span>
        <span>
          <IoShapesOutline />
        </span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="circle">
          <BsCircle /> Circle
        </Dropdown.Item>
        <Dropdown.Item eventKey="square">
          <BsSquare /> Square
        </Dropdown.Item>
        <Dropdown.Item eventKey="triangle">
          <BsTriangle /> Triangle
        </Dropdown.Item>
        <Dropdown.Item eventKey="freeDraw">
          <BsPencil /> Free Draw
        </Dropdown.Item>
        <Dropdown.Item eventKey="arrow">
          <MdArrowForward /> Arrow
        </Dropdown.Item>
        <Dropdown.Item eventKey="line">
          <GiStraightPipe /> Line
        </Dropdown.Item>
        <Dropdown.Item eventKey="rectangle">
          <BiRectangle /> Rectangle
        </Dropdown.Item>
        <Dropdown.Item eventKey="text">
          <IoTextOutline /> Text
        </Dropdown.Item>
        <Dropdown.Item eventKey="tooltip">
          <GrTooltip /> Tooltip
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default memo(DropdownAnnotate);
