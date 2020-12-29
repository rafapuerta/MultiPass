import {
  Container,
  Row,
  CardColumns,
  Card,
  Button,
  Jumbotron,
} from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Usuario({ sesion, setSesion, usuario, setUsuario }) {
  console.log(usuario);
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

  const entradasMostrar = usuario.entradas.map((entrada) => {
    return (
      <Card style={{ width: "18rem" }} key={entrada._id}>
        <Card.Img variant="top" src={entrada.cartel} />
        <Card.Body>
          <Card.Title>{entrada.grupo}</Card.Title>
          <Card.Text>
            {entrada.fecha}
            <br />
            {entrada.sala}
          </Card.Text>
        </Card.Body>
      </Card>
  )});
  
  

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
    if (usuario.entradas === undefined) {
      return (
        <Container>
          <Row>⠀</Row>
          <Row>
            <Card style={{ width: "100%" }}>
              <Card.Header>
                {usuario.nombre} {usuario.apellido1} {usuario.apellido2}
              </Card.Header>
              <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">
                  {usuario.email}
                </Card.Subtitle>
                <Card.Text>
                  <strong>Dni:</strong> {usuario.dni} <br />
                  <strong>teléfono:</strong> {usuario.telf}
                </Card.Text>
                <Button variant="warning" onClick={logout}>
                  Cerrar sesion
                </Button>
              </Card.Body>
            </Card>
          </Row>
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
    } else {
      return (
        <Container>
          <Row>⠀</Row>
          <Row>
            <Card style={{ width: "100%" }}>
              <Card.Header>
                {usuario.nombre} {usuario.apellido1} {usuario.apellido2}
              </Card.Header>
              <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">
                  {usuario.email}
                </Card.Subtitle>
                <Card.Text>
                  <strong>Dni:</strong> {usuario.dni} <br />
                  <strong>teléfono:</strong> {usuario.telf}
                </Card.Text>
                <Button variant="warning" onClick={logout}>
                  Cerrar sesion
                </Button>
              </Card.Body>
            </Card>
          </Row>
          <Row>⠀</Row>
          <Row>
            <CardColumns>
              {entradasMostrar}
            </CardColumns>
          </Row>
        </Container>
      );
    }
  }
}
