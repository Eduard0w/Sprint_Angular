import { ServiceOneService } from './../../service/service-one.service';
import { Component, NgModule, OnInit } from '@angular/core';
import { HeaderComponent } from '../../component/header/header.component';
import { ElementCarComponent } from '../../component/element-car/element-car.component';
import { UserService } from '@angular-devkit/build-angular'

@Component({
  selector: 'app-dashboard',
  imports: [HeaderComponent, ElementCarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {

  constructor(private userService: UserService) {

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
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
