import { useEffect } from "react";

export const useShapeDrawingMode = (selectedShape, canvasRef) => {
  useEffect(() => {
    if (selectedShape !== "freeDraw" && canvasRef.current) {
      canvasRef.current.isDrawingMode = false;
    }
  }, [selectedShape, canvasRef]);
};
