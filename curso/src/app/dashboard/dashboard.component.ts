import { Component } from '@angular/core';
import { HomeComponent } from '../main';
import { DemosComponent } from '../demos/demos.component';
import { CalculadoraComponent } from '../calculadora/calculadora.component';
import GraficoSvgComponent from 'src/lib/independientes/grafico-svg/grafico-svg.component';
import { FormularioComponent } from '../formulario/formulario.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  menu = [
    { texto: 'formulario', icono: 'fa-solid fa-chalkboard-user', componente: FormularioComponent},
    { texto: 'inicio', icono: 'fa-solid fa-house', componente: HomeComponent},
    { texto: 'demos', icono: 'fa-solid fa-chalkboard-user', componente: DemosComponent},
    { texto: 'calculadora', icono: 'fa-solid fa-calculator', componente: CalculadoraComponent},
    { texto: 'gráfico', icono: 'fa-solid fa-image', componente: GraficoSvgComponent},
  ]
  actual: any = this.menu[0].componente

  selecciona(index: number) {
    this.actual = this.menu[index].componente
  }
}
