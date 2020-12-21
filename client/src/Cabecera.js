import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";

const Cabecera = () => {
  const [modalShow, setModalShow] = useState(false);

  function MyVerticallyCenteredModal(props) {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [feedback, setFeedback] = useState(false);

    const manageChangeEmail = (e) => {
      setEmail(e.target.value);
    };
    const manageChangePass = (e) => {
      setPass(e.target.value);
    };
    const login = () => {
      console.log("llamando...")
      fetch("http://localhost:3001/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: pass,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setFeedback("Datos incorrectos");
          } else {
            console.log("resultado diálogo login " + data)
            setModalShow(false);
          }
        });
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body closebutton>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Introduzca email"
                onChange={manageChangeEmail}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={manageChangePass}
              />
            </Form.Group>
            <Form.Text className="text-muted">{feedback}</Form.Text>
            <Button variant="primary" size="sm" type="submit" onClick={login}>
              Log In
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">MultiPass</Navbar.Brand>
        <Nav className="justify-content-end">
          <Nav.Link href="/">Inicio</Nav.Link>
          <Nav.Link href="/usuario">Usuario</Nav.Link>
          <Nav.Link href="/conciertos">Conciertos</Nav.Link>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setModalShow(true)}
            >
              Log in
            </Button>

            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Cabecera;
