import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationService, NotificationType } from '../common-services';
import { Unsubscribable } from 'rxjs';
import { ElipsisPipe, CapitalizePipe } from '../../lib/my-core/pipes/cadenas.pipe';
import GraficoSvg from '../../lib/independientes/grafico-svg/grafico-svg.component';
import { SizerComponent } from '../../lib/my-core/components/sizer.component';
import { CardComponent } from '../common-component/card.component';
import { TypeValidatorDirective } from '../../lib/my-core/directives/mis-validadores.directive';
import { NgFor, NgIf, NgClass, UpperCasePipe, JsonPipe, SlicePipe, DecimalPipe, TitleCasePipe, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalculadoraComponent } from '../calculadora/calculadora.component';
import { NotificationComponent } from '../main/notification/notification.component';

@Component({
    selector: 'app-demos',
    templateUrl: './demos.component.html',
    styleUrls: ['./demos.component.css'],
    standalone: true,
    imports: [
        NotificationComponent,
        CalculadoraComponent,
        FormsModule,
        NgFor,
        TypeValidatorDirective,
        NgIf,
        NgClass,
        CardComponent,
        SizerComponent,
        GraficoSvg,
        UpperCasePipe,
        JsonPipe,
        SlicePipe,
        DecimalPipe,
        TitleCasePipe,
        CurrencyPipe,
        DatePipe,
        ElipsisPipe,
        CapitalizePipe,
    ],
})
export class DemosComponent implements OnInit, OnDestroy {
  private suscriptor: Unsubscribable | undefined;
  private nombre: string = 'mundo';
  fecha = '2023-07-19'
  fontSize = 24
  listado = [
    {id: 1, nombre: 'Madrid'},
    {id: 2, nombre: 'BARCELONA'},
    {id: 3, nombre: 'valencia'},
    {id: 4, nombre: 'ciudad Real'},
  ]
  idProvincia = 2

  resultado?: string;
  visible = true
  estetica = { importante: true, urgente: true, error: false}

  constructor(public vm: NotificationService) { }

  public get Nombre(): string { return this.nombre }
  public set Nombre(value: string) {
    if(value === this.nombre) return
    this.nombre = value
  }

  public saluda(): void {
    this.resultado = `Hola ${this.nombre}`
  }
  public despide(): void {
    this.resultado = `Adios ${this.nombre}`
  }
  di(algo: string) {
    this.resultado = `Dice ${algo}`
  }

  cambia() {
    this.visible = !this.visible
    this.estetica.error = !this.estetica.error
    this.estetica.importante = !this.estetica.importante
  }

  calcula(a: number, b: number): number { return a + b }

  add(provincia: string) {
    const id = this.listado[this.listado.length - 1].id + 1
    this.listado.push({id, nombre: provincia})
    this.idProvincia = id
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    this.suscriptor = this.vm.Notificacion.subscribe(n => {
      if (n.Type !== NotificationType.error) { return; }
      window.alert(`Suscripción: ${n.Message}`);
      this.vm.remove(this.vm.Listado.length - 1);
    });
  }
  ngOnDestroy(): void {
    if (this.suscriptor) {
      this.suscriptor.unsubscribe();
    }
  }

  idiomas = [
    { codigo: 'en-US', region: 'USA' },
    { codigo: 'es', region: 'España' },
    { codigo: 'pt', region: 'Portugal' },
  ];
  idioma = this.idiomas[0].codigo;
  calculos: any[] = [];
  valCalculadora = 666;

  ponResultado(origen: string, valor: any) {
    this.calculos.push({
      pos: this.calculos.length + 1,
      origen,
      valor
    });
  }

}
