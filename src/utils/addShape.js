import { fabric } from "fabric";

const addShape = ({ shape, canvasRef }) => {
  if (!canvasRef.current) return;

  let newShape;
  const shapeProperties = {
    left: 100,
    top: 100,
    hasControls: true,
    fill: "transparent",
    stroke: "black",
    strokeWidth: 2,
  };

  switch (shape) {
    case "circle":
      newShape = new fabric.Circle({ ...shapeProperties, radius: 50 });
      break;
    case "square":
      newShape = new fabric.Rect({
        ...shapeProperties,
        width: 100,
        height: 100,
      });
      break;
    case "triangle":
      newShape = new fabric.Triangle({
        ...shapeProperties,
        width: 100,
        height: 100,
      });
      break;
    case "line":
      newShape = new fabric.Line([50, 100, 200, 200], {
        left: 170,
        top: 150,
        stroke: "black",
        strokeWidth: 2,
      });
      break;
    case "arrow":
      newShape = new fabric.Line([50, 100, 200, 200], {
        left: 170,
        top: 150,
        stroke: "black",
        strokeWidth: 2,
      });
      let triangle = new fabric.Triangle({
        left: newShape.x2,
        top: newShape.y2,
        angle: -45,
        width: 20,
        height: 20,
        fill: "black",
      });
      canvasRef.current.add(newShape, triangle);
      break;
    case "text":
      newShape = new fabric.IText("Hello, World!", {
        left: 100,
        top: 100,
        fontSize: 30,
        editable: true,
      });
      break;
    case "freeDraw":
      canvasRef.current.isDrawingMode = true;
      canvasRef.current.freeDrawingBrush.width = 5;
      canvasRef.current.freeDrawingBrush.color = "#000000";
      return;
    case "rectangle":
      newShape = new fabric.Rect({
        ...shapeProperties,
        width: 200,
        height: 100,
      });
      break;
    default:
      return;
  }

  canvasRef.current.add(newShape);
};

export default addShape;
