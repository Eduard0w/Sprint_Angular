import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ServiceOneService {
  baseUrl: string = environment.apiURL;

  //injeção de dependência
  constructor(private http: HttpClient) { }

  getImgCar(veiculo: string){
    this.http.get(this.baseUrl + 'vehicles').forEach((item) => {
      console.log(item)
    })
  }
}
