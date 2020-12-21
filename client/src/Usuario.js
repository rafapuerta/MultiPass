import { useEffect, useState } from "react";


export default function Usuario() {
const [datos, setDatos] = useState({})

  useEffect(()=>{
    fetch("http://localhost:3001/user/info").then(respuesta => respuesta.json()).then(data => {
      if(data.error){
        //enseñar diálogo Login
      return
      }else{
      setDatos(data)
      }
    })
  })
if( !datos.error ){
  return (
    <div class="form" id="perfil">
      <h1>{datos.nombre} {datos.apellido1} {datos.apellido2}</h1>
      <p id="emailPerfil">Email: {datos.email}</p>
      <p>Teléfono: {datos.telf}</p>
      <p>DNI: {datos.dni}</p>
      <p id="feedbackEditar"></p>
      <div id="entradasUser">Entradas</div>
      <button onclick="editar()">Editar datos</button>
      <button onclick="borrar()">Borrar perfil</button>
      <button onclick="unload()">Cerrar sesión</button>
      </div>
  )}else{
    return <h1>No logueado</h1>
  }
}
