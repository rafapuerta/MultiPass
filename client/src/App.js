import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter, Route} from "react-router-dom"
import {useState} from "react"

import Cabecera from "./Cabecera"
import Inicio from "./Inicio"
import Usuario from "./Usuario"
import Footer from "./Footer"
import Conciertos from "./Conciertos"
import Registro from './Registro';

//TODO: 
// - Moments.js Fechas
// - Edición datos usuario
// - Ordenar conciertos fecha (Moments.js?)
// - Eliminar entrada del MultiPass

function App() {
  const [loged, setLoged] = useState(false)
  const [usuario, setUsuario] =useState({})
  const sesion = (estado) => {setLoged(estado)}
  return (
    <BrowserRouter>
    <Cabecera usuario={usuario} setUsuario={setUsuario} sesion={loged} setSesion={sesion}/>
    <Route exact path="/">
      <Inicio />
    </Route>
    <Route exact path="/registro">
      <Registro />
    </Route>
    <Route exact path="/usuario">
      <Usuario usuario={usuario} setUsuario={setUsuario} sesion={loged} setSesion={sesion}/>
    </Route>
    <Route exact path="/conciertos">
      <Conciertos usuario={usuario} setUsuario={setUsuario} sesion={loged} setSesion={sesion}/>
    </Route>
    <Footer />
    </BrowserRouter>
  );
}

export default App;
