import { useToast } from 'vue-toastification';

const toast = useToast();

export const toastService = {
  success(message) {
    toast.success(message, {
      timeout: 3000,
      position: "top-right",
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored"
    });
  },

  error(message) {
    toast.error(message, {
      timeout: 5000,
      position: "top-right",
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored"
    });
  },

  warning(message) {
    toast.warning(message, {
      timeout: 4000,
      position: "top-right",
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored"
    });
  },

  info(message) {
    toast.info(message, {
      timeout: 3000,
      position: "top-right",
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored"
    });
  },

  sessionExpired() {
    toast.error("Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.", {
      timeout: false,
      position: "top-center",
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      theme: "colored"
    });
  }
}; 