import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { ShowTeamComponent } from '../showTeam/showTeam.component';
import axios from 'axios';
import { CommonModule } from '@angular/common';

interface Teams {
  id: number;
  name: string;
  urlImage: string;
}

interface TeamResult {
  count: number;
  result: Teams[]
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, ShowTeamComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  teams: Teams[]

  ngOnInit(): void {
    this.getTeams()
  }

  async getTeams() {
    const apiResult = await axios.get('http://localhost:3000/team', {
      params: {
        skip: 1,
        take: 10
      }
    })
    const teams: TeamResult = apiResult.data
    console.log(teams.result)
    this.teams = teams.result
  }
}
