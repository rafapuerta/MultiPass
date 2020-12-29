import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Nav, Navbar, Modal, Form, Alert,} from "react-bootstrap";

const Cabecera = ({sesion, setSesion, usuario, setUsuario}) => {
  const [modalShow, setModalShow] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [feedback, setFeedback] = useState(false);

  const manageChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const manageChangePass = (e) => {
    setPass(e.target.value);
  };

  useEffect(() => {
    fetch("/user/info")
      .then((respuesta) => respuesta.json())
      .then((data) => {
        if (data.error) {
          console.log({ status: "Denegado", data });
          setUsuario(data)
          setSesion(false)
          return;
        } else {
          console.log({ status: "Logueado", data });
          setUsuario(data)
          setSesion(true)
        }
      });
  },[]);

  const login = () => {
    console.log("usuario: " + email + " contraseña: " + pass);
    fetch("/user/login", {
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
          console.log({ status: "Denegado", data });
          setFeedback(<Alert variant="danger">Datos incorrectos</Alert>);
        } else {
          console.log({ status: "Logueado", data });
          setUsuario(data)
          setFeedback(<Alert variant="success">Login correcto.</Alert>);
          setSesion(true)
        }
      });
  };

  function MyVerticallyCenteredModal(props) {
    setFeedback("");
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
                value={email}
                onChange={manageChangeEmail}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={pass}
                onChange={manageChangePass}
              />
            </Form.Group>
            <Form.Text className="text-muted">{feedback}</Form.Text>
            <Button variant="primary" size="sm" onClick={login}>
              Log In
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  if (sesion) {
    return (

      <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">MultiPass</Navbar.Brand>
          <Nav className="justify-content-end">
            <Nav.Link href="/conciertos">Conciertos</Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>Hola, <Link style={{textDecoration:"underline"}} to="/usuario">{usuario.nombre}!</Link></Navbar.Text>
          </Navbar.Collapse>
      
    </Navbar>

    );
  } else {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">MultiPass</Navbar.Brand>
          <Nav className="justify-content-end">
            <Nav.Link href="/conciertos">Conciertos</Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
          <Navbar.Text><a nohref style={{textDecoration:"underline",cursor:"pointer"}} onClick={() => setModalShow(true)}>Iniciar sesión</a></Navbar.Text>
          </Navbar.Collapse>
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </Navbar>
      </>
    );
  }
};

export default Cabecera;
