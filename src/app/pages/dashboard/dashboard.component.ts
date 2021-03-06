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
  
  /*
  *Funcion para validad rangos de fechas en el formulario de filtros
  *@dateInit: Fecha de de partida
  *@dateInit: Fecha de de fin
  */
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
  
  /*
  *Metodo de inicializacion global de componentes, funciones y objetos de la aplicacion
  */
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


  
  /*
  *Funcion para obtener el listado de las tiendas disponibles
  */
  cargarTiendas(){
    this._serviciosServices.cargarTiendas().subscribe(
      (resp:any) =>{
        /*console.log(resp);*/
        this.tiendas = resp;
      }
    )
   
  }
 
  /*
  *Funcion para obtener los promedios por tienda y departamentos, relacionados con ventas,cpi
   caracteristicas de la tienda y servicio para filtro, ademas invoca a funciones de los componentes
   tipo chart, chartDP, chartHistorial
  *@Recibe como argumentos los parametos o campos del formulario forma
  */
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

   /*
  *Funcion para obtener totales de ventas
  *@Invoca al la funcion filtrar ventas del componente charttotalsales
  */
  
  filtrarResultadosVentasByDate(){
    this.chartTotalSales.filtrarVentasByStore(this.formaFiltroTotalesVentas.value.dateInit, this.formaFiltroTotalesVentas.value.dateEnd,this.formaFiltroTotalesVentas.value.feriado)
  }

  /*
  *Funcion para obtener la tasa de conversion entre cpi promedio y el cpi maximo
  *@avgcpi: CPI promedio
  *@avgcpi: CPI maximo
  */
  obtenerTasa(avgcpi, maxcpi){
    var tasa = avgcpi/maxcpi;
    return tasa;
  }


  
 /*
  *Funcion para obtener la informacion de KPIs y promedios por defecto de la tienda 1
  */
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

  /*
  *Funcion para calcular la tasa de propocionalidad de conversion de ventas promedio en feriado o no
  *@promediolocal: promedio aplicando filtro de feriado
  *@promedioglobal: promedio total sin aplicar filtro de feriado
  */
  carlcularPorcentajeVentasByFeriado(promedioLocal, promedioGlobal){
    var simbolo = "+";
    var tasa = promedioLocal/promedioGlobal;
    if(tasa>=1){
      tasa = tasa - 1;
    }else{
      simbolo = "-"
      tasa = 1 - tasa;
    }
    var result = tasa.toFixed(2);
    var resultText = result.toString()
    return simbolo+resultText;
 
}

   /*
  *Funcion para obtener la los tipos de markdowns, por defecto el primero
  */
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

  /*
  *Funcion para filtrar los tipos de markdowns
  */
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
  
  /*
  *Funcion para calcular la tasa de conversion de descuentos aplicados y cuanta fuga de dinero representa
  *@avgsales: promedio de ventas por tienda
  *@markdown: promedio de markdowns por tipo 
  */
  calcularTasaMarkdown(avgsales,markdown){
    var tasaMD = (markdown/(markdown+avgsales));
    return tasaMD;
  }

  /*
  *Funcion para formatear datos y generar diccionario para tabla de markdowns
  *@datos: recibe la respuesta la api
  */

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
 
  /*
  *Funcion para generar un color aleatorio para los charts
  */
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
