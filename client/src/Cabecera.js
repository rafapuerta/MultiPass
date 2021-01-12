import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Nav, Navbar, Modal, Form, Alert } from "react-bootstrap";

import logo from "./img/logo.svg"
import logo2 from "./img/logo2.svg"

const Cabecera = ({ sesion, setSesion, usuario, setUsuario, login, feedback, setFeedback }) => {
  const [modalShow, setModalShow] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");


  const handleFeedback = () => {
    setFeedback("");
  };
  const handleMail = (e) => {
    setEmail(e.target.value);
  };
  const handlePass = (e) => {
    setPass(e.target.value);
  };

  if (sesion) {
    return (
      <Navbar fixed="top" bg="dark" variant="dark">
        <Navbar.Brand href="/"><img
        src={logo}
        width="30"
        height="30"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      />
      <img
      src={logo2}
      height="30"
      className="d-inline-block align-top"
      alt="React Bootstrap logo"
    /></Navbar.Brand>
        <Nav className="justify-content-end">
          <Link to="/conciertos">Conciertos</Link>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Hola, <Link to="/usuario">{usuario.nombre}!</Link>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    );
  } else {
    return (
      <>
        <Navbar fixed="top" collapseOnSelect expand="sm" bg="dark" variant="dark">
          <Navbar.Brand href="/">MultiPass</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/conciertos">Conciertos</Nav.Link>
            </Nav>
            <Nav>
              <Navbar.Text>
                <Link to="">
                  <a nohref onClick={() => setModalShow(true)}>
                    Iniciar sesión
                  </a>
                </Link>{" "}
                o <Link to="/usuario/registrar">Registrar</Link>
              </Navbar.Text>
            </Nav>
          </Navbar.Collapse>
          <LoginForm
            feedback={feedback}
            handleFeedback={handleFeedback}
            email={email}
            pass={pass}
            handleMail={handleMail}
            handlePass={handlePass}
            show={modalShow}
            login={login}
            onHide={() => setModalShow(false)}
          />
        </Navbar>
      </>
    );
  }
};

function LoginForm(props) {
  props.handleFeedback();
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Inicio Sesión
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Introduzca email"
              value={props.email}
              onChange={props.handleMail}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={props.pass}
              onChange={props.handlePass}
            />
          </Form.Group>
          <Form.Text className="text-muted">{props.feedback}</Form.Text>
          <Button variant="primary" size="sm" onClick={()=>{props.login(props.email, props.pass)}}>
            Log In
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Cabecera;