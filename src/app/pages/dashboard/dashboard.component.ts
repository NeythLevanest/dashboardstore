import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Tiendas } from 'src/app/models/tienda.model';
import { ServiciosService } from '../../services/servicios.service';
import { Promedios } from '../../models/promedios.model';
import { PromediosDep } from '../../models/promediosdep.model';
import { PromediosDesempleo } from '../../models/promediosdesempleo.model';
import { PromediosDepartamentoComponent } from 'src/app/componentes/charts/promedios-departamento/promedios-departamento.component';
import { ConsolodidadoVentasComponent } from '../../componentes/charts/consolodidado-ventas/consolodidado-ventas.component';
import { PromediosCPI } from '../../models/promedioscpi.model';
import { HistorialVentasChartComponent } from '../../componentes/charts/historial-ventas/historial-ventas.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild(PromediosDepartamentoComponent) chartPD: PromediosDepartamentoComponent;
  @ViewChild(ConsolodidadoVentasComponent ) chartTotalSales: ConsolodidadoVentasComponent;
  @ViewChild(HistorialVentasChartComponent) historialChart: HistorialVentasChartComponent;

  todosDias:String = "";
  forma: FormGroup;
  formaFiltroTotalesVentas: FormGroup;
  formaMarkdowns: FormGroup;
  tiendas: Tiendas[];
  
  tiendaSelected: Tiendas;
  tienda:Tiendas;
  
  numTienda:Number;
  

  promediosTienda:Promedios[];
  promedioVentaTienda:Promedios[]=[];
  promediosGlobalVentasTienda:Promedios[]=[];
  porcentajeVentasByFeriado:any[]=[];
  promediosDepartamentos: PromediosDep[]=[];
  caracteristicasA: Tiendas[];
  tasaDesempleo: PromediosDesempleo[];
  tasaCPI: PromediosCPI[];
  
  markdownsList:Number[]=[1,2,3,4,5];
  markdownsVentas:any[]=[];
  

  constructor(
    public _serviciosServices: ServiciosService
  ) { 
    
  }
  
  validarRangoFechas(dateInit: string, dateEnd: string){
    return (group: FormGroup) =>{
      let dateIn = new Date(group.controls[dateInit].value);
      let dateEn = new Date(group.controls[dateEnd].value);
     
      if(dateEn >= dateIn){
        return null
      }
      else if(dateIn != null && dateEn == null){
        return null
      }
      else if(dateEn != null && dateIn == null){
        return null
      }
      else if(dateEn == null && dateIn == null){
        return null
      }
      else{
        return{
          rangoCorrecto: true
        };
      }
      
    };
  }

  ngOnInit(): void {
    this.numTienda=1;
    
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
    
    this.formaMarkdowns = new FormGroup({
      markdown: new FormControl(null, Validators.required),
    });
    this.obtenerMarkdowns();
    this.consultarTiendaDef();
    this.cargarTiendas();
  }


  

  cargarTiendas(){
    this._serviciosServices.cargarTiendas().subscribe(
      (resp:any) =>{
        /*console.log(resp);*/
        this.tiendas = resp;
      }
    )
   
  }
 
  consultarTienda(){
    /*console.log(this.forma.valid)
    console.log(this.forma.value.tienda)
    console.log(this.forma.value.dateInit)
    console.log(this.forma.value.dateEnd)
    */
    var porcentajeFeriado = {local:0, global:0}
    
    this.promediosTienda = [];
    this.porcentajeVentasByFeriado =[];
    this.caracteristicasA = [];
    this.tasaDesempleo = [];
    this.tasaCPI = [];
    this.promediosDepartamentos = [];
 
    this._serviciosServices.filtrarPromedioVentasByDeparment(this.forma.value.tienda, this.forma.value.dateInit,this.forma.value.dateEnd,this.forma.value.feriado)
    .subscribe(
      (resp:any) =>{
        this.promediosTienda = resp.tienda;
        porcentajeFeriado.local = resp.tienda[0].avgsales;
        
        this.caracteristicasA = resp.caracteristicas;
        this.tasaDesempleo = resp.desempleo;
        this.tasaCPI = resp.cpi
      },
      error => console.log(error)
    );
    
    this._serviciosServices.filtrarPromedioVentasByDeparment(this.forma.value.tienda, this.forma.value.dateInit,this.forma.value.dateEnd,"")
    .subscribe(
      (resp:any) =>{
        porcentajeFeriado.global = resp.tienda[0].avgsales;
      },
      error => console.log(error)
    );

    this.porcentajeVentasByFeriado.push(porcentajeFeriado);

    this.numTienda=this.forma.value.tienda;
    this.chartPD.consultarTienda(this.forma.value.tienda, this.forma.value.dateInit,this.forma.value.dateEnd,this.forma.value.feriado);
    this.historialChart.filtrarHistorialVentasByStore(this.forma.value.tienda,"","","");
  }

  
  filtrarResultadosVentasByDate(){
    this.chartTotalSales.filtrarVentasByStore(this.formaFiltroTotalesVentas.value.dateInit, this.formaFiltroTotalesVentas.value.dateEnd,this.formaFiltroTotalesVentas.value.feriado)
  }

  obtenerTasa(avgcpi, maxcpi){
    let tasa = avgcpi/maxcpi;
    return tasa;
  }


  

 
  consultarTiendaDef(){
    var porcentajeFeriado = {local:0, global:0}

    this._serviciosServices.filtrarPromedioVentasByDeparment(1,"","","")
    .subscribe(
      (resp:any) =>{
        /*console.log(resp.tienda);
        console.log(resp.p_departamentos);*/
        this.promediosTienda = resp.tienda;
        porcentajeFeriado.local = resp.tienda[0].avgsales;
        porcentajeFeriado.global = resp.tienda[0].avgsales;
        this.caracteristicasA = resp.caracteristicas;
        this.tasaDesempleo = resp.desempleo;
        this.tasaCPI = resp.cpi;
        console.log(this.promedioVentaTienda[0]);
      },
      error => console.log(error)
    );
    this.porcentajeVentasByFeriado.push(porcentajeFeriado);
    this.carlcularPorcentajeVentasByFeriado(this.promedioVentaTienda, this.promediosGlobalVentasTienda);
    
  }

  carlcularPorcentajeVentasByFeriado(promedioLocal, promedioGlobal){
    var resultado = promedioLocal/promedioGlobal;
    return resultado;
 
}
  obtenerMarkdowns(){
    this.markdownsVentas = [];
    this._serviciosServices.cargarMarkdowns()
    .subscribe(
      (resp:any) =>{
        this.obtenerDatosFormateados(resp)
      },
      error => console.log(error)
    );
    
    
  }
  filtrarMarkdowns(){
    this.markdownsVentas = [];
    this._serviciosServices.filtrarMarkdowns(this.formaMarkdowns.value.markdown)
    .subscribe(
      (resp:any) =>{
        this.obtenerDatosFormateados(resp)
      },
      error => console.log(error)
    );
  }

  calcularTasaMarkdown(avgsales,markdown){
    var tasaMD = (markdown/(markdown+avgsales));
    return tasaMD;
  }

  obtenerDatosFormateados(data){
    var markdowns = data.markdown;
    markdowns.sort((a, b) => a.store - b.store);
    console.log(markdowns);
    for(let i=0; i < data.ventas.length; i++){
      var dataMarkdowns = {store:"",avgsales:0, maxSale:0, minSale:0, markdown:0}
      
      if(data.ventas[i].store==markdowns[i].store){
        dataMarkdowns.store = "Tienda N°" + data.ventas[i].store;
        dataMarkdowns.avgsales = data.ventas[i].avgsales;
        dataMarkdowns.maxSale = data.ventas[i].max;
        dataMarkdowns.minSale = data.ventas[i].min;
        dataMarkdowns.markdown = markdowns[i].markdown;
      }
      
      this.markdownsVentas.push(dataMarkdowns);
    }
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
