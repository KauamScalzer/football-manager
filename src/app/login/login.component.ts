import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private router: Router) {}

  camposPreenchidos: boolean = false;
  usuario: string = '';
  senha: string = '';
  logoUefa: string = '/assets/images/uefaImg.png';

  verificarPreenchimento() {
    this.camposPreenchidos =
      this.usuario.trim() !== '' && this.senha.trim() !== '';
  }

  async login() {
    const result = await axios.post('http://localhost:3000/user/login', {
      username: this.usuario,
      password: this.senha,
    });
    if (result.status === 200) {
      this.router.navigate(['/']);
    }
  }

  redirectToSignup() {
    this.router.navigate(['/signup']);
  }
}
