import { useEffect } from "react";

export const useClearCanvas = (isCanvasVisible, canvasRef) => {
  useEffect(() => {
    if (isCanvasVisible) return;
    const allCanvases = document.getElementsByTagName("canvas");
    while (allCanvases.length > 0) {
      allCanvases[0].parentNode.removeChild(allCanvases[0]);
    }
    canvasRef.current = null;
  }, [isCanvasVisible, canvasRef]);
};
