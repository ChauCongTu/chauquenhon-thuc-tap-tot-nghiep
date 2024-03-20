import toast from 'react-hot-toast';

const showError = (errors: any) => {

    Object.keys(errors.message).forEach(key => {
        const errorMessages = errors.message[key];
        if (Array.isArray(errorMessages)) {
            errorMessages.forEach(errorMessage => {
                toast.error(errorMessage);
            });
        } else {
            toast.error(errorMessages);
        }
    });
};

export default showError