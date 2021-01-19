import { useEffect, useState } from "react";
import {
  Card,
  Container,
  Spinner,
  Row,
  Col,
  CardColumns,
} from "react-bootstrap";
import Post from "./Post";

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
        /* setLoading(false); */
      })
      .catch((error) => {
        console.error(error);
        /* setLoading(false); */
      });
  }, []);

  if (loading) {
    return (
      <Container className="vh-100 text-center align-content-center">
        <Spinner animation="border" role="status"></Spinner>
        <h1 style={{ marginRight: 10 }}>Cargando</h1>
      </Container>
    );
  } else {
    const mostrarPosts = posts.data.map((post) => {
      let fecha = DateTime.fromISO(post.published);
      return (
        <Card>
          <Card.Img variant="top" src={post.featured_image} />
          <Row>
            <Col>
              <Card.Title>
                <h3>{post.title}</h3>
                <h6>{`${fecha.day}/${fecha.month}/${fecha.year}`}</h6>
              </Card.Title>
              <Card.Body>
                <div dangerouslySetInnerHTML={{ __html: post.summary }} />
              </Card.Body>
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
