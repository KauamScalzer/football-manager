import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { UserService } from '../userService/user.service';
import { Router } from '@angular/router';
import axios from 'axios';
import { CommonModule } from '@angular/common';
import { MatchCardComponent } from '../matchCard/matchCard.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    MatchCardComponent,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  teamHistory: {
    id: number
    date: Date,
    homeTeamGols: number,
    awayTeamGols: number,
    homeTeam: {
      urlImage: string
    },
    awayTeam: {
      urlImage: string
    }
  }[]

  async ngOnInit(): Promise<void> {
    const userData = this.userService.getUser();
    if (userData) {
      if (!userData.teamId) {
        this.router.navigate(['/teams']);
      }
      const teamHistory = await axios.get(`http://localhost:3000/table/by-team/${userData.teamId}`)
      this.teamHistory = await teamHistory.data
    } else {
      this.router.navigate(['/login']);
    }
  }
}