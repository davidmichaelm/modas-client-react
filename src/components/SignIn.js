import React, {useEffect, useState} from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie";

export default function SignIn(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const open = props.open;
    const setOpen = props.setOpen;

    useEffect(() => {
        if (open) {
            setOpen(false);
            setShow(true);
        }
    }, [open, setOpen]);

    const login = () => {
        fetch("https://dmarquardt-modas.azurewebsites.net/api/token",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "username": inputs.username,
                    "password": inputs.password
                })
            })
            .then(r => {
                if (!r.ok) {
                    if (r.status === 401) {
                        console.log("token expired");
                    }
                    throw new Error("Login not successful");
                }
                return r.json();
            })
            .then((data) => {
                Cookies.set("token", data.token, { expires: 7});
                setShow(false);
                props.onLogin(true);
            })
            .catch(e => {
                console.log(e)
            })
    };

    const {inputs, handleInputChange, handleSubmit} = useLogin(login);

    const handleLogout = () => props.setLoggedIn(false);

    return (
        <>
            <div className="ml-auto mb-0 mr-2" style={{cursor: "pointer"}}>
                {!props.loggedIn &&
                    <button className="link-button text-white" onClick={handleShow}>
                        <i className="bi bi-box-arrow-in-right"></i> Sign In
                    </button>
                }
                {props.loggedIn &&
                <button className="link-button text-white" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right"></i> Sign Out
                </button>
                }

            </div>

            <Modal
                show={show}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Settings</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label className="pr-2">Username</Form.Label>
                            <Form.Control
                                placeholder={"Username"}
                                onChange={handleInputChange}
                                type="text"
                                value={inputs.username}
                                name="username"
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className="pr-2">Password</Form.Label>
                            <Form.Control
                                placeholder={"Password"}
                                onChange={handleInputChange}
                                type="password"
                                value={inputs.password}
                                name="password"
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" variant="primary">
                            Submit
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

const useLogin = (callback) => {
    const [inputs, setInputs] = useState({});

    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }
        console.log(inputs);
        callback();
    }

    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
    }

    return {
        handleSubmit,
        handleInputChange,
        inputs
    };
}