import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { ShowTeamComponent } from '../showTeam/showTeam.component';
import axios from 'axios';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, ShowTeamComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  teamImageUrl: string = "https://s.sde.globo.com/media/organizations/2018/04/10/Flamengo-2018.svg";
  teamName: string = "Flamengo";

  async getTeams() {
    const teams = await axios.get("localhost:3000/team?take=10&skip=1")
    console.log(teams)
  }
}
