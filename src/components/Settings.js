import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Settings(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleItemsPerPageChange = (e) => {
        props.onItemsPerPageChange(e.target.value);
    }

    const handleAutoRefreshChange = (e) => {
        props.onAutoRefreshChange(e.target.checked);
    }

    return (
        <>
            <div className="mb-0 mx-1 h4" style={{cursor: "pointer"}}>
                <i className="bi bi-gear-fill text-white" onClick={handleShow}></i>
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
                        <Form.Label className="pr-2">Items per page:</Form.Label>
                        <Form.Control
                            as="select"
                            className="w-auto"
                            custom
                            defaultValue={20}
                            onChange={handleItemsPerPageChange}
                        >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Check
                            id="auto-refresh"
                            label="Auto refresh"
                            onChange={handleAutoRefreshChange}
                            checked={props.autoRefresh}
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

export default Settings;