import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-markdownspage',
  templateUrl: './markdownspage.component.html',
  styleUrls: ['./markdownspage.component.css']
})
export class MarkdownspageComponent implements OnInit {
  formaMarkdowns: FormGroup;
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
    this.formaMarkdowns = new FormGroup({
      markdown: new FormControl(null, Validators.required),
    });
    this.obtenerMarkdowns();
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
}
