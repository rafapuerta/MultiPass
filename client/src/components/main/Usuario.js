import {
  Container,
  Row,
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
  FormControl,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { BrowserRouter, Link, Redirect, Route } from "react-router-dom";

//-----MEDIA------

import gold from "../../img/microphone_gold.png";
import silver from "../../img/microphone_silver.png";
import bronze from "../../img/microphone_bronze.png";

//---------------

const { DateTime } = require("luxon");
const QRCode = require("qrcode.react");

export default function Usuario({
  sesion,
  setSesion,
  usuario,
  setUsuario,
  logout,
}) {
  let peso = 0;
  let entradasMostrar;
  const [feedback, setFeedback] = useState("");
  const [refresh, setRefresh] = useState([]);
  const [buscar, setBuscar] = useState("");
  const [ordenar, setOrdenar] = useState("asc");
  const [criterio, setCriterio] = useState("artista");
  const [filtradas, setFiltradas] = useState([]);

  useEffect(() => {
    fetch("/user/info")
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log({ status: "Denegado" });
          setSesion(false);
        } else {
          setUsuario(data);
          setFiltradas(usuario.entradas);
          setSesion(true);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, setSesion, setUsuario]);

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
        setRefresh([]);
        setFeedback(<Alert variant="success">{datos.mensaje}</Alert>);
      });
  };

  function DatosUsuario() {
    //ANCHOR Perfil de usuario
    const categoriaImagen = (categoria) => {
      switch (categoria) {
        case 5:
          return (
            <>
              <Image style={{ width: 30 }} src={bronze} />⠀<h4>Bronce</h4>
            </>
          );
        case 10:
          return (
            <>
              <Image style={{ width: 30 }} src={silver} />⠀<h4>Silver</h4>
            </>
          );
        case 15:
          return (
            <>
              <Image style={{ width: 30 }} src={gold} />⠀<h4>Gold</h4>
            </>
          );
        default:
          return <p>FALLO!</p>;
      }
    };

    function AdminBoton(props) {
      if (props.admin) {
        return (
          <Col>
            <Link to="/usuario/admin">
              <Button size="sm" variant="warning">
                Administrador
              </Button>
            </Link>
          </Col>
        );
      }
      return null;
    }

    return (
      <BrowserRouter>
        {usuario.admin}
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
                <AdminBoton admin={usuario.admin} />
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
                    <Row>
                      <strong>Categoría:</strong>
                      {categoriaImagen(usuario.categoria)}
                    </Row>
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
              <Route exact path="/usuario/admin">
                <AdminUsuario />
              </Route>
            </Card.Body>
          </Card>
        </Row>
      </BrowserRouter>
    );
  }

  function EditarUsuario() {
    //ANCHOR Editar Usuario
    const [nombre, setNombre] = useState(usuario.nombre);
    const [apellido1, setApellido1] = useState(usuario.apellido1);
    const [apellido2, setApellido2] = useState(usuario.apellido2);
    const [dni, setDni] = useState(usuario.dni);
    const [telf, setTelf] = useState(usuario.telf);
    const [categoria, setCategoria] = useState(usuario.categoria);
    const [img, setImg] = useState(usuario.img);

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
          img: img,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.error) {
            setFeedback(<Alert variant="success">{data.mensaje}</Alert>);
            setTimeout(() => {
              setFeedback("");
            }, 5000);
            setRefresh([]);
          } else {
            setFeedback(<Alert variant="danger">{data.mensaje}</Alert>);
            setTimeout(() => {
              setFeedback("");
            }, 5000);
          }
        });
    };

    return (
      <Container style={{ backgroundColor: "#EEEEEE", padding: 10 }}>
        <Form>
          <Form.Row className="d-flex align-items-center">
            <Image
              as={Col}
              style={{ width: 100, margin: 20 }}
              src={img}
              roundedCircle
            />
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
              <Form.Label>Telefono</Form.Label>
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
            <Form.Group as={Col} controlId="formGridImg">
              <Form.Label>Foto de perfil</Form.Label>
              <Form.Control
                as="input"
                value={img}
                onChange={(e) => {
                  setImg(e.target.value);
                }}
                type="url"
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Container>
              <Row
                style={{ marginTop: 20 }}
                className="d-flex flew-wrap justify-content-around"
              >
                <Card
                  style={{ width: 320, margin: 10 }}
                  className="text-center"
                >
                  <Card.Header>
                    <h3>Bronce</h3>
                  </Card.Header>
                  <Card.Body className="d-flex flex-column justify-content-between ">
                    <Card.Text>
                      <h1 className="card-title pricing-card-title">
                        19.99€
                        <small className="text-muted">/ mo</small>
                      </h1>
                      <ul className="list-unstyled mt-3 mb-4">
                        <li>⠀</li>
                        <li>Eventos de categoría Bronce</li>
                        <li>5 Slots en tu MultiPass</li>
                        <li>Notificaciones de nuevos eventos</li>
                        <li>⠀</li>
                      </ul>
                    </Card.Text>
                    <Button
                      onClick={() => {
                        setCategoria(5);
                      }}
                      variant={usuario.categoria === 5 ? "success" : "warning"}
                      disabled={usuario.categoria === 5}
                    >
                      {usuario.categoria === 5
                        ? "Categoría actual"
                        : "Cambiar a Bronce"}
                    </Button>
                  </Card.Body>
                </Card>
                <Card
                  style={{ width: 320, margin: 10 }}
                  className="text-center"
                >
                  <Card.Header>
                    <h3>Silver</h3>
                  </Card.Header>
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <Card.Text>
                      <h1 className="card-title pricing-card-title">
                        29.99€
                        <small className="text-muted">/ mo</small>
                      </h1>
                      <ul className="list-unstyled mt-3 mb-4">
                        <li>⠀</li>
                        <li>Todo lo que se incluye en Bronce</li>
                        <li>Eventos de categoría Plata</li>
                        <li>+5 Slots en tu MultiPass (10 en total)</li>
                        <li>Notificaciones de nuevos eventos</li>
                      </ul>
                    </Card.Text>
                    <Button
                      onClick={() => {
                        setCategoria(10);
                      }}
                      variant={usuario.categoria === 10 ? "success" : "warning"}
                      disabled={usuario.categoria === 10}
                    >
                      {usuario.categoria === 10
                        ? "Categoría actual"
                        : "Cambiar a Silver"}
                    </Button>
                  </Card.Body>
                </Card>
                <Card
                  style={{ width: 320, margin: 10 }}
                  className="text-center"
                >
                  <Card.Header>
                    <h3>Gold</h3>
                  </Card.Header>
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <Card.Text>
                      <h1 className="card-title pricing-card-title">
                        49.99€
                        <small className="text-muted">/ mo</small>
                      </h1>
                      <ul className="list-unstyled mt-3 mb-4">
                        <li>Todo lo que se incluye en Plata</li>
                        <li>Acceso a todos los eventos</li>
                        <li>+10 Slots en tu MultiPass (15 en total)</li>
                        <li>Notificaciones de nuevos eventos</li>
                        <li>Acceso prioritario a las entradas</li>
                      </ul>
                    </Card.Text>
                    <Button
                      onClick={() => {
                        setCategoria(15);
                      }}
                      variant={usuario.categoria === 15 ? "success" : "warning"}
                      disabled={usuario.categoria === 15}
                    >
                      {usuario.categoria === 15
                        ? "Categoría actual"
                        : "Cambiar a Gold"}
                    </Button>
                  </Card.Body>
                </Card>
              </Row>
            </Container>
          </Form.Row>
          <Form.Row>
            <Col sm={6}>
              <Button block size="sm" onClick={editar} variant="success">
                Guardar
              </Button>
            </Col>
            <Col sm={6}>
              <Button as={Link} to="/usuario" block size="sm" variant="danger">
                Descartar
              </Button>
            </Col>
          </Form.Row>
        </Form>
        <Row>⠀</Row>
        {feedback}
      </Container>
    );
  }

  function AdminUsuario() {
    //ANCHOR Admin Usuario
    const [artista, setArtista] = useState("");
    const [cartel, setCartel] = useState("");
    const [fecha, setFecha] = useState("");
    const [entradas, setEntradas] = useState("");
    const [sala, setSala] = useState("");
    const [categoria, setCategoria] = useState("");
    const [peso, setPeso] = useState("");
    const [feedback, setFeedback] = useState("");

    const anyadir = () => {
      console.log("llamando...");
      fetch("/entradas/anyadir", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          artista: artista,
          cartel: cartel,
          fecha: fecha,
          entradas: entradas,
          sala: sala,
          categoria: categoria,
          peso: peso,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.error) {
            console.log(data.mensaje);
            setFeedback(<Alert variant="success">{data.mensaje}</Alert>);
            setTimeout(() => {
              setFeedback("");
            }, 5000);
            setRefresh([]);
          } else {
            console.log(data.mensaje);
            setFeedback(<Alert variant="danger">{data.mensaje}</Alert>);
            setTimeout(() => {
              setFeedback("");
            }, 5000);
          }
        });
    };

    return (
      <Container style={{ backgroundColor: "#EEEEEE", padding: 10 }}>
        <Row>
          <Card style={{ margin: 10, maxWidth: 340 }}>
            <Card.Img
              variant="top"
              src={cartel}
              style={{ maxWidth: 340, height: 500 }}
            />
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
                  <Col>{artista}</Col>
                  <Col>{categoria}</Col>
                </Row>
              </Card.Title>
              <Card.Text>
                {" "}
                <Row>
                  <Col>
                    <strong>Fecha:</strong> <br />
                    {fecha}
                  </Col>
                  <Col>
                    <strong>Slots:</strong> <br />
                    <h4>{peso}</h4>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <strong>Lugar:</strong> <br />
                    {sala}
                  </Col>
                  <Col>
                    <strong>Quedan:</strong> <br />
                    <h4 style={{ color: "#FF9900" }}>{entradas}</h4>
                  </Col>
                </Row>
              </Card.Text>
            </Card.Body>
          </Card>
          <Form as={Col}>
            <Form.Group controlId="formGridArtista">
              <Form.Label>Artista</Form.Label>
              <Form.Control
                value={artista}
                onChange={(e) => {
                  setArtista(e.target.value);
                }}
                type="input"
              />
            </Form.Group>
            <Form.Group controlId="formGrid1Cartel">
              <Form.Label>Cartel</Form.Label>
              <Form.Control
                value={cartel}
                onChange={(e) => {
                  setCartel(e.target.value);
                }}
                type="input"
              />
            </Form.Group>
            <Form.Group controlId="formGrid2Fecha">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                as="input"
                value={fecha}
                onChange={(e) => {
                  setFecha(e.target.value);
                }}
                type="datetime-local"
              />
            </Form.Group>
            <Form.Group controlId="formGridEntradas">
              <Form.Label>Entradas</Form.Label>
              <Form.Control
                value={entradas}
                onChange={(e) => {
                  setEntradas(e.target.value);
                }}
                type="input"
              />
            </Form.Group>
            <Form.Group controlId="formGridSala">
              <Form.Label>Sala</Form.Label>
              <Form.Control
                value={sala}
                onChange={(e) => {
                  setSala(e.target.value);
                }}
                type="input"
              />
            </Form.Group>
            <fieldset>
              <Form.Group>
                <Form.Check
                  inline
                  type="radio"
                  label="Gold"
                  name="formHorizontalRadios"
                  id="tierGold"
                  value={15}
                  onClick={(e) => {
                    setCategoria(e.target.value);
                  }}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Silver"
                  name="formHorizontalRadios"
                  id="tierSilver"
                  value={10}
                  onClick={(e) => {
                    setCategoria(e.target.value);
                  }}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Bronze"
                  name="formHorizontalRadios"
                  id="tierBronze"
                  value={5}
                  onClick={(e) => {
                    setCategoria(e.target.value);
                  }}
                />
              </Form.Group>
            </fieldset>
            <Form.Group controlId="formGridPeso">
              <Form.Label>Slots: {peso}</Form.Label>
              <Form.Control
                as="input"
                value={peso}
                onChange={(e) => {
                  setPeso(e.target.value);
                }}
                type="range"
                min="1"
                max="10"
              />
            </Form.Group>
            <Form.Row>
              <Col sm={6}>
                <Button block size="sm" onClick={anyadir} variant="success">
                  Añadir
                </Button>
              </Col>
              <Col sm={6}>
                <Button
                  as={Link}
                  to="/usuario"
                  block
                  size="sm"
                  variant="danger"
                >
                  Descartar
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Row>
        {feedback}
      </Container>
    );
  }

  function filtrar(clave) {
    let filtrado = usuario.entradas.filter(
      (concierto) =>
        concierto.grupo.toLowerCase().includes(clave.toLowerCase()) ||
        concierto.sala.toLowerCase().includes(clave.toLowerCase()) ||
        concierto.fecha.includes(clave)
    );
    setFiltradas(filtrado);
    console.log(filtrado);
  }

  function compararValor(clave, orden) {
    return function ordenar(a, b) {
      if (!a.hasOwnProperty(clave) || !b.hasOwnProperty(clave)) {
        return 0;
      }

      const A =
        typeof a[clave] === "string" ? a[clave].toUpperCase() : a[clave];
      const B =
        typeof b[clave] === "string" ? b[clave].toUpperCase() : b[clave];

      let comparacion = 0;
      if (A > B) {
        comparacion = 1;
      } else if (A < B) {
        comparacion = -1;
      }
      return orden === "desc" ? comparacion * -1 : comparacion;
    };
  }

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

    entradasMostrar = filtradas.map((entrada) => {
      // TODO Crear componente Entrada, pasando el elemento entrada del .map por props. Dentro generar un Modal individual con el QR generado que salte al tocar el qr original y se cierre al tocar el modal
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
        <Card key={entrada.id} style={{ margin: 10, maxWidth: 340 }}>
          <Card.Img
            variant="top"
            src={entrada.cartel}
            style={{ maxWidth: 340, height: 500 }}
          />
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
          <Row style={{ padding: 10, marginBottom: 20 }}>
            <Col>
              <Form>
                <FormControl
                  as="input"
                  placeholder="Buscar..."
                  value={buscar}
                  onChange={(e) => {
                    setBuscar(e.target.value);
                    filtrar(e.target.value);
                  }}
                  type="search"
                />
              </Form>
            </Col>
            <Col className="d-flex justify-content-end">
              <Form inline>
                <Form.Label style={{ marginRight: 5 }}>Mostrar por</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setCriterio(e.target.value);
                    filtradas.sort(compararValor(e.target.value, ordenar));
                  }}
                  title="Criterio"
                  as="select"
                  size="sm"
                >
                  <option value="artista">Artista</option>
                  <option value="fecha">Fecha</option>
                  <option value="sala">Lugar</option>
                  <option value="categoria">Categoría</option>
                  <option value="peso">Slots</option>
                </Form.Control>
                <Form.Label style={{ marginInline: 5 }}>en orden</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setOrdenar(e.target.value);
                    filtradas.sort(compararValor(criterio, e.target.value));
                  }}
                  title="Ordenar"
                  as="select"
                  size="sm"
                >
                  <option value="asc">ascendente</option>
                  <option value="desc">descendente</option>
                </Form.Control>
              </Form>
            </Col>
          </Row>
          <Container className="d-flex flex-wrap" style={{ paddingBottom: 60 }}>
            {entradasMostrar}
          </Container>
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
