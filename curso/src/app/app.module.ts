import { LOCALE_ID, NgModule } from '@angular/core';
import { DATE_PIPE_DEFAULT_OPTIONS, NgOptimizedImage, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeEsExtra from '@angular/common/locales/extra/es';
registerLocaleData(localeEs, 'es', localeEsExtra);

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MainModule } from './main';
import { SecurityModule } from './security';
import { ERROR_LEVEL, LoggerService, MyCoreModule } from '@my/core';
import { environment } from 'src/environments/environment';
import { DemosComponent } from './demos/demos.component';
import { CommonServicesModule } from './common-services';
import { CommonComponentModule } from './common-component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import GraficoSvgComponent from 'src/lib/independientes/grafico-svg/grafico-svg.component';
import { FormularioComponent } from './formulario/formulario.component';

@NgModule({
  declarations: [
    AppComponent,
    DemosComponent,
    DashboardComponent,
    CalculadoraComponent,
    FormularioComponent,
  ],
  imports: [
    BrowserModule, FormsModule,
    AppRoutingModule, MainModule, SecurityModule, MyCoreModule, CommonServicesModule,
    CommonComponentModule, GraficoSvgComponent,
  ],
  providers: [
    LoggerService,
    { provide: ERROR_LEVEL, useValue: environment.ERROR_LEVEL },
    { provide: LOCALE_ID, useValue: 'es-ES' },
    { provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: { dateFormat: 'dd/MMM/yy' } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
