import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Container,
  Spinner,
  Row,
  Col,
  CardColumns,
} from "react-bootstrap";

const { DateTime } = require("luxon");

export default function Noticias() {
  const [posts, setPosts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/noticias/posts")
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Something went wrong on api server!");
        }
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container className="d-flex flex-row align-items-center justify-content-center vh-100 text-center">
        <h1 style={{ marginRight: 20 }}>Cargando...</h1>
        <Spinner animation="border" role="status"></Spinner>
      </Container>
    );
  } else {
    const mostrarPosts = posts.data.map((post) => {
      let fecha = DateTime.fromISO(post.published);
      return (
        <Card key={post.slug} style={{ margin: 10, maxWidth: 340 }}>
          <Card.Img variant="top" src={post.featured_image} />
          <Card.Body>
            <Card.Title>
              <Row
                style={{
                  paddingTop: 5,
                }}
              >
                <small class="text-muted">{`${fecha.day}/${fecha.month}/${fecha.year}`}</small>
              </Row>
              <Row
                style={{
                  paddingBottom: 5,
                }}
              >
                <Link style={{ color: "black" }} to={"/post/" + post.slug}>
                  <h3>{post.title}</h3>
                </Link>
              </Row>
            </Card.Title>
            <Card.Text>
              <Row className="d-flex justify-content-center">
                <Col>{post.summary}</Col>
              </Row>
            </Card.Text>
          </Card.Body>
        </Card>
      );
    });

    return (
      <>
        <Container style={{ paddingBottom: 60, paddingTop: 60 }}>
          <CardColumns>{mostrarPosts}</CardColumns>
        </Container>
      </>
    );
  }
}
