import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Tiendas } from 'src/app/models/tienda.model';
import { ServiciosService } from '../../services/servicios.service';
import { Promedios } from '../../models/promedios.model';
import { PromediosDep } from '../../models/promediosdep.model';
import { PromediosDesempleo } from '../../models/promediosdesempleo.model';
import { PromediosDepartamentoComponent } from 'src/app/componentes/charts/promedios-departamento/promedios-departamento.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild(PromediosDepartamentoComponent) chartPD: PromediosDepartamentoComponent;

  forma: FormGroup;
  tiendas: Tiendas[];
  
  tiendaSelected: Tiendas;
  tienda:Tiendas;
  
  numTienda:Number;
  

  promediosTienda:Promedios[];
  promediosDepartamentos: PromediosDep[]=[];
  caracteristicasA: Tiendas[];
  tasaDesempleo: PromediosDesempleo[];
  
  

  constructor(
    public _serviciosServices: ServiciosService
  ) { 
    
  }

  ngOnInit(): void {
    this.numTienda=1;
    this.consultarTiendaDef();
    this.cargarTiendas();
    this.forma = new FormGroup({
      tienda: new FormControl(null, Validators.required)
    });
  }
  cargarTiendas(){
    this._serviciosServices.cargarTiendas().subscribe(
      (resp:any) =>{
        console.log(resp);
        this.tiendas = resp;
      }
    )
   
  }
  onChangedTienda(tienda){
    this.tiendaSelected = this.getSelectedCat(tienda);
    this._serviciosServices.filtrarPromedioVentasByDeparment(this.tiendaSelected.store).subscribe(
      (resp:any) =>{
        console.log(resp);
      }
    );
    this.setCatFilter(true);
    
  }
  consultarTienda(){
    console.log(this.forma.valid)
    this.promediosTienda = [];
    this.caracteristicasA = [];
    this.tasaDesempleo = [];
    this.promediosDepartamentos = [];

    this._serviciosServices.filtrarPromedioVentasByDeparment(this.forma.value.tienda)
    .subscribe(
      (resp:any) =>{
        this.promediosTienda = resp.tienda;
        this.caracteristicasA = resp.caracteristicas;
        this.tasaDesempleo = resp.desempleo;
      },
      error => console.log(error)
    );
    this.numTienda=this.forma.value.tienda;
    this.chartPD.consultarTienda(this.forma.value.tienda);
   
    
    
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
 

 
  consultarTiendaDef(){
    this._serviciosServices.filtrarPromedioVentasByDeparment(1)
    .subscribe(
      (resp:any) =>{
        console.log(resp.tienda);
        console.log(resp.p_departamentos);
        this.promediosTienda = resp.tienda;
        
        this.caracteristicasA = resp.caracteristicas;
        this.tasaDesempleo = resp.desempleo;
      },
      error => console.log(error)
    );
    
    
  }
  getSelectedCat(tiendaSelected: Tiendas): Tiendas {
    return this.tiendas.find(tienda => tienda === tiendaSelected);
  }
  setCatFilter(filter: boolean) {
    this._serviciosServices.setSearchFilter(filter);
  }

  getHora(){

  }
}
