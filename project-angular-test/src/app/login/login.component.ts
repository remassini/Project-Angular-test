import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  login() {
    if (this.username === 'TESTE' && this.password === '123') {
      this.router.navigateByUrl('/alunos');
    } else {
      this.errorMessage = 'Usuário ou senha inválidos';
    }
  }
}

