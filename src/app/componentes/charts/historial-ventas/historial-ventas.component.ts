import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/services/servicios.service';
import { Historial } from '../../../models/historialventas.model';
import { SerieObject } from '../../../models/serieObject.model';

@Component({
  selector: 'app-historial-ventas-chart',
  templateUrl: './historial-ventas.component.html',
  styleUrls: ['./historial-ventas.component.css']
})
export class HistorialVentasChartComponent implements OnInit {

  totalVentasByStore:Historial;
  listTotalVentas:Historial[]=[];
  
  single: any[];
  
  multi: any[];
  
  view: any[] = [1100, 600];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Fechas';
  yAxisLabel: string = 'Ventas';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };



  constructor(
    public _serviciosServices: ServiciosService
  ) {
    Object.assign(this, this.single);
    this.view = [innerWidth / 1.4, 400];
   }
  
  ngOnInit(): void {
    
    this.initChart();
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
  /*cargarHistorialVentasByStore(tienda){
    this._serviciosServices.cargarHistorialVentas(tienda)
    .subscribe(
      (resp:any) =>{
        console.log(resp);
        this.obtenerDatosFormateados(resp);
        console.log(this.single);
      },
      error => console.log(error)
    );
    
  }*/
  initChart(){
    var tienda = localStorage.getItem("store");
    if(tienda != ""){
      this.filtrarHistorialVentasByStore(tienda,"","","");
    }else{
      this.filtrarHistorialVentasByStore(1,"","","");
    }
  }
  filtrarHistorialVentasByStore(store,dateInit,dateEnd,feriado){
    this.listTotalVentas = [];
    this._serviciosServices.filtrarHistorialVentasByDate(store,dateInit,dateEnd,feriado)
    .subscribe(
      (resp:any) =>{
        console.log(resp);
        this.obtenerDatosFormateados(resp);
        console.log(this.single);
      },
      error => console.log(error)
    );
    
  }
  obtenerDatosFormateados(data){
    this.totalVentasByStore = {name:"", series:[]}
    var store = {name:"", series:[]}
    var seriesList:SerieObject[] = []
    this.totalVentasByStore.name = data.name;
    for(let i=0; i < data.series.length; i++){
      var seriesObject = {name:"", value:0}
      
     
      seriesObject.name = data.series[i].date;
      seriesObject.value = data.series[i].weekly_sales;

      seriesList.push(seriesObject);
    }
    this.totalVentasByStore.series = seriesList;
    this.listTotalVentas.push(this.totalVentasByStore);
    this.single = this.listTotalVentas;
    /*this.single.sort((a, b) => a.name - b.name);
    /*console.log(this.single);*/

  }
}
