import Toast from "react-bootstrap/Toast";
import React, {useState} from "react";

function CustomToast(props) {
    const [show, setShow] = useState(true);

    function handleClose() {
        setShow(false);
        props.onClose(props.id);
    }

    return (
        <Toast
            key={props.id}
            delay={1500}
            autohide
            onClose={handleClose}
            show={show}
            className="text-dark"
            style={{minWidth: "300px"}}
        >
            <Toast.Header>
                <strong className="mr-auto">{props.header}</strong>
            </Toast.Header>
            <Toast.Body>{props.text}</Toast.Body>
        </Toast>
    )
}

export default CustomToast;