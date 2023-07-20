import { Component, Injectable } from '@angular/core';
import { RESTDAOService } from '../base-code/rest-dao-service.class';
import { HttpClient, HttpContext } from '@angular/common/http';
import { NotificationService } from '../common-services';
import { AUTH_REQUIRED, AuthService } from '../security';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PersonaDaoService extends RESTDAOService<any, number> {
  constructor(http: HttpClient) {
    super(http, 'personas', { context: new HttpContext().set(AUTH_REQUIRED, true) })
  }
  load(pagina = 0, filas = 10): Observable<any> {
    return this.http.get(`${this.baseUrl}?_page=${pagina}&_rows=${filas}`)
  }
}
@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  elemento: any = { }
  modo: 'add' | 'edit' = 'add'

  constructor(private dao: PersonaDaoService, private notify: NotificationService, public auth: AuthService) {}

  add() {
    this.elemento = {}
    this.modo = 'add'
  }
  edit() {
    this.dao.get(this.elemento.id).subscribe({
      next: data => {
        this.elemento = data
        this.modo = 'edit'
      },
      error: err => this.notify.add(JSON.stringify(err))
    })
    // this.elemento = { id: 1, nombre: 'Pepito', apellidos: 'Grillo', correo: 'pepito.grillo@example.com', nif: '12345678z', edad: 99 }
    // this.modo = 'edit'
  }

  cancel() {
    this.elemento = {}
  }

  send() {
    switch(this.modo) {
      case 'add':
        // alert(`POST: ${JSON.stringify(this.elemento)}`)
        // this.cancel()
        this.dao.add(this.elemento).subscribe({
          next: () => alert('OK'),
          error: err => this.notify.add(JSON.stringify(err))
        })
        break;
      case 'edit':
        // alert(`PUT: ${JSON.stringify(this.elemento)}`)
        // this.cancel()
        this.dao.change(this.elemento.id, this.elemento).subscribe({
          next: () => alert('OK'),
          error: err => this.notify.add(JSON.stringify(err))
        })
        break;
    }
  }
  listado = [{ id: 1, nombre: 'Pepito', apellidos: 'Grillo', correo: 'pepito.grillo@example.com', nif: '12345678z', edad: 99 }]
  load() {
    this.dao.load(1, 5).subscribe({
      next : data => this.listado = data.content
    })
  }
}
