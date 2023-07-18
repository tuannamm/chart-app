import { useEffect } from "react";

export const useCanvasDoubleClick = (
  canvasRef,
  setSelectedShapeObject,
  setShapeStrokeWidth,
  setShapeColor,
  setShapeModalVisible
) => {
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.on("mouse:dblclick", function (event) {
        if (event.target) {
          setSelectedShapeObject(event.target);
          setShapeStrokeWidth(event.target.width);
          setShapeColor(event.target.fill);
          setShapeModalVisible(true);
        }
      });
    }

    return () => {
      if (canvasRef.current) {
        canvasRef.current.off("mouse:dblclick");
      }
    };
  });
};
