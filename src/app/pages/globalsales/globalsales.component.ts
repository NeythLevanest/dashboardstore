import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Tiendas } from 'src/app/models/tienda.model';
import { ServiciosService } from 'src/app/services/servicios.service';
import { ConsolodidadoVentasComponent } from '../../componentes/charts/consolodidado-ventas/consolodidado-ventas.component';

@Component({
  selector: 'app-globalsales',
  templateUrl: './globalsales.component.html',
  styleUrls: ['./globalsales.component.css']
})
export class GlobalsalesComponent implements OnInit {
  @ViewChild(ConsolodidadoVentasComponent ) chartTotalSales: ConsolodidadoVentasComponent;

  todosDias:String = "";
  formaFiltroTotalesVentas: FormGroup;
  
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
    this.formaFiltroTotalesVentas = new FormGroup({
      dateInit: new FormControl(null, Validators.required),
      dateEnd: new FormControl(null, Validators.required),
      feriado: new FormControl(null, Validators.required),
    }, {validators: this.validarRangoFechas('dateInit', 'dateEnd')});
    
  }

  filtrarResultadosVentasByDate(){
    this.chartTotalSales.filtrarVentasByStore(this.formaFiltroTotalesVentas.value.dateInit, this.formaFiltroTotalesVentas.value.dateEnd,this.formaFiltroTotalesVentas.value.feriado)
  }

}
