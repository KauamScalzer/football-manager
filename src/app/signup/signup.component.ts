import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(
    private router: Router
  ) {}

  camposPreenchidos: boolean = false;
  usuario: string = '';
  senha: string = '';
  passwordConfirmation: string = '';

  verificarPreenchimento() {
    this.camposPreenchidos = this.usuario.trim() !== '' && this.senha.trim() !== '' && this.passwordConfirmation.trim() !== '';
  }

  async signup() {
    const result = await axios.post('http://localhost:3000/user/signup', {
      username: this.usuario,
      password: this.senha
    })
    if (result.status === 200) {
      this.router.navigate(['/']);
    }
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
