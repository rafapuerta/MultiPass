import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Nav, Navbar, Modal, Form, Alert,} from "react-bootstrap";

const Cabecera = ({sesion, setSesion, usuario, setUsuario}) => {
  const [modalShow, setModalShow] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [feedback, setFeedback] = useState(false);

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

  function LoginForm(props) {
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
                onChange={(e)=>setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={pass}
                onChange={(e)=>setPass(e.target.value)}
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
          <Navbar.Text>Hola, <Link to="/usuario">{usuario.nombre}!</Link></Navbar.Text>
          </Navbar.Collapse>
      
    </Navbar>

    );
  } else {
    return (
      <>
        <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
          <Navbar.Brand href="/">MultiPass</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/conciertos">Conciertos</Nav.Link>
          </Nav>
          <Nav>
          <Navbar.Text><Link><a nohref onClick={() => setModalShow(true)}>Iniciar sesión</a></Link> o <Link to="/usuario/registrar">Registrar</Link></Navbar.Text>
          </Nav>
          </Navbar.Collapse>
          <LoginForm
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </Navbar>
      </>
    );
  }
};

export default Cabecera;
