import { Component, OnInit } from '@angular/core';

import { Input } from '@angular/core';
import { Tarea } from '../../interfaces/tarea'; 
import { IonicModule } from '@ionic/angular'; 

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  imports: [IonicModule] 
})
export class TaskItemComponent  implements OnInit {

  @Input() tarea!: Tarea;

  constructor() { }

  ngOnInit() {}

  mostrarDetalles() {
    console.log('Datos de la tarea:', this.tarea);
  }

}
