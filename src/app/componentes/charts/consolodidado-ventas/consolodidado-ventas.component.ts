import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ServiciosService } from 'src/app/services/servicios.service';
import { PromediosDep } from '../../../models/promediosdep.model';

@Component({
  selector: 'app-consolodidado-ventas',
  templateUrl: './consolodidado-ventas.component.html',
  styleUrls: ['./consolodidado-ventas.component.css']
})
export class ConsolodidadoVentasComponent implements OnInit {
  
  totalVentasByStore:any[]=[];
  totalVentasByStoreCaracteristica:any[] = [];

  single: any[];
  view: any[] = [1100, 500];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(
    public _serviciosServices: ServiciosService
    ) { 
    Object.assign(this, this.single);
    this.view = [innerWidth / 1.4, 400];
  }

  ngOnInit(): void {
    this.cargarVentasByStore();
  }

  onResize (event) {
    this.view = [event.target.innerWidth / 1.8, 400];
    this.view = [innerWidth / 1.9, 400];
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  cargarVentasByStore(){
    this.totalVentasByStore = [];
    this._serviciosServices.cargarVentasByStore()
    .subscribe(
      (resp:any) =>{
        this.obtenerDatosFormateados(resp);
      },
      error => console.log(error)
    );
    
  }
  filtrarVentasByStore(dateInit,dateEnd,feriado){
    this.totalVentasByStore = [];
    this._serviciosServices.filtrarVentasByDate(dateInit,dateEnd,feriado)
    .subscribe(
      (resp:any) =>{
        this.obtenerDatosFormateados(resp);
      },
      error => console.log(error)
    );
    
  }
  obtenerDatosFormateados(data){
    for(let i=0; i < data.tienda.length; i++){
      var store = {name:"", value:0}
      var caracteristicas = {type:"", size:0, max:0, min:0}
      store.name = "Tienda N°" + data.tienda[i].store;
      store.value = data.tienda[i].sumsales;
      caracteristicas.max = data.tienda[i].max;
      caracteristicas.min = data.tienda[i].min;
      caracteristicas.type = data.caracteristicas[i].type;
      caracteristicas.type = data.caracteristicas[i].size;
      this.totalVentasByStore.push(store);
      this.totalVentasByStoreCaracteristica.push(caracteristicas);
      this.colorScheme.domain.push(this.generarColor());
    }
    this.single=this.totalVentasByStore;
    this.single.sort((a, b) => a.name - b.name);
    /*console.log(this.single);*/

  }
  generarColor(){
    var simbolos, color;
    simbolos = "0123456789ABCDEF";
    color="#";
    for( var i = 0; i<6; i++){
      color = color + simbolos[Math.floor(Math.random()*16)];
    }
    return color;
  }
}
