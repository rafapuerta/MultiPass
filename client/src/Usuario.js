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
  Tooltip,
  Image,
  OverlayTrigger,
  ProgressBar,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { BrowserRouter, Link, Redirect, Route } from "react-router-dom";

//-----MEDIA------

import gold from "./img/microphone_gold.png";
import silver from "./img/microphone_silver.png";
import bronze from "./img/microphone_bronze.png";

//---------------

const { DateTime } = require("luxon");
const QRCode = require("qrcode.react");

export default function Usuario({ sesion, setSesion, usuario, setUsuario, logout}) {
  let peso = 0;
  const [feedback, setFeedback] = useState("");
  const [refresh, setRefresh] = useState([])

  useEffect(()=>{
      fetch("/user/info")
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.log({ status: "Denegado"});
            setSesion(false)
          } else {
            setUsuario(data);
            setSesion(true);
          }
        });
  },[refresh])

  const eliminarEntrada = (e) => {
    fetch("/entradas/eliminar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: e.target.value, email: usuario.email }),
    })
      .then((res) => res.json())
      .then(function (datos) {
        setRefresh([])
        setFeedback(<Alert variant="success">{datos.mensaje}</Alert>);
      });
  };

  const DatosUsuario = () => {
    const categoriaImagen = (categoria) => {
      switch (categoria) {
        case 5:
          return <Image style={{ width: 30 }} src={bronze} />;
        case 10:
          return <Image style={{ width: 30 }} src={silver} />;
        case 15:
          return <Image style={{ width: 30 }} src={gold} />;
        default:
          return <p>FALLO!</p>;
      }
    };

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
                  <Col sm={4}>
                    <strong>Nombre:</strong> {usuario.nombre}{" "}
                    {usuario.apellido1} {usuario.apellido2}
                  </Col>
                  <Col sm={4}>
                    <strong>Dni:</strong> {usuario.dni}
                  </Col>
                  <Col sm={4}>
                    <strong>Teléfono:</strong> {usuario.telf}
                  </Col>
                </Row>
                <Row>⠀</Row>
                <Row>
                  <Col sm={4}>
                    <strong>Categoría:</strong>{" "}
                    {categoriaImagen(usuario.categoria)}
                  </Col>
                  <Col sm={8}>
                    <strong>Pase:</strong> {peso}/{usuario.categoria}{" "}
                    <ProgressBar
                      variant="warning"
                      now={(100 * peso) / usuario.categoria}
                    />
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
    const [nombre, setNombre] = useState(usuario.nombre);
    const [apellido1, setApellido1] = useState(usuario.apellido1);
    const [apellido2, setApellido2] = useState(usuario.apellido2);
    const [dni, setDni] = useState(usuario.dni);
    const [telf, setTelf] = useState(usuario.telf);
    const [categoria, setCategoria] = useState(usuario.categoria);

    const editar = () => {
      fetch("/user/edit", {
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
          categoria: categoria,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.error) {
            setFeedback(<Alert variant="success">{data.mensaje}</Alert>);
            setRefresh([])
          } else {
            setFeedback(<Alert variant="danger">{data.mensaje}</Alert>);
          }
        });
    };
    

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
          <Form.Row>
            <fieldset>
              <Form.Group as={Row}>
                <Form.Label as="legend" column sm={4}>
                  Nivel de suscripción:
                </Form.Label>
                <Col sm={8}>
                  <Form.Check
                    type="radio"
                    label="Gold - 49.99€ / mes"
                    name="formHorizontalRadios"
                    id="tierGroupie"
                    value={15}
                    onClick={(e) => {
                      setCategoria(e.target.value);
                    }}
                    defaultChecked={usuario.categoria === 15}
                  />
                  <Form.Check
                    type="radio"
                    label="Silver - 29.99€ / mes"
                    name="formHorizontalRadios"
                    id="tierFan"
                    value={10}
                    onClick={(e) => {
                      setCategoria(e.target.value);
                    }}
                    defaultChecked={usuario.categoria === 10}
                    />
                  <Form.Check
                    type="radio"
                    label="Bronze - 19.99€ / mes"
                    name="formHorizontalRadios"
                    id="tierAficionado"
                    value={5}
                    onClick={(e) => {
                      setCategoria(e.target.value);
                    }}
                    defaultChecked={usuario.categoria === 5}
                  />
                </Col>
              </Form.Group>
            </fieldset>
          </Form.Row>
          <Form.Row>
          <Col sm={6}>
          <Button size="sm" onClick={editar} variant="success">
            Guardar
          </Button>
          </Col>
          <Col sm={6}>
          <Link to="/usuario">
            <Button size="sm" variant="danger">
              Descartar
            </Button>
          </Link>
          </Col>
          </Form.Row>
        </Form>
        <Row>⠀</Row>
        {feedback}
      </Container>
      
    );
  };

  let entradasMostrar;
  if (usuario.entradas) {
    const tier = (categoria) => {
      switch (categoria) {
        case 5:
          return <Tooltip id="tier-help">Bronze</Tooltip>;
        case 10:
          return <Tooltip id="tier-help">Silver</Tooltip>;
        case 15:
          return <Tooltip id="tier-help">Gold</Tooltip>;
        default:
          return <p>FALLO!</p>;
      }
    };

    const categoria = (categoria) => {
      switch (categoria) {
        case 5:
          return <Image style={{ width: 30 }} src={bronze} />;
        case 10:
          return <Image style={{ width: 30 }} src={silver} />;
        case 15:
          return <Image style={{ width: 30 }} src={gold} />;
        default:
          return <p>FALLO!</p>;
      }
    };

    entradasMostrar = usuario.entradas.map((entrada) => {
      peso += entrada.peso;
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
              <Row
                style={{
                  backgroundColor: "#EEEEEE",
                  borderRadius: 2,
                  paddingTop: 5,
                  paddingBottom: 5,
                }}
              >
                <Col>{entrada.grupo}</Col>
                <Col sm={2}>
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={tier(entrada.categoria)}
                  >
                    {categoria(entrada.categoria)}
                  </OverlayTrigger>
                </Col>
              </Row>
            </Card.Title>
            <Card.Text>
              <Row>
                <Col>
                  <strong>Fecha:</strong> <br />
                  {`${fecha.day}/${fecha.month}/${fecha.year} @${fecha.hour}:${fecha.minute}`}
                </Col>
                <Col>
                  <strong>Slots:</strong> <br />
                  <h4>{entrada.peso}</h4>
                </Col>
              </Row>
              <Row>
                <Col>
                  <strong>Lugar:</strong> {entrada.sala}
                </Col>
                <Col>
                  <strong>Entrada:</strong> <br />
                  <h4 style={{ color: "#FF9900" }}>{entrada.numero}</h4>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 4, offset: 3 }}>
                  <QRCode value={qr} />
                </Col>
              </Row>
            </Card.Text>
            <Button
              size="sm"
              variant="warning"
              value={entrada.id}
              onClick={eliminarEntrada}
              block
            >
              Eliminar
            </Button>
          </Card.Body>
        </Card>
      );
    });
  }

  if (!sesion) {
    return <Redirect to="/" />;
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
