import CustomToast from "./CustomToast";
import React from "react";

function Toasts(props) {
    const toasts = props.toasts.map((toast, index) => {
        return (
            <CustomToast
                key={index}
                id={index}
                header={toast.header}
                text={toast.text}
                onClose={handleClose}
            />
        )
    });

    function handleClose(id) {
        props.onToastClose(id);
    }

    return (
        <div id="alert-box" role="alert" aria-live="assertive" aria-atomic="true">
            <div id="toast-container">
                {toasts}
            </div>
        </div>
    );
}

export default Toasts;