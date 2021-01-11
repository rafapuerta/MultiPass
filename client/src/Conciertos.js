import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Button,
  CardColumns,
  Container,
  Row,
  Col,
  Image,
  Tooltip,
  OverlayTrigger
} from "react-bootstrap";

//-----MEDIA------

import gold from "./img/microphone_gold.png";
import silver from "./img/microphone_silver.png";
import bronze from "./img/microphone_bronze.png";

//---------------

const { DateTime } = require("luxon");

const Conciertos = ({ sesion, setSesion, usuario, setUsuario }) => {
  const [conciertos, setConciertos] = useState([]);
  useEffect(() => {
    fetch("/entradas/conciertos")
      .then((res) => res.json())
      .then((datos) => {
        setConciertos(datos);
      });
  }, []);

  const comprar = (e) => {
    fetch("/entradas/comprar", {
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

  const botonEntrada = (id, categoria) => {
    if (usuario.entradas.some((e) => e.id === id)) {
      return (
        <Button size="sm" variant="success" block disabled>
          Ya añadido
        </Button>
      );
    } else if (usuario.categoria === "a") {
      return (
        <Button size="sm" value={id} variant="warning" block onClick={comprar}>
          Añadir
        </Button>
      );
    } else if (usuario.categoria === "b" && categoria !== "a") {
      return (
        <Button size="sm" value={id} variant="warning" block onClick={comprar}>
          Añadir
        </Button>
      );
    } else if (
      usuario.categoria === "c" &&
      categoria !== "a" &&
      categoria !== "b"
    ) {
      return (
        <Button size="sm" value={id} variant="warning" block onClick={comprar}>
          Añadir
        </Button>
      );
    } else {
      return (
        <Button size="sm" variant="danger" block disabled>
          Suscríbete a un plan mayor!
        </Button>
      );
    }
  };

  const tier = (categoria) => {
    switch (categoria) {
      case "c":
        return <Tooltip id="tier-help">Gold</Tooltip>;
      case "b":
        return <Tooltip id="tier-help">Silver</Tooltip>;
      case "a":
        return <Tooltip id="tier-help">Bronze</Tooltip>;
      default:
        return <p>FALLO!</p>;
    }
  }
    

  const categoria = (categoria) => {
    switch (categoria) {
      case "c":
        return <Image style={{ width: 30 }} src={gold} />;
      case "b":
        return <Image style={{ width: 30 }} src={silver} />;
      case "a":
        return <Image style={{ width: 30 }} src={bronze} />;
      default:
        return <p>FALLO!</p>;
    }
  };

  const conciertosMostrar = conciertos.map((concierto) => {
    let fecha = DateTime.fromISO(concierto.fecha);
    if (sesion) {
      return (
        <Card key={concierto._id}>
          <Card.Img variant="top" src={concierto.cartel} />
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
              <Row>
                <Col>
                  Fecha: <br />
                  <strong>{`${fecha.day}/${fecha.month}/${fecha.year} @${fecha.hour}:${fecha.minute}`}</strong>
                  {fecha.DATE_SHORT}
                  <br />
                  Lugar: <br />
                  <strong>{concierto.sala}</strong>
                </Col>
                <Col>
                  Quedan: <br />
                  <h3>{concierto.entradas}</h3>
                </Col>
              </Row>
            </Card.Text>
            <Row>{botonEntrada(concierto._id, concierto.categoria)}</Row>
          </Card.Body>
        </Card>
      );
    } else {
      return (
        <Card key={concierto._id}>
          <Card.Img variant="top" src={concierto.cartel} />
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
              <Row>
                <Col>
                  Fecha: <br />
                  <strong>{`${fecha.day}/${fecha.month}/${fecha.year} @${fecha.hour}:${fecha.minute}`}</strong>
                  <br />
                  Lugar: <br />
                  <strong>{concierto.sala}</strong>
                </Col>
                <Col>
                  Quedan: <br />
                  <h3>{concierto.entradas}</h3>
                </Col>
              </Row>
            </Card.Text>
          </Card.Body>
        </Card>
      );
    }
  });

  return (
    <Container style={{ paddingBottom: 60, paddingTop: 60 }}>
      <CardColumns>{conciertosMostrar}</CardColumns>
    </Container>
  );
};

export default Conciertos;
