import fondo from "../../img/videoplayback.mp4";
import { Container, Row, Col, Accordion, Card, Button } from "react-bootstrap";
import { HashLink as Link } from "react-router-hash-link";

/* --------------------MEDIA-------------------- */
import logo from "../../img/logo.svg";
import list from "../../img/list.png";
import pass from "../../img/pass.png";
import size from "../../img/size.png";
/* --------------------------------------------- */

export default function Inicio() {
  return (
    <>
      <header>
        <div className="overlay"></div>
        <video
          playsInline="playsinline"
          autoPlay="autoplay"
          muted="muted"
          loop="loop"
        >
          <source src={fondo} type="video/mp4" />
        </video>
        <div className="container h-100">
          <div className="d-flex h-100 text-center align-items-center">
            <div className="w-100 text-white">
              <img
                src={logo}
                width="200"
                height="200"
                alt="React Bootstrap logo"
              />
              <p style={{ fontWeight: 700, fontSize: "4rem" }}>
                Si no tenemos la entrada, <br /> es en casa del artista.
              </p>
              <br />
              <Link to="/usuario/registrar">
                <Button size="lg" variant="warning">
                  Consigue tu MultiPass
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="py-5 tarjeta">
        <Container>
          <Row className="d-flex justify-contcenterent-between">
            <Col md={8}>
              <h1>Cientos de conciertos disponibles</h1>
              <h4>
                Tenemos todos los géneros músicales, artistas de todas las
                categorías y eventos de todos los tamaños
              </h4>
            </Col>
            <Col className="d-flex justify-content-center" md={4}>
              <img
                src={list}
                width="150"
                height="150"
                alt="React Bootstrap logo"
                style={{ marginTop: 30 }}
              />
            </Col>
          </Row>
        </Container>
      </section>
      <section className="py-5 tarjeta-par">
        <Container>
          <Row className="d-flex justify-content-between">
            <Col md={8}>
              <h1>Un único pase siempre a mano</h1>
              <h4>
                Con MultiPass, tendrás cientos de entradas en la palma de tu
                mano
              </h4>
            </Col>
            <Col
              className="d-flex justify-content-center order-md-first "
              md={4}
            >
              <img
                src={pass}
                width="150"
                height="150"
                alt="React Bootstrap logo"
                style={{ marginTop: 30 }}
              />
            </Col>
          </Row>
        </Container>
      </section>
      <section className="py-5 tarjeta">
        <Container>
          <Row className="d-flex justify-content-between">
            <Col md={8}>
              <h1>Una tarifa plana de tu tamaño</h1>
              <h4>
                MultiPass tiene diferentes tamaños para diferentes personas{" "}
                <br />
                ¡Elige el tamaño más adecuado para ti!
              </h4>
            </Col>
            <Col className="d-flex justify-content-center" md={4}>
              <img
                src={size}
                width="150"
                height="150"
                alt="React Bootstrap logo"
                style={{ marginTop: 30 }}
              />
            </Col>
          </Row>
        </Container>
      </section>
      <section id="precios" className="py-5">
        <Container>
          <Row className="d-flex justify-content-center">
            <Col className="py-4 text-center">
              <h1>Precios</h1>
            </Col>
          </Row>
          <Row className=" justify-content-center text-center">
            <Col sm={8}>
              <p>
                MultiPass tiene diferentes categorías que se ajustan a tu
                bolsillo, a tu disponibilidad para asistir a los conciertos o
                incluso al tipo de conciertos a los que quieres asistir.
                <br /> Si sólo te gustan los artistas independientes en locales
                pequeños, tenemos lo que buscas y si lo tuyo es más los
                conciertos de super estrellas, o los festivales de verano,
                ¡MultiPass tiene lo que necesitas!
              </p>
            </Col>
          </Row>
          <Row
            style={{ marginTop: 20 }}
            className="d-flex flew-wrap justify-content-around"
          >
            <Card style={{ width: 320, margin: 10 }} className="text-center">
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
                <Button as={Link} to="/usuario/registrar" variant="warning">
                  ¡Suscríbete!
                </Button>
              </Card.Body>
            </Card>
            <Card style={{ width: 320, margin: 10 }} className="text-center">
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
                <Button as={Link} to="/usuario/registrar" variant="warning">
                  ¡Suscríbete!
                </Button>
              </Card.Body>
            </Card>
            <Card style={{ width: 320, margin: 10 }} className="text-center">
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
                <Button as={Link} to="/usuario/registrar" variant="warning">
                  ¡Suscríbete!
                </Button>
              </Card.Body>
            </Card>
          </Row>
        </Container>
      </section>
      <section id="faq" className="py-5" style={{ marginTop: -60 }}>
        <Container>
          <Row className="d-flex justify-content-center">
            <Col className="py-4 text-center">
              <h1>Preguntas Frecuentes</h1>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center">
            <Col className="text-center">
              <Accordion>
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="0">
                    <h3>¿Qué es MultiPass?</h3>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      MultiPass es un sistema de suscripción mensual que te
                      permite acceder a todos los conciertos que quieras. Con tu
                      App, tendrás a tu alcance todas las entradas que hayas
                      agregado a tu MultiPass listas para entrar a cualquier
                      concierto.
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
