import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArrayName, FormGroup, FormControl, Validators } from '@angular/forms';
import { HistorialVentasChartComponent } from 'src/app/componentes/charts/historial-ventas/historial-ventas.component';
import { Tiendas } from 'src/app/models/tienda.model';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-historial-ventas',
  templateUrl: './historial-ventas.component.html',
  styleUrls: ['./historial-ventas.component.css']
})
export class HistorialVentasComponent implements OnInit {
  @ViewChild(HistorialVentasChartComponent) historialChart: HistorialVentasChartComponent;


  todosDias:String = "";
  formaFiltroHistorialVentas: FormGroup;
  tiendas: Tiendas[];

  constructor(
    public _serviciosServices: ServiciosService
  ) { }
  
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
    this.formaFiltroHistorialVentas = new FormGroup({
      tienda: new FormControl(null,Validators.required),
      dateInit: new FormControl(null, Validators.required),
      dateEnd : new FormControl(null, Validators.required),
      feriado : new FormControl(null, Validators.required)
    },
    {validators: this.validarRangoFechas('dateInit', 'dateEnd')})
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
  
  filtrarResultadosHistorialByDate(){
    this.historialChart.filtrarHistorialVentasByStore(this.formaFiltroHistorialVentas.value.tienda, this.formaFiltroHistorialVentas.value.dateInit, this.formaFiltroHistorialVentas.value.dateEnd, this.formaFiltroHistorialVentas.value.filtro);
  }
}
