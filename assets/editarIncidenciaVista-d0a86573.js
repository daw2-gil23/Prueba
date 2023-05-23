import { I as Incidencia } from "./incidencias-d0cbacd7.js";
import "./main-49fd5316.js";
const editarIncidenciaVista = {
  template: `
    <div
    class="container d-flex mt-5 justify-content-center">
    <div class="col-12">
        <a href="#/Incidencias" class="btn btn-outline-secondary btn-sm">< Incidencias</a>
        <h1 class="text-center p-2">Editar Proyecto</h1>
        <form id="formIncidencia" class="p-3" novalidate>
          <label class="mt-3 form-label" for="user_id">created_at: </label>    
          <input
              id="created_at" 
              type="text" 
              class="form-control text-black-50 " 
              value="" 
              disabled
              
            /> 
            <label class="mt-3 form-label" for="id">nombre_equipo: </label>
            <input
              id="nombre_equipo" 
              type="text" 
              class="form-control text-black-50" 
              value="" 
              required
            />  
  
            <label class="mt-3 form-label" for="descripcion">Descripción: </label>
            <textarea 
              id="descripcion"
              class="form-control" 
              value="" 
              required 
              />
            </textarea>
            <div class="invalid-feedback">Este campo no es correcto</div>

            <button type="submit" class="mt-5 btn btn-success">
                Actualizar proyecto
            </button>
            <button type="button" onclick="history.back()" class="mt-5 btn btn-primary">
                Cancelar
            </button>
        </form>
    </div>
  </div>
      `,
  script: async (id = -1) => {
    const incidencia = await Incidencia.getById(id);
    const created_at = document.querySelector("#created_at");
    const nombre_equipo = document.querySelector("#nombre_equipo");
    const descripcion = document.querySelector("#descripcion");
    created_at.value = incidencia.created_at;
    nombre_equipo.value = incidencia.nombre_equipo;
    descripcion.value = incidencia.descripcion;
    const formProyecto = document.querySelector("#formIncidencia");
    formProyecto.addEventListener("submit", async function(e) {
      e.preventDefault();
      incidencia.nombre_equipo = nombre_equipo.value;
      incidencia.descripcion = descripcion.value;
      incidencia.update();
      window.location.href = "/#/incidencias";
    });
  }
};
export {
  editarIncidenciaVista as default
};
