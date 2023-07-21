import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { NotificationService } from '../common-services';
import { AUTH_REQUIRED, AuthService } from '../security';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorMessagePipe } from '../../lib/my-core/pipes/cadenas.pipe';
import { FormButtonsComponent } from '../common-component/form-buttons/form-buttons.component';
import { TypeValidatorDirective, UppercaseValidatorDirective, NIFValidatorDirective } from '../../lib/my-core/directives/mis-validadores.directive';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor, JsonPipe } from '@angular/common';

export abstract class RESTDAOService<T, K> {
  protected baseUrl = environment.apiURL;
  constructor(protected http: HttpClient, entidad: string, protected option = {}) {
    this.baseUrl += entidad;
  }
  query(): Observable<Array<T>> {
    return this.http.get<Array<T>>(this.baseUrl, this.option);
  }
  get(id: K): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`, this.option);
  }
  add(item: T): Observable<T> {
    return this.http.post<T>(this.baseUrl, item, this.option);
  }
  change(id: K, item: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${id}`, item, this.option);
  }
  remove(id: K): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${id}`, this.option);
  }
}

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
    styleUrls: ['./formulario.component.css'],
    standalone: true,
    imports: [NgIf, FormsModule, TypeValidatorDirective, UppercaseValidatorDirective, NIFValidatorDirective, FormButtonsComponent, NgFor, JsonPipe, ErrorMessagePipe]
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
