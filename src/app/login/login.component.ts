import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../userService/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService
  ) {}

  camposPreenchidos: boolean = false;
  usuario: string = '';
  senha: string = '';
  logoUefa: string = '/assets/images/uefaImg.png';

  verificarPreenchimento() {
    this.camposPreenchidos =
      this.usuario.trim() !== '' && this.senha.trim() !== '';
  }

  async login() {
    try {
      const result = await axios.post('http://localhost:3000/user/login', {
      username: this.usuario,
      password: this.senha,
    });
      if (result.status === 200) {
        this.userService.user = result.data;
        this.router.navigate(['/home']);
      }
    } catch(error: any) {
      if (error.response?.status === 403) {
        this.toastr.error('Usuário ou senha inválidos.');
      } else {
        this.toastr.error('Ocorreu algum problema ao processar sua solicitação. Tente novamente em breve.');
      }
    }
  }

  redirectToSignup() {
    this.router.navigate(['/signup']);
  }
}
