import { U as User, P as Perfil } from "./main-49fd5316.js";
import { I as Incidencia } from "./incidencias-d0cbacd7.js";
const nuevaIncidenciaVista = {
  template: `
  <div
  class="container d-flex mt-5 justify-content-center">
  <div class="col-12">
      <h1 class="text-center p-2">Nueva Incidencia</h1>
      <form id="form_proyecto" class="p-3" novalidate>
          <label class="mt-3 form-label" for="nombre">Nombre Equipo: </label>
          <input
            id="nombre_equipo" 
            type="text" 
            class="form-control" 
            value="" 
            placeholder ="Nombre del proyecto" 
            required 
          />
          <div class="invalid-feedback">El nombre no es correcto</div>

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
              Crear nuevo proyecto
          </button>
      </form>
  </div>
</div>
    `,
  script: () => {
    document.querySelector("#form_proyecto").addEventListener("submit", async function(e) {
      e.preventDefault();
      try {
        const user = await User.getUser();
        const perfil = await Perfil.getByUserId(user.id);
        const incidencia = {
          nombre_equipo: document.querySelector("#nombre_equipo").value,
          descripcion: document.querySelector("#descripcion").value,
          perfil_id: perfil.id
        };
        await Incidencia.create(incidencia);
        alert("Proyecto creado con éxito");
        window.location.href = "/#/incidencias";
      } catch (error) {
        console.log(error);
        alert("Error al crear proyecto " + error);
      }
    });
  }
};
export {
  nuevaIncidenciaVista as default
};
