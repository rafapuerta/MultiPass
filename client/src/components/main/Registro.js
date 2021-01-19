import { useState } from "react";
import {
  Form,
  Button,
  Col,
  Row,
  Container,
  OverlayTrigger,
  Tooltip,
  Jumbotron,
  Alert,
} from "react-bootstrap";
export default function Registro() {
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido1, setApellido1] = useState("");
  const [apellido2, setApellido2] = useState("");
  const [dni, setDni] = useState("");
  const [telf, setTelf] = useState("");
  const [feedback, setFeedback] = useState("");
  const [categoria, setCategoria] = useState("");

  function emailIsValid(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  function passIsValid(password) {
    return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password);
  }
  function passIsEqual(password1, password2) {
    return password1 === password2;
  }
  const passAyuda = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      1 Mayúscula, <br />
      1 Minúscula, <br />
      1 Símbolo y <br />1 Número
    </Tooltip>
  );
  const registrar = () => {
    if (emailIsValid(email)) {
      if (passIsValid(pass1)) {
        if (passIsEqual(pass1, pass2)) {
          fetch("/user/registrar", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nombre: nombre,
              apellido1: apellido1,
              apellido2: apellido2,
              dni: dni,
              telf: telf,
              email: email,
              password: pass1,
              categoria: categoria,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.unico) {
                setFeedback(
                  <Alert variant="success">
                    Usuario registrado correctamente
                  </Alert>
                );
              } else {
                setFeedback(<Alert variant="danger">{data.mensaje}</Alert>);
              }
            });
        } else {
          setFeedback(
            <Alert variant="danger">Las contraseñas no coinciden</Alert>
          );
        }
      } else {
        setFeedback(<Alert variant="danger">La contraseña no cumple los requisitos</Alert>);
      }
    } else {
      setFeedback(<Alert variant="danger">El email no es válido</Alert>);
    }
  };

  return (
    <>
      <Jumbotron className="d-flex align-items-center">
        <Container>
          <h1>Bienvenido a MultiPass</h1>
          <p>
            Para empezar a utilizar MultiPass, debes crear tu cuenta de usuario
            mediante el registro. <br /> Por favor, rellena todos los campos del
            formulario y luego pulsa el botón "Registrar"
          </p>
        </Container>
      </Jumbotron>
      <Container>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                placeholder="Introduce tu email"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Contraseña</Form.Label>
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={passAyuda}
              >
                <Form.Control
                  value={pass1}
                  onChange={(e) => {
                    setPass1(e.target.value);
                  }}
                  type="password"
                  placeholder="Introduce tu contraseña"
                />
              </OverlayTrigger>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPassword2">
              <Form.Label>Repite Contraseña</Form.Label>
              <Form.Control
                value={pass2}
                onChange={(e) => {
                  setPass2(e.target.value);
                }}
                type="password"
                placeholder="Repite tu contraseña"
              />
            </Form.Group>
          </Form.Row>
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
          <fieldset>
            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2}>
                Nivel de suscripción:
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  type="radio"
                  label="Gold - 49.99€ / mes"
                  name="formHorizontalRadios"
                  id="tierGroupie"
                  value={15}
                  onClick={(e) => {
                    setCategoria(e.target.value);
                  }}
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
                />
              </Col>
            </Form.Group>
          </fieldset>
          <Button onClick={registrar} variant="primary">
            Registrar
          </Button>
          <Row>⠀</Row>
          {feedback}
        </Form>
      </Container>
    </>
  );
}
