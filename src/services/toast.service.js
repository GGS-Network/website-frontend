import { useToast } from "vue-toastification"

const toast = useToast()

export const toastService = {
    success(message) {
        toast.success(message)
    },
    error(message) {
        toast.error(message)
    },
    info(message) {
        toast.info(message)
    },
    warning(message) {
        toast.warning(message)
    }
}

export default toastService 