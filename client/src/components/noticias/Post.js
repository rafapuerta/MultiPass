import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Spinner,
  Button,
  Pagination,
} from "react-bootstrap";

const { DateTime } = require("luxon");

export default function Post() {
  let params = useParams();

  const [slug, setSlug] = useState(params.slug);
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState("");
  const [prev, setPrev] = useState("");

  useEffect(() => {
    setLoading(true);
    console.log("llamando...")
    fetch("/noticias/post/" + slug)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Something went wrong on api server!");
        }
      })
      .then((data) => {
        setPost(data.data);
        setNext(data.meta.next_post);
        setPrev(data.meta.previous_post);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <Container className="d-flex flex-row align-items-center justify-content-center vh-100 text-center">
        <h1 style={{ marginRight: 20 }}>Cargando...</h1>
        <Spinner animation="border" role="status"></Spinner>
      </Container>
    );
  } else {
    let fecha = DateTime.fromISO(post.published);
    return (
      <Container style={{ paddingBottom: 60, paddingTop: 60 }}>
        <Row>
          <Col>
            <h1>{post.title}</h1>
            <p style={{color:"#999999"}}>{`${fecha.day}/${fecha.month}/${fecha.year}`}</p>
          </Col>
        </Row>
        <Row style={{marginTop: 30}}>
          <Col>
            <div dangerouslySetInnerHTML={{ __html: post.body }} />
          </Col>
        </Row>
        <Row className="d-flex flex-row align-items-center justify-content-center">
          <Pagination>
            <Pagination.Prev
            disabled={prev === null}
              onClick={() => {
                setSlug(prev.slug);
              }}
            >
              Anterior
            </Pagination.Prev>
            <Pagination.Item>
              <Link to="/noticias">
                Volver
              </Link>
            </Pagination.Item>
            <Pagination.Next
            disabled={next === null}
              onClick={() => {
                setSlug(next.slug);
              }}
            >
              Siguiente
            </Pagination.Next>
          </Pagination>
        </Row>
      </Container>
    );
  }
}
