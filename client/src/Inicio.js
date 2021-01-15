import "./App.css";
import fondo from "./img/videoplayback.mp4";
import { Container, Row, Col, Accordion, Card } from "react-bootstrap";

import logo from "./img/logo.svg";
import logo2 from "./img/logo2.svg";

export default function Inicio() {
  return (
    <>
      <header>
        <div class="overlay"></div>
        <video
          playsinline="playsinline"
          autoplay="autoplay"
          muted="muted"
          loop="loop"
        >
          <source src={fondo} type="video/mp4" />
        </video>
        <div class="container h-100">
          <div class="d-flex h-100 text-center align-items-center">
            <div class="w-100 text-white">
              <img
                src={logo}
                width="150"
                height="150"
                alt="React Bootstrap logo"
              />
              <br />
              <img src={logo2} height="100" alt="React Bootstrap logo" />
              <p>Si no tenemos entrada, el concierto es en casa del Artista.</p>
            </div>
          </div>
        </div>
      </header>

      <section class="py-5 tarjeta">
        <Container>
          <Row className="d-flex justify-content-between">
            <Col md={8}>
              <h1>Cientos de conciertos disponibles</h1>
              <h4>
                Tenemos todos los géneros músicales, artistas de todas las
                categorías y eventos de todos los tamaños
              </h4>
            </Col>
            <Col className="d-flex justify-content-end" md={4}>
              <img
                src={logo}
                width="150"
                height="150"
                alt="React Bootstrap logo"
              />
            </Col>
          </Row>
        </Container>
      </section>
      <section class="py-5 tarjeta-par">
        <Container>
          <Row className="d-flex justify-content-between">
            <Col className="d-flex justify-content-start"md={4}>
              <img
                src={logo}
                width="150"
                height="150"
                alt="React Bootstrap logo"
              />
            </Col>
            <Col md={8}>
              <h1>Un único pase siempre a mano</h1>
              <h4>
                Con MultiPass, tendrás cientos de entradas en la palma de tu mano
              </h4>
            </Col>
          </Row>
        </Container>
      </section>
      <section class="py-5 tarjeta">
        <Container>
          <Row className="d-flex justify-content-between">
            <Col md={8}>
              <h1>Una tarifa plana de tu tamaño</h1>
              <h4>
                MultiPass tiene diferentes tamaños para diferentes personas <br/>
                ¡Elige el tamaño más adecuado para ti!
              </h4>
            </Col>
            <Col className="d-flex justify-content-end" md={4}>
              <img
                src={logo}
                width="150"
                height="150"
                alt="React Bootstrap logo"
              />
            </Col>
          </Row>
        </Container>
      </section>
      <section className="py-5">
        <Container>
          <Row className="d-flex justify-content-center">
            <Col className="py-4 text-center">
              <h1>Preguntas Frecuentes</h1>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center">
            <Col lg={8}>
              <Accordion defaultActiveKey="0">
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="0">
                    <h3>¿Qué es MultiPass?</h3>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      MultiPass es un sistema de suscripción mensual que te
                      permite acceder a todos los conciertos que quieras.
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="1">
                    <h3>¿Cuánto cuesta MultiPass?</h3>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="1">
                    <Card.Body>
                      MultiPass tiene tamaños para todo tipo de personas, desde
                      19.99€ a 49.99€ al mes. !Elige el que mejor se adapte a
                      ti!
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="2">
                    <h3>¿Dónde puedo usar MultiPass?</h3>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="2">
                    <Card.Body>
                      Puedes usar MultiPass en cualquiera de los conciertos que
                      te ofrecemos. <br />
                      De momento ofrecemos sólo concierto en territorio español,
                      pero esperamos poder ofrecerte conciertos fuera muy
                      pronto.
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="3">
                    <h3>¿Tengo que comprometerme a algo?</h3>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="3">
                    <Card.Body>
                      Puedes cancelar tu suscripción en cualquier momento. Tu
                      MultiPass seguirá activo hasta el final del mes en el que
                      estemos. <br /> !Te estaremos esperando cuando quieras
                      para que vuelvas!
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
