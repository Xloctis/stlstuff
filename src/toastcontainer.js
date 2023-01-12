import React from "react";
import { createPortal } from "react-dom";

import Toast from "./toast";


const ToastContainer = ({ toasts }) => {
    return createPortal(
        <div className='toast'>
            {toasts.map((item, index) => (
                <Toast key={index} id={item.id}   >
                    <h3 className="toastTitle">{item.title}</h3>
                    <div className="toastContent">{item.text}</div>
                </Toast>
            ))}
        </div>,
        document.body
    );
};

export default ToastContainer;
