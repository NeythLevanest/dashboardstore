import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import URL_SERVICIOS from 'src/app/config/config';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  filterObserver: Subject<any> = new Subject<any>();
  filters: any[] = [false];
  city: boolean;
  categoria: boolean;
  subcategoria: boolean;
  precio: string = '-precio';

  constructor(
    public http: HttpClient
  ) { }
  setSearchFilter(param: boolean) {
    this.filters.push(param);
    console.log(this.filters)
    this.filterObserver.next(this.filters);
  }
  getFilters$(): Observable<any[]> {
    return this.filterObserver.asObservable();
  }
  
  cargarTiendas(){
    let url = URL_SERVICIOS.cargarTiendas;
    return this.http.get(url);
  }

  filtrarPromedioVentasByDeparment(tienda, dateInit, dateEnd, feriado){
    localStorage.setItem('store',tienda);
    if(dateInit == null){
      dateInit = "";
    }
    if(dateEnd == null){
      dateEnd = "";
    }
    if(feriado == null || feriado == ""){
      feriado = "";
    }
    console.log(feriado);
    let url = URL_SERVICIOS.obtenerPromedioVentasByTienda;
    return this.http.post(url,{"store": tienda,"date_init": dateInit,"date_end": dateEnd,"feriado":feriado});
  }

  cargarVentasByStore(){
    let url = URL_SERVICIOS.cargarVentasByStore;
    return this.http.get(url);
  }

  filtrarVentasByDate(dateInit, dateEnd, feriado){
    if(dateInit == null){
      dateInit = "";
    }
    if(dateEnd == null){
      dateEnd = "";
    }
    if(feriado == null || feriado == ""){
      feriado = "";
    }
    let url = URL_SERVICIOS.cargarVentasByStore;
    return this.http.post(url,{"date_init": dateInit,"date_end": dateEnd,"feriado":feriado});
  }
  filtrarHistorialVentasByDate(tienda,dateInit,dateEnd,feriado){
    localStorage.setItem("store", tienda);
    if(dateInit == null){
      dateInit = "";
    }
    if(dateEnd == null){
      dateEnd = "";
    }
    if(feriado == null || feriado == ""){
      feriado = "";
    }
    let url = URL_SERVICIOS.obtenerHistorialVentas;
    return this.http.post(url,{"store": tienda, "date_init": dateInit,"date_end": dateEnd,"feriado":feriado});
  }

  cargarMarkdowns(){
    let url = URL_SERVICIOS.obtenerMarkdownComparation;
    return this.http.get(url);
  }
  filtrarMarkdowns(markdown){
    let url = URL_SERVICIOS.obtenerMarkdownComparation;
    return this.http.post(url,{"num_markdown": markdown});
  }
  cargarHistorialVentas(tienda){
    let url = URL_SERVICIOS.obtenerHistorialVentas;
    return this.http.post(url,{"store": tienda});
  }
}
