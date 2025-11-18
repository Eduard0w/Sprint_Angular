import { Component, OnInit, inject } from '@angular/core';
import { ServiceOneService } from '../../service/service-one.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  private loginService = inject(ServiceOneService);
  ngOnInit(): void {
    this.loginService.loginHome('user', 'password').subscribe(response => {
      console.log('Login response:', response);
    })
  }

  efetuarLogin(nome: string, senha: string) {

  }
}

