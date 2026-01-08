import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Input, Output, EventEmitter } from '@angular/core';
import { Tarea } from '../../interfaces/tarea'; 
import { IonCard, IonItem, IonCheckbox, IonInput, IonButton, IonIcon } from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  imports: [FormsModule, // 2. Añadirlo a los imports
    IonCard, IonItem, IonCheckbox, IonInput, IonButton, IonIcon] 
})
export class TaskItemComponent  implements OnInit {

  @Input() tarea!: Tarea;
    // 1. Definimos los eventos que enviaremos al padre
  @Output() onEstadoChange = new EventEmitter<void>();
  @Output() onBorrar = new EventEmitter<void>();
  @Output() onTituloChange = new EventEmitter<string>(); 

  constructor() { 
    addIcons({ trashOutline });
  }

  ngOnInit() {}

  mostrarDetalles() {
    console.log('Datos de la tarea:', this.tarea);
  }

  // 2. Métodos que se ejecutan desde el HTML del hijo y disparan el aviso
  cambiarEstado() {
    this.onEstadoChange.emit();
  }

  borrarClick(event: Event) {
    event.stopPropagation();
    this.onBorrar.emit();
  }

  guardarTitulo() {
    // Enviamos el nuevo título al padre
    this.onTituloChange.emit(this.tarea.titulo);
  }

}
