import "./App.css";
import fondo from "./videoplayback.mp4";
import {Container} from "react-bootstrap"
export default function Inicio() {
  return (
      <>
      <video style={{marginTop:60}}  className="videoTag" autoPlay loop muted>
        <source src={fondo} type="video/mp4" />
      </video>
      <Container className="vertical-center">
          <Container className="horizontal-center">
          <h1 style={{color:"#FF9900"}} >MultiPass</h1>
          <p>Si no tenemos entrada, el concierto es en casa del Artista.</p>
          </Container>
      </Container>
    </>
  );
}
