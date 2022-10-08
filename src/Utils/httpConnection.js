import axios from "axios";
import ToastError from "./toastError";

axios.interceptors.response.use(null, error => {
        ToastError(error);

    return Promise.reject(error);
});

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};