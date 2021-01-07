import { useEffect, useState } from "react";
import { Card, Button, CardColumns, Container, Row, Col } from "react-bootstrap";
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

  const yaComprada = (id) => {
    if (usuario.entradas.some(e => e.id === id)) {
      return (
        <Button size="sm" variant="success" disabled>
          Ya añadido
        </Button>
      );
    } else {
      return (
        <Button size="sm" value={id} variant="warning" onClick={comprar}>
          Añadir
        </Button>
      );
    }
  };

  const conciertosMostrar = conciertos.map((concierto) => {
    let fecha = DateTime.fromISO(concierto.fecha)
    if (sesion) {
    return (
      <Card key={concierto._id}>
        <Card.Img variant="top" src={concierto.cartel} />
        <Card.Body>
          <Card.Title><Row><Col>{concierto.artista}</Col><Col>{yaComprada(concierto._id)}</Col></Row></Card.Title>
          <Card.Text>
          <Row style={{backgroundColor:"#EEEEEE", padding: 10}}>
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
              Categoría:
                
              </Col>
            </Row>
          </Card.Text>
          <Row>
          
          </Row>
        </Card.Body>
      </Card>
    )} else {
      return (
        <Card key={concierto._id}>
        <Card.Img variant="top" src={concierto.cartel} />
        <Card.Body>
          <Card.Title>{concierto.artista}</Card.Title>
          <Card.Text>
          <Row style={{backgroundColor:"#EEEEEE", padding: 10}}>
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
      )
    }
  });

  return (
    <Container style={{paddingBottom:60, paddingTop:60}}>
      <CardColumns>{conciertosMostrar}</CardColumns>
    </Container>
  );
};

export default Conciertos;
