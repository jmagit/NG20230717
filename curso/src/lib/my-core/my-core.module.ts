import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PIPES_CADENAS } from './pipes/cadenas.pipe';
import { SizerComponent } from './components/sizer.component';
import { PIPES_NUMERICOS } from './pipes/numericos.pipe';
import { MIS_VALIDADORES } from './directives/mis-validadores.directive';



@NgModule({
  declarations: [
    PIPES_CADENAS, PIPES_NUMERICOS, MIS_VALIDADORES,
  ],
  exports: [
    PIPES_CADENAS, SizerComponent, PIPES_NUMERICOS, MIS_VALIDADORES,
  ],
  imports: [
    CommonModule, SizerComponent
  ]
})
export class MyCoreModule { }
