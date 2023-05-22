import { Incidencia } from '../../bd/incidencias'
import { Perfil } from '../../bd/perfil'

export default {
  template: `
    <main style="padding-top: 100px">
    <div class="container">
        <h1>Incidencias</h1>
        <a href="/#/nuevoProyecto" id="nuevoProyecto" class="btn btn-success mt-3">Nuevo Proyecto</a>
        <a href="/#/misProyectos" id="misProyectos" class="btn btn-warning mt-3 ms-2">Mis Proyectos</a>
        <table id="tablaProyectos" class="table table-striped table-hover mt-5 align-middle">
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
      // Capturamos todos los usuarios de la tabla perfiles
      const incidencias = await Incidencia.getAll()

      let tabla = ''
      for (const incidencia of incidencias) {
        // const perfil = await Perfil.getById(incidencia.perfil_id)
        // console.log(perfil)
        tabla += `
      <tr>
        <td>${incidencia.created_at}</td>
        <td>aa</td>
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
      `
      }
      const tablaProyectosBody = document.querySelector('#tablaProyectos tbody')
      if (tablaProyectosBody) tablaProyectosBody.innerHTML = tabla

      const tablaProyectos = document.querySelector('#tablaProyectos')
      if (tablaProyectos) {
        tablaProyectos.addEventListener('click', async (e) => {
          // Si hemos hecho click sobre uno de los iconos capturaremos el id del proyecto
          const id = e.target.dataset.id
          // BORRAR PROYECTO (CUIDADO!!! HABRÍA QUE ELIMINAR TAMBIEN TODOSS LAS REFERENCIAS A ESTE PROYECTO, COMO LOS COMENTARIOS ASOCIADOS)
          if (e.target.classList.contains('borrar')) {
            try {
              const proyectoABorrar = await Proyecto.getById(id)

              const seguro = confirm('¿Está seguro que desea borrar el proyecto? Se eliminarán todos sus comentarios y notas ' + proyectoABorrar.nombre + ', ' + proyectoABorrar.nombre)

              if (seguro) {
                await Proyecto.delete(id)
              }
              window.location.href = '/trabajos_alumnos/#/proyectos'
            } catch (error) {
              alert('No se han podido borrar el proyecto' + error)
            }
          }

          if (e.target.classList.contains('editar')) {
            window.location.href = '/trabajos_alumnos/#/editarProyecto/' + id
          }

          if (e.target.classList.contains('detalle')) {
            window.location.href = '/trabajos_alumnos/#/detalleProyecto/' + id
          }
        })
      }
    } catch (error) {
      alert('No se han podido cargar la tabla de usuarios ' + error)
    }
  }
}
