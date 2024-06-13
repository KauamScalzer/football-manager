import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { UserService } from '../userService/user.service';
import { Router } from '@angular/router';
import axios from 'axios';
import { MatchCardComponent } from '../matchCard/matchCard.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, MatchCardComponent, CommonModule],
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.css'
})
export class MatchesComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router
  ){}

  round: number = 1
  matches: {
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
    if (!userData) {
      this.router.navigate(['/login']);
    }
    await this.getMatches()
  }

  increaseRound(): void {
    if (this.round < 38) {
      this.round++;
      this.getMatches();
    }
  }

  decreaseRound(): void {
    if (this.round > 1) {
      this.round--;
      this.getMatches();
    }
  }

  async getMatches(): Promise<void> {
    const matchesResult = await axios.get(`http://localhost:3000/rounds/${this.round}`)
    const matches = matchesResult.data
    this.matches = matchesResult.data
    console.log(matches)
  }
}
