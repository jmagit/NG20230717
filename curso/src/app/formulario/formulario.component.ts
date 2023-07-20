import { Component } from '@angular/core';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  elemento: any = { }
  modo: 'add' | 'edit' = 'add'

  add() {
    this.elemento = {}
    this.modo = 'add'
  }
  edit() {
    this.elemento = { id: 1, nombre: 'Pepito', apellidos: 'Grillo', correo: 'pepito.grillo@example.com', nif: '12345678z', edad: 99 }
    this.modo = 'edit'
  }

  cancel() {
    this.elemento = {}
  }

  send() {
    switch(this.modo) {
      case 'add':
        alert(`POST: ${JSON.stringify(this.elemento)}`)
        this.cancel()
        break;
      case 'edit':
        alert(`PUT: ${JSON.stringify(this.elemento)}`)
        this.cancel()
        break;
    }
  }
}
