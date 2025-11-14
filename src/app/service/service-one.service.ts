import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http'
import { Veiculo } from '../models/veiculo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceOneService {
  baseUrl: string = environment.apiURL;

  //injeção de dependência
  constructor(private http: HttpClient) { }

  getImgCar():Observable<Veiculo[]>{
    return this.http.get<Veiculo[]>(this.baseUrl + 'vehicles');
  }
}
