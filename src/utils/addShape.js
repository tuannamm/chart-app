import { fabric } from "fabric";

export const addShape = (shape, canvasRef) => {
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
      // hình tròn
      newShape = new fabric.Circle({ ...shapeProperties, radius: 50 });
      break;
    case "square":
      // hình vuông
      newShape = new fabric.Rect({
        ...shapeProperties,
        width: 100,
        height: 100,
      });
      break;
    case "triangle":
      // hình tam giác
      newShape = new fabric.Triangle({
        ...shapeProperties,
        width: 100,
        height: 100,
      });
      break;
    case "line":
      // đường thẳng
      newShape = new fabric.Line([50, 100, 200, 200], {
        left: 170,
        top: 150,
        stroke: "black",
        strokeWidth: 2,
      });
      break;
    case "arrow":
      // hình mũi tên
      const line = new fabric.Line([0, 0, 100, 100], {
        left: 150,
        top: 150,
        stroke: "black",
        strokeWidth: 2,
      });

      const arrowHead = new fabric.Triangle({
        left: line.get("x1") + line.get("left"),
        top: line.get("y1") + line.get("top"),
        fill: "black",
        width: 20,
        height: 20,
        selectable: false,
        originX: "center",
        originY: "center",
        hasControls: false,
      });

      arrowHead.set({
        left: line.get("x2") + line.get("left"),
        top: line.get("y2") + line.get("top"),
        angle:
          (Math.atan2(
            line.get("y2") - line.get("y1"),
            line.get("x2") - line.get("x1")
          ) *
            180) /
          Math.PI,
      });

      newShape = new fabric.Group([line, arrowHead], {
        left: 170,
        top: 150,
      });
      break;
    case "text":
      // text
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
    case "tooltip":
      const rect = new fabric.Rect({
        left: 140,
        top: 120,
        width: 90,
        height: 40,
        rx: 10,
        ry: 10,
        hasControls: true,
        fill: "transparent",
        stroke: "black",
        strokeWidth: 2,
      });
      const tooltipTriangle = new fabric.Triangle({
        left: 195,
        top: 120,
        width: 20,
        height: 10,
        angle: 180,
        hasControls: false,
        fill: "transparent",
        stroke: "black",
        strokeWidth: 2,
      });
      newShape = new fabric.Group([rect, tooltipTriangle], {
        left: 100,
        top: 100,
      });
      break;
    default:
      return;
  }
  canvasRef.current.add(newShape);
};
