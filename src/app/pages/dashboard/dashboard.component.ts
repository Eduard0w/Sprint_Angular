import { ServiceOneService } from './../../service/service-one.service';
import { Component, NgModule, OnInit } from '@angular/core';
import { HeaderComponent } from '../../component/header/header.component';
import { Veiculo } from '../../models/veiculo.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [HeaderComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {
  infosCar: Veiculo[] = [];

  constructor(private ServiceOneService: ServiceOneService) {  }

  // Ciclo de vida do componente, ou seja, inicializa sempre que o componente for criado
  ngOnInit(): void {
    this.buscarImg();
  }

  buscarImg(): void {
    this.ServiceOneService.getImgCar().subscribe((data:any) => {
      this.infosCar = data;
      console.log(this.infosCar);

    }, (erro) => {
      console.log('Erro ao buscar as imagens dos carros: ', erro);
    });
  }
  // ImgCar = {
  //   territory:'territory.png',
  //   mustang: 'mustang.png',
  //   ranger: 'ranger.png',
  //   bronco: 'broncoSport.png'
  // }
  // selectCar: string = '';

  // trocarImgCar(value: string): void {
  //   switch(value){
  //     case 'Territory': this.selectCar = this.ImgCar.territory;break;
  //     case 'Mustang': this.selectCar = this.ImgCar.mustang;break;
  //     case 'Ranger': this.selectCar = this.ImgCar.ranger;break;
  //     case 'Bronco Sport': this.selectCar = this.ImgCar.bronco;break;
  //   }
  // }

}
