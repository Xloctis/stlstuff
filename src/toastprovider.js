import React, { useState, useContext, useCallback } from "react";
import ToastContainer from "./toastcontainer";
const ToastContext = React.createContext(null);


const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);
    let id = 0;

    const addToast = useCallback(
        content => {
            setToasts(toasts => [
                ...toasts,
                {
                    id: id++,
                    text: content.text,
                    title: content.title
                }
            ]);
        },
        [setToasts]
    );

    const removeToast = useCallback(
        id => {
            setToasts(toasts => toasts.filter(t => t.id !== id));
        },
        [setToasts]
    );

    return (
        <ToastContext.Provider
            value={{
                addToast,
                removeToast
            }}
        >
            <ToastContainer toasts={toasts} />
            {children}
        </ToastContext.Provider>
    );
};

const useToast = () => {
    const toastHelpers = useContext(ToastContext);

    return toastHelpers;
};

export { ToastContext, useToast };
export default ToastProvider;
