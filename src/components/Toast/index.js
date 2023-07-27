import { memo } from "react";
import { toast } from "react-toastify";

const Toast = (type, message) => {
  const toastOptions = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  switch (type) {
    case "success":
      return toast.success(message, toastOptions);
    case "error":
      return toast.error(message, toastOptions);
    case "info":
      return toast.info(message, toastOptions);
    case "warning":
      return toast.warning(message, toastOptions);
    default:
      return toast(message, toastOptions);
  }
};

export default memo(Toast);
