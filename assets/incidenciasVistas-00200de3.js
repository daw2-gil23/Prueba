import { I as Incidencia } from "./incidencias-d0cbacd7.js";
import { P as Perfil, U as User } from "./main-49fd5316.js";
const incidenciasVistas = {
  template: `
    <main style="padding-top: 100px">
    <div class="container">
        <h1>Incidencias</h1>
        <a href="/#/nuevaIncidencia" id="nuevaIncidencia" class="btn btn-success mt-3">Nueva Incidencia</a>
        <table id="tablaIncidencias" class="table table-striped table-hover mt-5 align-middle">
            <thead>
                <tr>
                    <th>Creada</th>
                    <th>Autor</th>
                    <th>Nombre_equipo</th>
                    <th>Descripcion</th>
                    <th class="w-100"></th>
                </tr>
            </thead>
            <tbody>
                       
                
                
            </tbody>
        </table>
    </div>
  </main>
  
  `,
  script: async () => {
    try {
      const incidencias = await Incidencia.getAll();
      let tabla = "";
      for (const incidencia of incidencias) {
        const perfil = await Perfil.getById(incidencia.perfil_id);
        tabla += `
      <tr>
        <td>${incidencia.created_at}</td>
        <td>${perfil.nombre}</td>
        <td>${incidencia.nombre_equipo}</td>
        <td class="w-100">${incidencia.descripcion}</td>
        <td class="text-end">
          <button
            data-id="${incidencia.id}"
            type="button"
            class="btn bg-danger detalle"
          >
          <img  data-id="${incidencia.id}" class="detalle w-100" src="/imagenes/iconos/icons8-acerca-de.svg" width="20" alt="" />
          </button>
          <button
            data-id="${incidencia.id}"
            type="button"
            class="btn bg-info editar mt-1"
          >
            <img src="/imagenes/iconos/icons8-editar.svg" width="20" alt="" class="editar" data-id="${incidencia.id}"/>
          </button>

          <button
              data-id="${incidencia.id}"
              type="button"
              class="btn bg-danger borrar mt-1"
          >
            <img  data-id="${incidencia.id}" class="borrar w-100" src="/imagenes/iconos/icons8-basura-llena.svg" width="20" alt="" />
          </button>
        </td>
      </tr>
      `;
      }
      const tablaIncidenciasBody = document.querySelector("#tablaIncidencias tbody");
      if (tablaIncidenciasBody)
        tablaIncidenciasBody.innerHTML = tabla;
      let rol = "anonimo";
      try {
        const usuarioLogueado = await User.getUser();
        const perfilLogueado = await Perfil.getByUserId(usuarioLogueado.id);
        if (perfilLogueado.rol)
          rol = perfilLogueado.rol;
      } catch (error) {
        console.log(error);
      }
      const tablaIncidencias = document.querySelector("#tablaIncidencias");
      if (tablaIncidencias) {
        tablaIncidencias.addEventListener("click", async (e) => {
          const id = e.target.dataset.id;
          if (e.target.classList.contains("borrar")) {
            if (rol !== "anonimo") {
              if (rol === "admin") {
                try {
                  const seguro = confirm("¿Está seguro que desea borrar La incidencia?");
                  if (seguro) {
                    await Incidencia.delete(id);
                    const filaEliminada = e.target.closest("tr");
                    if (filaEliminada) {
                      filaEliminada.remove();
                    }
                  }
                } catch (error) {
                  alert("No se han podido borrar la incidencia" + error);
                }
              } else {
                alert("Debes ser administrador para poder editarlo");
              }
            } else {
              alert("Debes iniciar sesion para eliminar");
            }
          }
          if (e.target.classList.contains("editar")) {
            if (rol !== "anonimo") {
              if (rol === "admin") {
                window.location.href = "/#/editarIncidencia/" + id;
              } else {
                alert("Debes ser administrador para poder editarlo");
              }
            } else {
              alert("Debes iniciar sesion para editar");
            }
          }
          if (e.target.classList.contains("detalle")) {
            window.location.href = "/#/detalleIncidencia/" + id;
          }
        });
      }
    } catch (error) {
      alert("No se han podido cargar la tabla de usuarios " + error);
    }
  }
};
export {
  incidenciasVistas as default
};
