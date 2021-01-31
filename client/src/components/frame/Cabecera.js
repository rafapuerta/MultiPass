import { useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { Button, Nav, Navbar, Modal, Form, Image } from "react-bootstrap";

import logo from "../../img/logo.svg";
import logo2 from "../../img/logo2.svg";

const Cabecera = ({ sesion, usuario, login, feedback, setFeedback }) => {
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
      <Navbar
        sticky="top"
        collapseOnSelect
        expand="sm"
        bg="dark"
        variant="dark"
      >
        <Navbar.Brand>
          <Link to="/">
            <img
              src={logo}
              width="40"
              height="40"
              className="d-inline-block align-top"
              alt="MultiPass logo"
            />
            <img
              src={logo2}
              height="40"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/conciertos">
              Conciertos
            </Nav.Link>
            <Nav.Link as={Link} to="/noticias">
              Noticias
            </Nav.Link>
            <Nav.Link as={Link} to="/#precios">
              Precios
            </Nav.Link>
            <Nav.Link as={Link} to="/#faq">
              FAQ
            </Nav.Link>
          </Nav>
          <Nav>
            <Navbar.Text>
              <Link to="/usuario">
                <Image style={{ width: 50 }} src={usuario.img} roundedCircle />
              </Link>
            </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  } else {
    return (
      <>
        <Navbar
          sticky="top"
          collapseOnSelect
          expand="sm"
          bg="dark"
          variant="dark"
        >
          <Navbar.Brand>
            <Link to="/">
              <img
                src={logo}
                width="40"
                height="40"
                className="d-inline-block align-top"
                alt="MultiPass logo"
              />
              <img
                src={logo2}
                height="40"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/conciertos">
                Conciertos
              </Nav.Link>
              <Nav.Link as={Link} to="/noticias">
                Noticias
              </Nav.Link>
            </Nav>
            <Nav>
              <Navbar.Text>
                <Button onClick={() => setModalShow(true)} variant="warning">
                  Iniciar sesión
                </Button>
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
              required
              autoFocus
              value={props.email}
              onChange={props.handleMail}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              value={props.pass}
              onChange={props.handlePass}
            />
          </Form.Group>
          <Form.Text className="text-muted">{props.feedback}</Form.Text>
          <Form.Group>
            <Button
              block
              variant="warning"
              size="sm"
              onClick={() => {
                props.login(props.email, props.pass);
              }}
            >
              Log In
            </Button>
          </Form.Group>
          <Form.Group className="text-center">
            <Form.Text>
              ¿No tienes cuenta?{" "}
              <Link to="/usuario/registrar" onClick={props.onHide}>
                Regístrate en MultiPass
              </Link>
            </Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Cabecera;
