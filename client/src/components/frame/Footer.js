import { Row, Col, Container } from "react-bootstrap";
import logo from "../../img/logo.svg";
import logo2 from "../../img/logo2.svg";

const Footer = () => {
  return (
    <>
      <hr style={{ marginInline: 200 }} />
      <Row>
        <Container>
          <Row>
            <Col>
              <img
                class="mb-2"
                src={logo}
                alt="MultiPass Iso"
                width="60"
                height="60"
              />
              <img
                style={{ marginLeft: -10 }}
                class="mb-2"
                src={logo2}
                alt="MultiPass"
                width="200"
                height="80"
              />
              <p
                className="text-muted"
                style={{ marginLeft: 15, marginTop: -20 }}
              >
                &copy; 2020-2021
              </p>
            </Col>
            <Col style={{ marginTop: 20 }}>
              <Row>
                <h5>Contacto</h5>
              </Row>
              <Row>
                <Col>
                  <a style={{ color: "black" }} href="#">
                    <span
                      style={{ fontSize: 30 }}
                      className="mdi mdi-instagram"
                    />
                  </a>
                </Col>
                <Col>
                  <a style={{ color: "black" }} href="#">
                    <span
                      style={{ fontSize: 30 }}
                      className="mdi mdi-facebook "
                    />
                  </a>
                </Col>
                <Col>
                  <a style={{ color: "black" }} href="#">
                    <span
                      style={{ fontSize: 30 }}
                      className="mdi mdi-twitter "
                    />
                  </a>
                </Col>
                <Col>
                  <a style={{ color: "black" }} href="#">
                    <span
                      style={{ fontSize: 30 }}
                      className="mdi mdi-email-outline "
                    />
                  </a>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Row>
      {/*  <Navbar sticky="bottom" bg="dark" variant="dark">
            <Nav>
            <Navbar.Text>Copyright © 2020 - Todos los derechos reservados - MultiPass S.L.</Navbar.Text>
            </Nav>
            <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>Trabajo para <a href="https://www.code4jobs.com/">Code4Jobs</a></Navbar.Text>
          </Navbar.Collapse>
      </Navbar> */}
    </>
  );
};

export default Footer;
