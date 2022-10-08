import {toast} from "react-toastify";

function ToastError(error) {
    if(error.response.data && error.response.data !== '')
        toast.error(error.response.data);
    else
        toast.error('خطایی رخ داد!');
}

export default ToastError;