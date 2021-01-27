import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Container, Spinner, Row, Col, CardColumns } from "react-bootstrap";

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
        <Card >
          <Card.Img
            variant="top"
            src={post.featured_image}
          />
          <Row>
            <Col>
              <Card.Title>
                <Link style={{ color: "black" }} to={"/post/" + post.slug}>
                  {post.title}
                </Link>
                <h6
                  style={{ color: "#999999" }}
                >{`${fecha.day}/${fecha.month}/${fecha.year}`}</h6>
              </Card.Title>
              <Card.Body>{post.summary}</Card.Body>
            </Col>
          </Row>
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
