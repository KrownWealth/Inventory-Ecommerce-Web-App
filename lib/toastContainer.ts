import { toast, ToastContainer, Slide, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type NotificationMessageType = {
  message: string;
};

const toastNotification = (
  type: "info" | "success" | "warn" | "error",
  position: ToastOptions["position"] = "top-right",
  autoClose: number | false | undefined = 2500,
  options: NotificationMessageType
) => {
  toast.dismiss(); // Dismiss any existing toasts

  toast[type](options.message, {
    toastId: `notification-${type}`,
    position: position,
    autoClose: autoClose !== undefined ? autoClose : 2500,
    transition: Slide,
    hideProgressBar: true,
    icon: false,
    theme: "colored",
  });
};

export { toastNotification, ToastContainer, toast };
