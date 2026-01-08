import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router'; // Importar RouterLink para el botón 'Volver'
import { TaskService } from 'src/app/services/task.service';
import { Tarea } from 'src/app/interfaces/tarea';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonBadge, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-detalle-tarea',
  templateUrl: './detalle-tarea.page.html',
  styleUrls: ['./detalle-tarea.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, // ¡Necesario para el routerLink en el HTML!
    IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonBadge, IonButton
  ]
})
export class DetalleTareaPage implements OnInit {

  tarea: Tarea | undefined;

  constructor(
    private activatedRoute: ActivatedRoute, // Inyectar ActivatedRoute
    private taskService: TaskService        // Inyectar nuestro servicio de tareas
  ) { }

/*   ngOnInit() {
    // Leer el parámetro 'id' de la URL
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      // Usar el ID para buscar la tarea
      this.tarea = this.taskService.getTareaPorId(Number(id));
    }
  } */

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      try {
        // Esperamos la respuesta del servidor
        this.tarea = await this.taskService.getTareaPorId(id);
      } catch (error) {
        console.error('Tarea no encontrada', error);
      }
    }
  }
}