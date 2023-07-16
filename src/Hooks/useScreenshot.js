// hooks/useScreenshot.js
import { useScreenshot } from "use-react-screenshot";
import { toast } from "react-toastify";

export function useScreenShot(chartRef) {
  const [image, takeScreenshot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
  });

  const screenshot = () => {
    takeScreenshot(chartRef.current);
    toast.success("Screenshot taken successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return screenshot;
}
