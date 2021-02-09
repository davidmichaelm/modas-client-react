import React, {useEffect, useState} from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie";
import "animate.css";

export default function SignIn(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const open = props.open;
    const setOpen = props.setOpen;

    const [shake, setShake] = useState(false);
    const shakeModal = () => {
        setShake(true);
        setTimeout(() => setShake(false), 700);
    };

    const [loginFailed, setLoginFailed] = useState(false);

    useEffect(() => {
        if (open) {
            setOpen(false);
            setShow(true);
        }
    }, [open, setOpen]);

    const login = () => {
        setLoginFailed(false);
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
                    shakeModal();
                    setValidated(false);
                    setLoginFailed(true);
                }
                return r.json();
            })
            .then((data) => {
                Cookies.set("token", data.token, {expires: 7});
                setShow(false);
                props.onLogin(true);
            })
            .catch(e => {
                console.log(e)
            })
    };

    const {inputs, validated, setValidated, handleInputChange, handleSubmit} = useLogin(login, shakeModal);

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
                className={shake ? "animate__animated animate__shakeX" : ""}
                style={{"animationDuration": "0.7s"}}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Sign In</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit} noValidate validated={validated}>
                    <Modal.Body>
                        {loginFailed &&
                            <div className="text-danger">
                                Invalid username or password
                            </div>
                        }

                        <Form.Group>
                            <Form.Label className="pr-2">Username</Form.Label>
                            <Form.Control
                                placeholder={"Username"}
                                onChange={handleInputChange}
                                type="text"
                                value={inputs.username || ""}
                                name="username"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a username.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className="pr-2">Password</Form.Label>
                            <Form.Control
                                placeholder={"Password"}
                                onChange={handleInputChange}
                                type="password"
                                value={inputs.password || ""}
                                name="password"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a password.
                            </Form.Control.Feedback>
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

const useLogin = (callback, onError) => {
    const [inputs, setInputs] = useState({});
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            onError();
        } else {
            callback();
        }
        setValidated(true);
    }

    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
    }

    return {
        handleSubmit,
        handleInputChange,
        inputs,
        validated,
        setValidated
    };
}