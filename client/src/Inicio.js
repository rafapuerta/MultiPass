import "./App.css";
import fondo from "./img/videoplayback.mp4";
import { Container } from "react-bootstrap";

import logo from "./img/logo.svg";
import logo2 from "./img/logo2.svg";

export default function Inicio() {
  return (
    <>
    <header>
     <div class="overlay"></div>
  <video playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop">
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

<section class="my-5">
  <div class="container">
    <div class="row">
      <div class="col-md-8 mx-auto">
        <p>The HTML5 video element uses an mp4 video as a source. Change the source video to add in your own background! The header text is vertically centered using flex utilities that are build into Bootstrap 4.</p>
        <p>The overlay color can be changed by changing the <code>background-color</code> of the <code>.overlay</code> class in the CSS.</p>
        <p>Set the mobile fallback image in the CSS by changing the background image of the header element within the media query at the bottom of the CSS snippet.</p>
        <p class="mb-0">
          Created by <a href="https://startbootstrap.com">Start Bootstrap</a>
        </p>
      </div>
    </div>
  </div>
</section>



      {/* <div id="videoContainer">
        <video
          style={{ marginTop: 60 }}
          className="videoTag"
          autoPlay
          loop
          muted
        >
          <source src={fondo} type="video/mp4" />
        </video>
        <Container className="horizontal-center">
          <Container className="vertical-center">
            <img
              src={logo}
              width="150"
              height="150"
              alt="React Bootstrap logo"
            />
            <br />
            <img src={logo2} height="100" alt="React Bootstrap logo" />
            <p>Si no tenemos entrada, el concierto es en casa del Artista.</p>
          </Container>
        </Container>
      </div>
      <div class="jumbotron jumbotron-fluid">
        <div class="container">
          <h1 class="display-4">Fluid jumbotron</h1>
          <p class="lead">
            This is a modified jumbotron that occupies the entire horizontal
            space of its parent.
          </p>
        </div>
      </div> */}
    </>
  );
}
