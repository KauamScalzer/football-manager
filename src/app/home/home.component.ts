import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { UserService } from '../userService/user.service';
import { Router } from '@angular/router';

interface Teams {
  id: number;
  name: string;
  urlImage: string;
}

interface TeamResult {
  count: number;
  result: Teams[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userData = this.userService.user;
    console.log(userData)
    if (userData) {
      if (!userData.teamId) {
        this.router.navigate(['/teams']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
}