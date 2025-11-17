import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http'
import { VeiculosAPI } from '../models/veiculo.model';
import { Observable } from 'rxjs';
import { VeiculoData } from '../models/veiculoData.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceOneService {
  baseUrl: string = environment.apiURL;

  //injeção de dependência
  constructor(private http: HttpClient) { }

  getCarModels():Observable<VeiculosAPI>{
    return this.http.get<VeiculosAPI>(this.baseUrl + 'vehicles');
  }

  getCarData(vin: string): Observable<VeiculoData>{
    return this.http.get<VeiculoData>(this.baseUrl + 'vehicles/' + vin);
  }
}
