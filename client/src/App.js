import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter, Route} from "react-router-dom"

import Cabecera from "./Cabecera"
import Inicio from "./Inicio"
import Usuario from "./Usuario"
import Footer from "./Footer"
import Conciertos from "./Conciertos"

function App() {
  return (
    <BrowserRouter>
    <Cabecera />
    <Route exact path="/">
      <Inicio />
    </Route>
    <Route exact path="/usuario">
      <Usuario />
    </Route>
    <Route exact path="/conciertos">
      <Conciertos />
    </Route>
    <Footer />
    </BrowserRouter>
  );
}

export default App;
