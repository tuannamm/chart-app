import { useEffect } from "react";
import { fabric } from "fabric";

export const useKeyboardInteractions = (canvasRef) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Backspace") {
        if (canvasRef.current) {
          const activeObject = canvasRef.current.getActiveObject();
          if (
            activeObject &&
            !(activeObject instanceof fabric.IText && activeObject.isEditing)
          ) {
            canvasRef.current.remove(activeObject);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [canvasRef]);
};
