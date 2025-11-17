import { VeiculoData } from './../../models/veiculoData.model';
import { ServiceOneService } from './../../service/service-one.service';
import { Component, NgModule, OnInit, computed, effect, inject, signal } from '@angular/core';
import { HeaderComponent } from '../../component/header/header.component';
import { Veiculo } from '../../models/veiculo.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {
  private vehicleService = inject(ServiceOneService );

  // --- Sinais para guardar o estado ---

  // Lista de todos os veículos (para o select)
  vehicles = signal<Veiculo[]>([]);

  // O nome do veículo que está selecionado no <select>
  selectedVehicleName = signal<string>('');

  // Os dados da tabela (odômetro, status, etc.)
  vehicleTableData = signal<VeiculoData | undefined>(undefined);

  // --- Sinais Computados (Derivados) ---

  // O objeto COMPLETO do veículo selecionado (calculado a partir do nome)
  selectedVehicle = computed(() => {
    return this.vehicles().find(v => v.vehicle === this.selectedVehicleName());
  });

  /**
   * MAPA para ligar o NOME do modelo ao VIN.
   * A sua API `/vehicles` não retorna os VINs, então precisamos
   * criar essa "ponte" manualmente com base no `switch` da sua API.
   */
  private readonly vinMap: { [vehicleName: string]: string } = {
    "Ranger": "2FRHDUYS2Y63NHD22454",
    "Mustang": "2RFAASDY54E4HDU34874",
    "Territory": "2FRHDUYS2Y63NHD22455",
    "Bronco Sport": "2RFAASDY54E4HDU34875",
    // Adicione os outros VINs aqui se necessário
  };

  constructor() {
    // Efeito que reage a mudanças no <select>
    effect(() => {
      const vehicleName = this.selectedVehicleName();
      if (vehicleName) {
        this.loadVehicleTableData(vehicleName);
      }
    });
  }

  ngOnInit(): void {
    // 1. Busca a lista de veículos assim que o componente carrega
    this.vehicleService.getCarModels().subscribe(apiResponse => {
      const allVehicles = apiResponse.vehicles;
      this.vehicles.set(allVehicles);

      // 2. Define o primeiro veículo da lista como selecionado
      if (allVehicles.length > 0) {
        this.selectedVehicleName.set(allVehicles[0].vehicle);
      }
    });
  }

  /**
   * Busca os dados da tabela (odômetro, etc.) com base no nome do modelo.
   */
  private loadVehicleTableData(vehicleName: string): void {
    const vin = this.vinMap[vehicleName]; // 3. Encontra o VIN correspondente

    if (!vin) {
      console.error(`Nenhum VIN encontrado para o modelo: ${vehicleName}`);
      this.vehicleTableData.set(undefined);
      return;
    }

    // 4. Chama a API com o VIN
    this.vehicleService.getCarData(vin).subscribe(data => {
      // Adiciona o VIN ao objeto para exibição fácil na tabela
      const dataWithVin: VeiculoData = { ...data, vin: vin };
      this.vehicleTableData.set(dataWithVin);
    });
  }
  // infosCar: Veiculo[] = [];

  // constructor(private ServiceOneService: ServiceOneService) {  }

  // Ciclo de vida do componente, ou seja, inicializa sempre que o componente for criado
  // ngOnInit(): void {
  //   this.buscarImg();
  // }

  // buscarImg(): void {
  //   this.ServiceOneService.getImgCar().subscribe((data:any) => {
  //     this.infosCar = data;
  //     console.log(this.infosCar);

  //   }, (erro) => {
  //     console.log('Erro ao buscar as imagens dos carros: ', erro);
  //   });
  // }
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
