import { useEffect, useState } from "react";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Image,
  Tooltip,
  OverlayTrigger,
  Spinner,
  FormControl,
  Form,
} from "react-bootstrap";

//-----MEDIA------

import gold from "../../img/microphone_gold.png";
import silver from "../../img/microphone_silver.png";
import bronze from "../../img/microphone_bronze.png";

//---------------

const { DateTime } = require("luxon");

const Conciertos = (props) => {
  const [usuario, setUsuario] = useState(props.usuario);
  const [sesion, setSesion] = useState(props.sesion);
  const [conciertosRaw, setConciertosRaw] = useState([]);
  const [conciertos, setConciertos] = useState([]);
  const [refresh, setRefresh] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buscar, setBuscar] = useState("");
  const [ordenar, setOrdenar] = useState("asc");
  const [criterio, setCriterio] = useState("artista");

  var peso = 0;
  if (sesion) {
    for (let i = 0; i < usuario.entradas.length; i++) {
      peso += usuario.entradas[i].peso;
    }
  }

  useEffect(() => {
    setLoading(true);
    fetch("/entradas/conciertos")
      .then((res) => res.json())
      .then((datos) => {
        setConciertos(datos);
        setConciertosRaw(datos);
        setLoading(false);
      });
    if (props.sesion) {
      fetch("/user/info")
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.log({ status: "Denegado" });
            setSesion(false);
          } else {
            setUsuario(data);
            setSesion(true);
            setLoading(false);
          }
        });
    }
  }, [refresh, props.sesion]);

  const comprar = (e) => {
    setLoading(true);
    fetch("/entradas/comprar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: e.target.value, email: usuario.email }),
    })
      .then((res) => res.json())
      .then(function (datos) {
        setRefresh([]);
        setLoading(false);
      });
  };

  const botonEntrada = (id, categoria, conciertoPeso) => {
    if (loading) {
      return <div>Loading</div>;
    } else {
      if (usuario.entradas.length === 0) {
        return (
          <Button
            size="sm"
            value={id}
            variant="warning"
            block
            onClick={comprar}
          >
            Añadir
          </Button>
        );
      } else if (usuario.entradas.some((e) => e.id === id)) {
        return (
          <Button size="sm" variant="dark" block disabled>
            Ya añadido
          </Button>
        );
      } else if (usuario.categoria < categoria) {
        return (
          <Button size="sm" variant="danger" block disabled>
            Suscríbete a un plan mayor!
          </Button>
        );
      } else if (usuario.categoria - peso < conciertoPeso) {
        return (
          <Button size="sm" variant="info" block disabled>
            No queda espacio en tu pase!
          </Button>
        );
      } else {
        return (
          <Button
            size="sm"
            value={id}
            variant="warning"
            block
            onClick={comprar}
          >
            Añadir
          </Button>
        );
      }
    }
  };

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

  const conciertosMostrar = conciertos.map((concierto) => {
    let fecha = DateTime.fromISO(concierto.fecha);
    if (sesion) {
      return (
        <Card key={concierto._id} style={{ margin: 10, maxWidth: 340 }}>
          <Card.Img
            variant="top"
            src={concierto.cartel}
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
                <Col>{concierto.artista}</Col>
                <Col sm={2}>
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={tier(concierto.categoria)}
                  >
                    {categoria(concierto.categoria)}
                  </OverlayTrigger>
                </Col>
              </Row>
            </Card.Title>
            <Card.Text>
              {" "}
              <Row>
                <Col>
                  <strong>Fecha:</strong> <br />
                  {`${fecha.day}/${fecha.month}/${fecha.year} @${fecha.hour}:${fecha.minute}`}
                </Col>
                <Col>
                  <strong>Slots:</strong> <br />
                  <h4>{concierto.peso}</h4>
                </Col>
              </Row>
              <Row>
                <Col>
                  <strong>Lugar:</strong> <br />
                  {concierto.sala}
                </Col>
                <Col>
                  <strong>Quedan:</strong> <br />
                  <h4 style={{ color: "#FF9900" }}>{concierto.entradas}</h4>
                </Col>
              </Row>
            </Card.Text>
            <Row>
              {botonEntrada(concierto._id, concierto.categoria, concierto.peso)}
            </Row>
          </Card.Body>
        </Card>
      );
    } else {
      return (
        <Card key={concierto._id} style={{ margin: 10, maxWidth: 340 }}>
          <Card.Img
            variant="top"
            src={concierto.cartel}
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
                <Col>{concierto.artista}</Col>
                <Col sm={2}>
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={tier(concierto.categoria)}
                  >
                    {categoria(concierto.categoria)}
                  </OverlayTrigger>
                </Col>
              </Row>
            </Card.Title>
            <Card.Text>
              {" "}
              <Row>
                <Col>
                  <strong>Fecha:</strong> <br />
                  {`${fecha.day}/${fecha.month}/${fecha.year} @${fecha.hour}:${fecha.minute}`}
                </Col>
                <Col>
                  <strong>Slots:</strong> <br />
                  <h4>{concierto.peso}</h4>
                </Col>
              </Row>
              <Row>
                <Col>
                  <strong>Lugar:</strong> <br />
                  {concierto.sala}
                </Col>
                <Col>
                  <strong>Quedan:</strong> <br />
                  <h4 style={{ color: "#FF9900" }}>{concierto.entradas}</h4>
                </Col>
              </Row>
            </Card.Text>
          </Card.Body>
        </Card>
      );
    }
  });

  function filtrar(clave) {
    let filtrado = conciertosRaw.filter(
      (concierto) =>
        concierto.artista.toLowerCase().includes(clave.toLowerCase()) ||
        concierto.sala.toLowerCase().includes(clave.toLowerCase()) ||
        concierto.fecha.includes(clave)
    );
    setConciertos(filtrado);
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

  if (loading) {
    return (
      <Container className="d-flex flex-row align-items-center justify-content-center vh-100 text-center">
        <h1 style={{ marginRight: 20 }}>Cargando...</h1>
        <Spinner animation="border" role="status"></Spinner>
      </Container>
    );
  } else {
    return (
      <Container style={{ paddingBottom: 60, paddingTop: 60 }}>
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
                  conciertos.sort(compararValor(e.target.value, ordenar));
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
                  conciertos.sort(compararValor(criterio, e.target.value));
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
          {conciertosMostrar}
        </Container>
      </Container>
    );
  }
};

export default Conciertos;
