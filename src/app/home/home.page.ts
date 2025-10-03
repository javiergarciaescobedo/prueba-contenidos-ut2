import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

import { Tarea } from '../interfaces/tarea';
import { TaskItemComponent } from '../components/task-item/task-item.component'; 
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, 
    TaskItemComponent, CommonModule],
})
export class HomePage {

  listaDeTareas: Tarea[] = [
    { id: 1, titulo: "Comprar el pan", completada: true },
    { id: 2, titulo: "Estudiar componentes de Angular", completada: false },
    { id: 3, titulo: "Hacer el reto de la UT2", completada: false }
  ];

  constructor() {}
}
