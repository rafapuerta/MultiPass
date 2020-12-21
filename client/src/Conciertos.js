import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button"
import CardDeck from "react-bootstrap/CardDeck"

const Conciertos = () => {
  const [conciertos, setConciertos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/entradas/conciertos")
      .then((res) => res.json())
      .then((datos) => {
        setConciertos(datos);
      });
  }, []);

  const comprar = (ObjectID) =>{
    fetch("/entradas/comprar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: ObjectID, email: sessionStorage.getItem("sesionEmail")}),
    })
    .then(res => res.json())
    .then(function (datos) {
      console.log(datos)
      
     })
  }

  const conciertosMostrar = conciertos.map((concierto) => {
    return (
      <Card key={concierto._id} style={{ width: "18rem" }}>
        <Card.Img variant="top" src={concierto.cartel} />
        <Card.Body>
          <Card.Title>{concierto.artista}</Card.Title>
          <Card.Text>{concierto.fecha}<br/>{concierto.sala}</Card.Text>
          <Button variant="warning" onClick={comprar(concierto._id)}>Comprar</Button>
        </Card.Body>
      </Card>
    );
  });

  return (
  <>
  <CardDeck>
  {conciertosMostrar}
  </CardDeck>
  </>
  )};

export default Conciertos;
