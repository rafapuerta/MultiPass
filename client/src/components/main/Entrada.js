import { Card, Row, Col, OverlayTrigger, Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function Entrada({
  usuario,
  entrada,
  DateTime,
  QRCode,
  eliminarEntrada,
  categoria,
  tier,
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  var fecha = DateTime.fromISO(entrada.fecha);
  var qr = JSON.stringify({
    email: usuario.email,
    dni: usuario.dni,
    entrada: {
      id: entrada.id,
      artista: entrada.grupo,
      entrada: entrada.numero,
      lugar: entrada.sala,
      fecha: entrada.fecha,
    },
  });

  return (
    <>
      <Card key={entrada.id} style={{ margin: 10, maxWidth: 340 }}>
        <Card.Img
          variant="top"
          src={entrada.cartel}
          style={{ maxWidth: 340, height: 500 }}
        />
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
              <Col>
                <h4 style={{ fontWeight: 600 }}>{entrada.grupo}</h4>
              </Col>
              <Col sm={2}>
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={tier(entrada.categoria)}
                >
                  {categoria(entrada.categoria)}
                </OverlayTrigger>
              </Col>
            </Row>
          </Card.Title>
          <Card.Text>
            <Row className="d-flex justify-content-center">
              <Col>
                <strong>Fecha:</strong> <br />
                {`${fecha.day}/${fecha.month}/${fecha.year} @${fecha.hour}:${fecha.minute}`}
              </Col>
              <Col>
                <strong>Slots:</strong> <br />
                <h4>{entrada.peso}</h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>Lugar:</strong> {entrada.sala}
              </Col>
              <Col>
                <strong>Entrada:</strong> <br />
                <h4 style={{ color: "#FF9900" }}>{entrada.numero}</h4>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-center">
                <Link to="/usuario" onClick={handleShow}>
                  <QRCode value={qr} />
                </Link>
              </Col>
            </Row>
          </Card.Text>
          <Button
            size="sm"
            variant="warning"
            value={entrada.id}
            onClick={eliminarEntrada}
            block
          >
            Eliminar
          </Button>
        </Card.Body>
      </Card>
      <Modal
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
        className="justify-items-center"
      >
        <QRCode includeMargin={true} size={360} value={qr} />
      </Modal>
    </>
  );
}
