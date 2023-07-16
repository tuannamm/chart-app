// hooks/useCanvas.js
import { useEffect, useRef } from "react";
import { fabric } from "fabric";

export function useCanvas(isCanvasVisible, chartRef) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (isCanvasVisible && chartRef.current) {
      const fabricCanvas = document.createElement("canvas");
      fabricCanvas.id = "fabric-canvas";
      fabricCanvas.style.position = "absolute";
      fabricCanvas.style.top = "0";
      fabricCanvas.style.left = "0";
      fabricCanvas.width = chartRef.current.clientWidth;
      fabricCanvas.height = chartRef.current.clientHeight;
      fabricCanvas.style.zIndex = "1000";

      chartRef.current.appendChild(fabricCanvas);

      const canvas = new fabric.Canvas("fabric-canvas");

      canvas.setBackgroundColor("rgba(0,0,0,0)", canvas.renderAll.bind(canvas));

      canvasRef.current = canvas;
    }

    return () => {
      if (chartRef.current) {
        const allCanvases = document.getElementsByTagName("canvas");
        while (allCanvases.length > 0) {
          allCanvases[0].parentNode.removeChild(allCanvases[0]);
        }
        canvasRef.current = null;
      }
    };
  }, [isCanvasVisible, chartRef]);

  return canvasRef;
}
