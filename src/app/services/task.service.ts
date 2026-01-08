import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // 1. Importar HttpClient
import { firstValueFrom } from 'rxjs';             // 1. Importar utilidad para Promesas
import { Tarea } from '../interfaces/tarea'; // Importamos nuestra interfaz

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private _url = 'http://localhost:3000/tareas';

  // ¡La lógica de negocio vive aquí ahora!
  // Hacemos el array 'private' para que los componentes
  // no puedan modificarlo directamente, solo a través de nuestros métodos.
  private listaDeTareas: Tarea[] = [
    { id: 1, titulo: "Comprar el pan", completada: true },
    { id: 2, titulo: "Estudiar Servicios de Angular", completada: false }
  ];

  constructor(private http: HttpClient) { }

  /**
   * Método público para obtener todas las tareas.
   * Devuelve una copia del array para proteger el original.
   */
  /*getTareas(): Tarea[] {
    return [...this.listaDeTareas]; // Usamos '...' (spread syntax) para devolver una copia
  }*/

    /**
   * Obtiene todas las tareas del servidor (GET /tareas)
   */
  async getTareas(): Promise<Tarea[]> {
    // Hacemos la petición GET a la URL.
    // Usamos el genérico <Tarea[]> para decirle a TypeScript que esperamos un array de Tareas.
    // firstValueFrom convierte el Observable en una Promesa.
    return firstValueFrom(this.http.get<Tarea[]>(this._url));
  }

  /**
   * Método público para añadir una nueva tarea.
   * Recibe el título de la nueva tarea como argumento.
   * @param titulo El título de la nueva tarea.
   */
/*   agregarTarea(titulo: string) {
    // Verificamos que el título no esté vacío
    if (titulo.trim().length === 0) {
      return; // No hacemos nada si está vacío
    }

    // Creamos la nueva tarea
    const nuevaTarea: Tarea = {
      id: Date.now(), // Usamos un timestamp como ID simple
      titulo: titulo,
      completada: false
    };

    // Añadimos la nueva tarea al principio de nuestro array
    this.listaDeTareas.unshift(nuevaTarea);
  } */

  /**
   * Envía una nueva tarea al servidor (POST /tareas)
   */
  async agregarTarea(tarea: any): Promise<Tarea> {
    // 1. Eliminamos el ID temporal (0) antes de enviar
    //    Creamos una copia del objeto sin el campo 'id' para que JSON Server lo genere limpio.
    const { id, ...tareaSinId } = tarea;

    // 2. Hacemos la petición POST enviando el objeto limpio
    // Parámetros: URL de la colección y el objeto a crear (body).
    return firstValueFrom(
      this.http.post<Tarea>(this._url, tareaSinId)
    );
  }

/*   getTareaPorId(id: number): Tarea | undefined {
    return this.listaDeTareas.find(t => t.id === id);
  } */

    /**
   * Obtiene una tarea por su ID (GET /tareas/ID)
   */
  async getTareaPorId(id: string | number): Promise<Tarea> {
    // Construimos la URL específica (ej: http://localhost:3000/tareas/1)
    const urlEspecifica = `${this._url}/${id}`;
    return firstValueFrom(this.http.get<Tarea>(urlEspecifica));
  }

  /**
   * Actualiza una tarea existente (PUT /tareas/ID)
   * Se envía el objeto completo con los cambios ya aplicados.
   */
  async updateTarea(tarea: Tarea): Promise<Tarea> {
    // Construimos la URL específica con el ID de la tarea
    const urlEspecifica = `${this._url}/${tarea.id}`;

    // Hacemos la petición PUT enviando el objeto modificado
    return firstValueFrom(
      this.http.put<Tarea>(urlEspecifica, tarea)
    );
  }

  /**
   * Elimina una tarea por su ID (DELETE /tareas/ID)
   */
  async deleteTarea(id: string | number): Promise<void> {
    const urlEspecifica = `${this._url}/${id}`;
    
    // Hacemos la petición DELETE. No enviamos body.
    // firstValueFrom convierte el Observable en Promesa.
    return firstValueFrom(
      this.http.delete<void>(urlEspecifica)
    );
  }
}
