import { useEffect, useState } from "react";
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

import gold from "../../img/microphone_gold.png";
import silver from "../../img/microphone_silver.png";
import bronze from "../../img/microphone_bronze.png";

//---------------

const { DateTime } = require("luxon");

const Conciertos = ({ sesion, usuario}) => {

  var peso = 0
  if(sesion){let usado = usuario.entradas.map((entrada) => {peso += entrada.peso})}
  


  const [conciertos, setConciertos] = useState([]);
  const [refresh, setRefresh] = useState([])


  useEffect(() => {
    fetch("/entradas/conciertos")
      .then((res) => res.json())
      .then((datos) => {
        setConciertos(datos);
      });

      
  }, [refresh]);

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
        setRefresh([])
      });
  };


  const botonEntrada = (id, categoria, conciertoPeso) => {

    if (usuario.entradas.some((e) => e.id === id)) {
      return (
        <Button size="sm" variant="dark" block disabled>
          Ya añadido
        </Button>
      );
    }else if(usuario.categoria < categoria){
      return (
        <Button size="sm" variant="danger" block disabled>
          Suscríbete a un plan mayor!
        </Button>)
    }else if((usuario.categoria - peso) < conciertoPeso){
        return (
          <Button size="sm" variant="info" block disabled>
            No queda espacio en tu pase!
          </Button>
        );
    }else if (usuario.categoria === 15) {
      return (
        <Button size="sm" value={id} variant="warning" block onClick={comprar}>
          Añadir
        </Button>
      );
    } else if (usuario.categoria === 10 && categoria !== 15) {
      return (
        <Button size="sm" value={id} variant="warning" block onClick={comprar}>
          Añadir
        </Button>
      );
    } else if (
      usuario.categoria === 5 &&
      categoria !== 10 &&
      categoria !== 15
    ) {
      return (
        <Button size="sm" value={id} variant="warning" block onClick={comprar}>
          Añadir
        </Button>
      );
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
  }
    

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
            <Card.Text> <Row>
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
                  <strong>Lugar:</strong> {concierto.sala}
                </Col>
                <Col>
                  <strong>Quedan:</strong> <br />
                  <h4 style={{ color: "#FF9900" }}>{concierto.entradas}</h4>
                </Col>
              </Row>
            </Card.Text>
            <Row>{botonEntrada(concierto._id, concierto.categoria, concierto.peso)}</Row>
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
