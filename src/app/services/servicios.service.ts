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

  filtrarPromedioVentasByDeparment(tienda, dateInit, dateEnd){
    if(dateInit == null){
      dateInit = "";
    }
    if(dateEnd == null){
      dateEnd = "";
    }
    
    let url = URL_SERVICIOS.obtenerPromedioVentasByTienda;
    return this.http.post(url,{"store": tienda,"date_init": dateInit,"date_end": dateEnd});
  }
}
