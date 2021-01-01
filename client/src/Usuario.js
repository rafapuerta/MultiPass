import {
  Container,
  Row,
  CardColumns,
  Card,
  Button,
  Jumbotron,
  Col,
  Form,
  Alert,
} from "react-bootstrap";
import { useState } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
const { DateTime } = require("luxon");
const QRCode = require("qrcode.react");

export default function Usuario({ sesion, setSesion, usuario, setUsuario }) {
  const [nombre, setNombre] = useState(usuario.nombre);
  const [apellido1, setApellido1] = useState(usuario.apellido1);
  const [apellido2, setApellido2] = useState(usuario.apellido2);
  const [dni, setDni] = useState(usuario.dni);
  const [telf, setTelf] = useState(usuario.telf);
  const [feedback, setFeedback] = useState("");

  const logout = () => {
    fetch("/user/logout")
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(data);
        } else {
          setUsuario({});
          setSesion(false);
        }
      });
  };

  const editar = () => {
    fetch("/user/editar", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: nombre,
        apellido1: apellido1,
        apellido2: apellido2,
        dni: dni,
        telf: telf,
        email: usuario.email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          setFeedback(<Alert variant="success">{data.mensaje}</Alert>);
        } else {
          setFeedback(<Alert variant="danger">{data.mensaje}</Alert>);
        }
      });
  };

  const eliminarEntrada = (e) => {
    console.log(e.target.value);
    fetch("/entradas/eliminar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: e.target.value, email: usuario.email }),
    })
      .then((res) => res.json())
      .then(function (datos) {
        console.log(datos);
      });
  };

  const DatosUsuario = () => {
    return (
      <BrowserRouter>
        <Row>
          <Card style={{ width: "100%" }}>
            <Card.Header>
              <Row>
                <Col>
                  <strong>{usuario.email}</strong>
                </Col>
                <Col>
                  <Link to="/">
                    <Button size="sm" variant="warning" onClick={logout}>
                      Cerrar sesión
                    </Button>
                  </Link>
                </Col>
                <Col>
                  <Link to="/usuario/editar">
                    <Button size="sm" variant="warning">
                      Editar datos
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <Row>
                  <Col>
                    <strong>Nombre:</strong> {usuario.nombre}{" "}
                    {usuario.apellido1} {usuario.apellido2}
                  </Col>
                  <Col>
                    <strong>Dni:</strong> {usuario.dni}
                  </Col>
                  <Col>
                    <strong>Teléfono:</strong> {usuario.telf}
                  </Col>
                </Row>
              </Card.Text>
              <Route exact path="/usuario/editar">
                <EditarUsuario />
              </Route>
            </Card.Body>
          </Card>
        </Row>
      </BrowserRouter>
    );
  };

  const EditarUsuario = () => {
    return (
      <Container style={{ backgroundColor: "#EEEEEE", padding: 10 }}>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                value={nombre}
                onChange={(e) => {
                  setNombre(e.target.value);
                }}
                type="input"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGrid1Apellido">
              <Form.Label>1º Apellido</Form.Label>
              <Form.Control
                value={apellido1}
                onChange={(e) => {
                  setApellido1(e.target.value);
                }}
                type="input"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGrid2Apellido">
              <Form.Label>2º Apellido</Form.Label>
              <Form.Control
                value={apellido2}
                onChange={(e) => {
                  setApellido2(e.target.value);
                }}
                type="input"
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridTelf">
              <Form.Label>Telefono:</Form.Label>
              <Form.Control
                value={telf}
                onChange={(e) => {
                  setTelf(e.target.value);
                }}
                type="input"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridDNI">
              <Form.Label>DNI</Form.Label>
              <Form.Control
                value={dni}
                onChange={(e) => {
                  setDni(e.target.value);
                }}
                type="input"
              />
            </Form.Group>
          </Form.Row>
          <Button size="sm" onClick={editar} variant="success">
            Guardar
          </Button>
          <Link to="/usuario"><Button size="sm"  variant="danger">
            Descartar
          </Button></Link>
        </Form>
        <Row>⠀</Row>
        {feedback}
      </Container>
    );
  };

  const entradasMostrar = usuario.entradas.map((entrada) => {
    var fecha = DateTime.fromISO(entrada.fecha);
    var qr = JSON.stringify({
      email: usuario.email,
      dni: usuario.dni,
      entrada: {
        id: entrada.id,
        artista: entrada.grupo,
        entrada: entrada.numero,
        lugar: entrada.sala,
        fecha: entrada.fecha,
      },
    });
    return (
      <Card key={entrada.id}>
        <Card.Img variant="top" src={entrada.cartel} />
        <Card.Body>
          <Card.Title>
            <Row>
              <Col>{entrada.grupo}</Col>
              <Col>
                <Button
                  size="sm"
                  variant="warning"
                  value={entrada.id}
                  onClick={eliminarEntrada}
                >
                  Eliminar
                </Button>
              </Col>
            </Row>
          </Card.Title>
          <Card.Text>
            <Row>
              <Col>
                Fecha: <br />
                <strong>{`${fecha.day}/${fecha.month}/${fecha.year} @${fecha.hour}:${fecha.minute}`}</strong>
                <br />
                Lugar: <br />
                <strong>{entrada.sala}</strong>
                <br />
                Entrada: <br />
                <strong style={{ color: "#FF9900" }}>{entrada.numero}</strong>
              </Col>
              <Col>
                <QRCode value={qr} />
              </Col>
            </Row>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  });

  if (!sesion) {
    return (
      <Jumbotron className="d-flex align-items-center">
        <Container>
          <h1>Usuario no encontrado</h1>
          <p>
            Por favor, inicia sesión pinchando en la esquina superior derecha de
            la web para poder acceder a tu perfil de usuario.
          </p>
        </Container>
      </Jumbotron>
    );
  } else {
    if (usuario.entradas !== undefined && usuario.entradas.length > 0) {
      return (
        <Container>
          <Row>⠀</Row>
          <DatosUsuario />
          <Row>⠀</Row>
          <Row>
            <CardColumns style={{ paddingBottom: 60 }}>
              {entradasMostrar}
            </CardColumns>
          </Row>
        </Container>
      );
    } else {
      return (
        <Container>
          <Row>⠀</Row>
          <DatosUsuario />
          <Row>⠀</Row>
          <Row>
            <Jumbotron style={{ width: "100%" }}>
              <Container>
                <h1>No hay entradas en tu MultiPass</h1>
                <p>
                  ¡Date una vuelta por <Link to="/conciertos">Conciertos</Link>{" "}
                  y añade los que quieras!
                </p>
              </Container>
            </Jumbotron>
          </Row>
        </Container>
      );
    }
  }
}
