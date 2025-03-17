import { toast , Slide } from 'react-toastify';

const showToast = ({ success = '', error = '' }) => {
  if (success) {
    toast.success(success, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
      toastId: 'success-toast', // Unique ID for success toasts
    });
  }

  if (error) {
    toast.error(error, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
      toastId: 'error-toast', // Unique ID for error toasts
    });
  }
};


export default showToast;
