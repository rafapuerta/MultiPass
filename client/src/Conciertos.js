import { useEffect, useState } from "react";
import { Card, Button, CardColumns, Container, } from "react-bootstrap";

const Conciertos = ({ sesion, setSesion, usuario, setUsuario }) => {
  console.log(usuario.entradas)
  const [conciertos, setConciertos] = useState([]);
  useEffect(() => {
    fetch("/entradas/conciertos")
      .then((res) => res.json())
      .then((datos) => {
        setConciertos(datos);
        console.log(datos);
      });
  }, []);

  const comprar = (e) => {
    console.log(`Comprar: ${e.target.value}`);
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
        <Button variant="success" disabled>
          Ya añadido
        </Button>
      );
    } else {
      return (
        <Button value={id} variant="warning" onClick={comprar}>
          Añadir
        </Button>
      );
    }
  };

  const conciertosMostrar = conciertos.map((concierto) => {
    if (sesion) {
    return (
      <Card key={concierto._id}>
        <Card.Img variant="top" src={concierto.cartel} />
        <Card.Body>
          <Card.Title>{concierto.artista}</Card.Title>
          <Card.Text>
            {concierto.fecha}
            <br />
            {concierto.sala}
          </Card.Text>
          {yaComprada(concierto._id)}
        </Card.Body>
      </Card>
    )} else {
      return (
        <Card key={concierto._id}>
        <Card.Img variant="top" src={concierto.cartel} />
        <Card.Body>
          <Card.Title>{concierto.artista}</Card.Title>
          <Card.Text>
            {concierto.fecha}
            <br />
            {concierto.sala}
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
