import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function PageHeader(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleItemsPerPageChange(e) {
        console.log(e.target.value)
        props.onItemsPerPageChange(e.target.value);
    }

    function handleAutoRefreshChange(e) {
        props.onAutoRefreshChange(e.target.checked);
    }

    return (
        <header className="d-flex p-2 px-xl-0 align-items-center container-xl p-0">
            <h2 className="ml-1 ml-lg-0 mb-0">
                <span className="d-none d-md-inline">Moving Object Detection Alert System</span>
                <span className="d-inline d-md-none">MODAS</span>
            </h2>
            <div className="ml-auto mb-0 mr-1 h4" style={{cursor: "pointer"}}>
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
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </header>
    );
}

export default PageHeader;