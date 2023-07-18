import { useScreenshot } from "use-react-screenshot";
import { toast } from "react-toastify";

export const useDownload = (chartRef, data) => {
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
  });

  const createFileName = (extension, name) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");

    return `${name}_${date}/${month}/${year}.${extension}`;
  };

  const download = (
    image,
    { name = `${data[data.length - 1]?.title}`, extension = "jpg" } = {}
  ) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const downloadScreenshot = async () => {
    await takeScreenShot(chartRef.current).then(download);
    toast.success("Download successfully!", {
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

  return downloadScreenshot;
};
