import React, { useEffect } from "react";
import { useToast } from "./toastprovider";

const Toast = ({ children, id }) => {
    const { removeToast } = useToast();
    const ref = React.useRef();

    useEffect(() => {
        const timer = setTimeout(() => {
            ref.current.classList.add('removeToast')

        }, 4600);
        setTimeout(() => {
            removeToast(id);
        }, 5100);
        return () => {
            clearTimeout(timer);
        };


    }, [id, removeToast]);

    return <div ref={ref} className="toastBody">{children}</div>;
};

export default Toast;