import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonList, IonItem, IonInput, IonButton, IonButtons, IonIcon } from '@ionic/angular/standalone';

import { TaskService } from '../services/task.service';
import { Tarea } from '../interfaces/tarea';
import { TaskItemComponent } from '../components/task-item/task-item.component'; 
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';

import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { settingsOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonIcon, IonButtons, IonButton, IonInput, IonItem, IonList, IonCol, IonRow, IonGrid, IonHeader, IonToolbar, IonTitle, IonContent, 
    TaskItemComponent, CommonModule, FormsModule, RouterLink],
})
export class HomePage {

  public listaDeTareas: Tarea[] = [];

/*   listaDeTareas: Tarea[] = [
    { id: 1, titulo: "Comprar el pan", completada: true },
    { id: 2, titulo: "Estudiar componentes de Angular", completada: false },
    { id: 3, titulo: "Hacer el reto de la UT2", completada: false }
  ]; */

  // Nueva propiedad: un objeto Tarea para enlazar con el formulario
  public nuevaTarea: Tarea = {
    id: 0, // Daremos un ID real al añadirla
    titulo: "", // Enlazaremos esto al input
    completada: false // Valor por defecto
  };

  constructor(private taskService: TaskService) {
    addIcons({ settingsOutline });
  }

  // Usamos ionViewWillEnter en lugar de ngOnInit para que se recargue
  // cada vez que volvemos a la pantalla (útil para cuando borremos/editemos)
  async ionViewWillEnter() {
    await this.cargarTareas();
  }


  async cargarTareas() {
    try {
      // Ahora debemos esperar (await) a que lleguen los datos del servidor
      this.listaDeTareas = await this.taskService.getTareas();
    } catch (error) {
      console.error('Error al cargar las tareas:', error);
      // Aquí podríamos mostrar un Toast indicando el error
    }
  }

  // Nuevo método para añadir la tarea
/*   agregarTarea() {
    // Verificamos que el título no esté vacío
    if (this.nuevaTarea.titulo.trim().length === 0) {
      return; // No hacemos nada si está vacío
    }

    // Creamos una copia del objeto para añadir a la lista
    // Le asignamos un ID único y usamos el título del formulario
    const tareaParaAnadir: Tarea = {
      ...this.nuevaTarea, // Copia las propiedades existentes (titulo, completada)
      id: Date.now()     // Asigna un nuevo ID
    };

    // Añadimos la nueva tarea al principio del array
    this.listaDeTareas.unshift(tareaParaAnadir);

    // Reseteamos el objeto del formulario para la siguiente tarea
    this.nuevaTarea = { id: 0, titulo: "", completada: false };
  } */

  async agregarTarea() {
    // Validación básica sobre el objeto
    if (this.nuevaTarea.titulo.trim().length === 0) {
      return;
    }

    try {
      // 1. Llamamos al servicio pasando EL OBJETO COMPLETO
      const tareaCreada = await this.taskService.agregarTarea(this.nuevaTarea);
      console.log('Tarea creada con éxito:', tareaCreada);

      // 2. Limpiamos el formulario reseteando el objeto
      this.nuevaTarea = {
        id: 0,
        titulo: '',
        completada: false
      };

      // 3. Recargamos la lista desde el servidor para mostrar los cambios
      await this.cargarTareas();

    } catch (error) {
      console.error('Error al guardar:', error);
    }
  }

  async borrarTarea(id: string | number) {
    try {
      // 1. Llamamos al servicio para borrar
      await this.taskService.deleteTarea(id);
      
      // 2. Recargamos la lista para que desaparezca
      // (Opción A: Recarga completa)
      await this.cargarTareas();

    } catch (error) {
      console.error('Error al borrar:', error);
    }
  }

  async cambiarEstado(tarea: Tarea) {
    try {
      await this.taskService.updateTarea(tarea);
    } catch (error) {
      console.error('Error al actualizar:', error);
    }
  }

  async guardarCambioTitulo(tarea: Tarea) {
    try {
      await this.taskService.updateTarea(tarea);
      console.log('Título guardado');
    } catch (error) {
      console.error('Error al guardar título:', error);
    }
  }

}
