// hooks/useShape.js
import { useState, useEffect } from "react";
import { fabric } from "fabric";

export function useShape(canvasRef, data) {
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    if (canvasRef.current) {
      data.forEach((shapeData) => {
        const shape = new fabric.Rect({
          top: shapeData.top,
          left: shapeData.left,
          width: shapeData.width,
          height: shapeData.height,
          fill: shapeData.fill,
        });
        canvasRef.current.add(shape);
        setShapes((prevShapes) => [...prevShapes, shape]);
      });
    }

    return () => {
      setShapes([]);
    };
  }, [canvasRef, data]);

  return shapes;
}
