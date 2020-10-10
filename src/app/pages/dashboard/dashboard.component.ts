import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Tiendas } from 'src/app/models/tienda.model';
import { ServiciosService } from '../../services/servicios.service';
import { Promedios } from '../../models/promedios.model';
import { PromediosDep } from '../../models/promediosdep.model';
import { PromediosDesempleo } from '../../models/promediosdesempleo.model';
import { PromediosDepartamentoComponent } from 'src/app/componentes/charts/promedios-departamento/promedios-departamento.component';
import { ConsolodidadoVentasComponent } from '../../componentes/charts/consolodidado-ventas/consolodidado-ventas.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild(PromediosDepartamentoComponent) chartPD: PromediosDepartamentoComponent;
  @ViewChild(ConsolodidadoVentasComponent ) chartTotalSales: ConsolodidadoVentasComponent;
  todosDias:String = "";
  forma: FormGroup;
  formaFiltroTotalesVentas: FormGroup;
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
  
  validarRangoFechas(dateInit: string, dateEnd: string){
    return (group: FormGroup) =>{
      let dateIn = new Date(group.controls[dateInit].value);
      let dateEn = new Date(group.controls[dateEnd].value);
     
      if(dateEn >= dateIn && dateEn!=null){
        return null
      }
      return{
        rangoCorrecto: true
      };
    };
  }

  ngOnInit(): void {
    this.numTienda=1;
    this.consultarTiendaDef();
    this.cargarTiendas();
    this.forma = new FormGroup({
      tienda: new FormControl(null, Validators.required),
      dateInit: new FormControl(null, Validators.required),
      dateEnd: new FormControl(null, Validators.required),
      feriado: new FormControl(null, Validators.required),
    }, {validators: this.validarRangoFechas('dateInit', 'dateEnd')});
    this.formaFiltroTotalesVentas = new FormGroup({
      dateInit: new FormControl(null, Validators.required),
      dateEnd: new FormControl(null, Validators.required),
      feriado: new FormControl(null, Validators.required),
    }, {validators: this.validarRangoFechas('dateInit', 'dateEnd')});
  }


  

  cargarTiendas(){
    this._serviciosServices.cargarTiendas().subscribe(
      (resp:any) =>{
        /*console.log(resp);*/
        this.tiendas = resp;
      }
    )
   
  }
  onChangedTienda(tienda){
    this.tiendaSelected = this.getSelectedCat(tienda);
    this._serviciosServices.filtrarPromedioVentasByDeparment(this.tiendaSelected.store,"","","").subscribe(
      (resp:any) =>{
        console.log(resp);
      }
    );
    this.setCatFilter(true);
    
  }
  consultarTienda(){
    /*console.log(this.forma.valid)
    console.log(this.forma.value.tienda)
    console.log(this.forma.value.dateInit)
    console.log(this.forma.value.dateEnd)
    */
    this.promediosTienda = [];
    this.caracteristicasA = [];
    this.tasaDesempleo = [];
    this.promediosDepartamentos = [];

    this._serviciosServices.filtrarPromedioVentasByDeparment(this.forma.value.tienda, this.forma.value.dateInit,this.forma.value.dateEnd,this.forma.value.feriado)
    .subscribe(
      (resp:any) =>{
        this.promediosTienda = resp.tienda;
        this.caracteristicasA = resp.caracteristicas;
        this.tasaDesempleo = resp.desempleo;
      },
      error => console.log(error)
    );
    this.numTienda=this.forma.value.tienda;
    this.chartPD.consultarTienda(this.forma.value.tienda, this.forma.value.dateInit,this.forma.value.dateEnd,this.forma.value.feriado);
  }

  filtrarResultadosVentasByDate(){
    this.chartTotalSales.filtrarVentasByStore(this.formaFiltroTotalesVentas.value.dateInit, this.formaFiltroTotalesVentas.value.dateEnd,this.formaFiltroTotalesVentas.value.feriado)
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
    this._serviciosServices.filtrarPromedioVentasByDeparment(1,"","","")
    .subscribe(
      (resp:any) =>{
        /*console.log(resp.tienda);
        console.log(resp.p_departamentos);*/
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
