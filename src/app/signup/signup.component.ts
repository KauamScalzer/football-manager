import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  constructor(private router: Router, private toastr: ToastrService) {}

  camposPreenchidos: boolean = false;
  usuario: string = '';
  senha: string = '';
  passwordConfirmation: string = '';
  logoUefa: string = '/assets/images/uefaImg.png';

  verificarPreenchimento() {
    this.camposPreenchidos =
      this.usuario.trim() !== '' &&
      this.senha.trim() !== '' &&
      this.passwordConfirmation.trim() !== '';
  }

  async signup() {
    try {
      const result = await axios.post('http://localhost:3000/user/signup', {
        username: this.usuario,
        password: this.senha,
      });
      if (result.status === 200) {
        this.router.navigate(['/home']);
      }
    } catch(error: any) {
      if (error.response?.status === 409) {
        this.toastr.error('Usuário já está em uso.');
      } else {
        this.toastr.error('Ocorreu algum problema ao processar sua solicitação. Tente novamente em breve.');
      }
    }
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
    this.toastr.error('Conta nao foi criada');
  }
}
