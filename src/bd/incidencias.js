// Importamos la conexión a la base de datos
import { supabase } from './supabase.js'
export class Incidencia {
  // Mapping de propiedades de la tabla perfiles
  constructor (id = null, created_at = null, nombre_equipo = null, perfil_id = null, descripcion = null) {
    this.id = id
    this.created_at = created_at
    this.descripcion = descripcion
    this.nombre_equipo = nombre_equipo
    this.perfil_id = perfil_id
  }

  // leer todos
  static async getAll () {
    const { data: incidencias, error } = await supabase
      .from('incidencias')
      .select('*')
    if (error) {
      throw new Error(error.message)
    }
    // devuelve array de objetos
    return incidencias.map(({ id, created_at, descripcion, nombre_equipo, perfil_id }) => {
      return new Incidencia(id, created_at, descripcion, nombre_equipo, perfil_id)
    })
  }

  // leer registro por id (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async getById (id) {
    const { data: incidencia, error } = await supabase
      .from('incidencias')
      .select('*')
      .eq('id', id)
      .single()
    if (error) {
      throw new Error(error.message)
    }
    // Devuelve un nuevo objeto con los datos del registro
    return new Incidencia(incidencia.id, incidencia.created_at, incidencia.descripcion, incidencia.nombre_equipo, incidencia.perfil_id)
  }

  static async getByUserId (id) {
    const { data: incidencia, error } = await supabase
      .from('incidencias')
      .select('*')
      .eq('user_id', id)
      .single()
    if (error) {
      console.log(error.message)
      throw new Error(error.message)
    }
    // Devuelve un nuevo objeto con los datos del registro
    return new Incidencia(incidencia.id, incidencia.created_at, incidencia.descripcion, incidencia.nombre_equipo, incidencia.perfil_id)
  }

  // crear registro (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async create (perfilData) {
    const { error } = await supabase
      .from('incidencias')
      .insert(perfilData)
      .select()
      // console.log('nuevo perfil ',error);
    if (error) {
      throw new Error(error.message)
    }
    return true
  }

  // actualizar
  async update () {
    const { error } = await supabase
      .from('incidencias')
      .update({
        descripcion: this.descripcion,
        nombre_equipo: this.nombre_equipo
      })
      .eq('id', this.id)
      .single()
    if (error) {
      throw new Error(error.message)
    }
    return true
  }

  // borrar
  static async delete (id) {
    const { error } = await supabase
      .from('incidencias')
      .delete()
      .eq('id', id)
    if (error) {
      throw new Error(error.message)
    }
    return true
  }
}
