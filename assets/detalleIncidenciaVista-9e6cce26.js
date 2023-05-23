import { I as Incidencia } from "./incidencias-d0cbacd7.js";
import { P as Perfil } from "./main-49fd5316.js";
const detalleIncidenciaVista = {
  template: `
<div class="container mt-5">
  <div class="row">
    <div class="col-12">
      <a href="#/incidencias" class="btn btn-outline-secondary btn-sm">< Incidencias</a>
      <h1 id="nombre_proyecto" class="w-100 text-center p-2"></h1>
      <div class="d-flex justify-content-center m-5">
       <h1 id="titulo"></h1> 
      </div>
    </div>
    <!-- DAtos proyecto -->
    <div class="col-12 col-md-4 mt-2">
      <h5>Información general: </h5>
      <p>Autor: <span id="autor" class="text-center p-2"></span></p>
      <p>Equipo: <span id="nombre_equipo" class="text-center p-2"></span></p>
      <h5>Descripción:</h5>
      <p id="descripcion"></p>
    </div>
  </div>
</div>
    `,
  script: async (id) => {
    const incidencia = await Incidencia.getById(id);
    const perfil = await Perfil.getById(incidencia.perfil_id);
    const titulo = document.querySelector("#titulo");
    const autor = document.querySelector("#autor");
    const descripcion = document.querySelector("#descripcion");
    const nombre_equipo = document.querySelector("#nombre_equipo");
    const tituloIncidendia = `Incidencia numero ${incidencia.id}`;
    titulo.innerHTML = tituloIncidendia;
    descripcion.innerHTML = incidencia.descripcion;
    autor.innerHTML = perfil.nombre;
    nombre_equipo.innerHTML = incidencia.nombre_equipo;
  }
};
export {
  detalleIncidenciaVista as default
};
