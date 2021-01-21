import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter, Route} from "react-router-dom"
import {Alert} from "react-bootstrap"
import {useState} from "react"

import {Cabecera, Footer, Conciertos, Inicio, Registro, Usuario, Noticias, Post} from "./components"

//TODO: 
// - Landing
// -- Centrar el rótulo
// encapsular vídeo y poner "noticias" debajo

function App() {
  const [sesion, setSesion] = useState(false)
  const [usuario, setUsuario] =useState({})
  const [feedback, setFeedback] = useState("")


  const login = (email, pass) => {
    fetch("/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: pass,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log({ status: "Denegado"});
          setFeedback(<Alert variant="danger">Datos incorrectos</Alert>);
          setSesion(false)
        } else {
          setUsuario(data);
          setSesion(true);
        }
      });
  };

  const logout = () => {
    fetch("/user/logout")
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(data);
        } else {
          setUsuario({});
          setSesion(false);
        }
      });
  };



  return (
    <BrowserRouter>
    <Cabecera login={login} usuario={usuario} sesion={sesion}feedback={feedback} setFeedback={setFeedback}/>
    <Route exact path="/">
      <Inicio />
    </Route>
    
    <Route exact path="/usuario">
      <Usuario usuario={usuario} setUsuario={setUsuario} sesion={sesion} setSesion={setSesion} logout={logout}/>
    </Route>
    <Route exact path="/usuario/registrar">
      <Registro />
    </Route>
    <Route exact path="/conciertos">
      <Conciertos usuario={usuario} sesion={sesion}/>
    </Route>
    <Route exact path="/noticias">
      <Noticias />
    </Route>
    <Route exact path="/post/:slug">
      <Post />
      </Route>
    <Footer />
    </BrowserRouter>
  );
}

export default App;
