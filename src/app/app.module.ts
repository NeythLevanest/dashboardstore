import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './shared/header/header.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { app_routing } from './app.routes';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PromediosDepartamentoComponent } from './componentes/charts/promedios-departamento/promedios-departamento.component';
import { ConsolodidadoVentasComponent } from './componentes/charts/consolodidado-ventas/consolodidado-ventas.component';
import { HistorialVentasComponent } from './pages/historial-ventas/historial-ventas.component';
import { HistorialVentasChartComponent } from './componentes/charts/historial-ventas/historial-ventas.component';
import { MarkdownspageComponent } from './pages/markdownspage/markdownspage.component';
import { GlobalsalesComponent } from './pages/globalsales/globalsales.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    PromediosDepartamentoComponent,
    ConsolodidadoVentasComponent,
    HistorialVentasComponent,
    HistorialVentasChartComponent,
    MarkdownspageComponent,
    GlobalsalesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    app_routing,
    
    FormsModule,
    ReactiveFormsModule,

    HttpClientModule,

    NgxChartsModule,
    BrowserAnimationsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
