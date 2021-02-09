import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function SignIn(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
            <div className="ml-auto mb-0 mr-2" style={{cursor: "pointer"}}>
                <button className="link-button text-white" onClick={handleShow}>
                    <i className="bi bi-box-arrow-in-right"></i> Sign In
                </button>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label className="pr-2">Username</Form.Label>
                        <Form.Control
                            placeholder={"Username"}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="pr-2">Password</Form.Label>
                        <Form.Control
                            placeholder={"Password"}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}