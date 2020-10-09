import { Component, OnInit,NgModule, Input, Output, EventEmitter } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PromediosDep } from 'src/app/models/promediosdep.model';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-promedios-departamento',
  templateUrl: './promedios-departamento.component.html',
  styleUrls: ['./promedios-departamento.component.css']
})
export class PromediosDepartamentoComponent implements OnInit{

  promedioDep:[]=[];
  
  single: any[];
  
  multi: any[];
  
  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Departamentos';
  showYAxisLabel = true;
  yAxisLabel = 'Ventas';

  colorScheme = {
    domain: [] 
  };

  constructor(
    public _serviciosServices: ServiciosService
  ) {
    Object.assign(this,this.single)
    this.view = [innerWidth / 1.9, 300];
   }
  
  ngOnInit(): void {
    this.consultarTienda(1);
  }
  onSelect(event) {
    console.log(event);
  }
  onResize (event) {
    this.view = [event.target.innerWidth / 1.8, 300];
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
  consultarTienda(tienda){
    this.promedioDep = [];
    this._serviciosServices.filtrarPromedioVentasByDeparment(tienda)
    .subscribe(
      (resp:any) =>{
        for(let departamento of resp.p_departamentos){
          let dep = {name:Number, value:Number}
          dep.name = departamento.departamento;
          dep.value =departamento.avgsales;
          this.promedioDep.push(dep);
          this.colorScheme.domain.push(this.generarColor());
        }
        this.single=this.promedioDep;
        this.single.sort((a, b) => a.name - b.name);
        console.log(this.single);
  
      },
      error => console.log(error)
    );
    
  }
 
}
