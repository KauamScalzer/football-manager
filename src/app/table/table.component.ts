import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { UserService } from '../userService/user.service';
import { Router } from '@angular/router';
import axios from 'axios';
import { ShowTeamTableComponent } from '../showTeamTable/showTeamTable.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, ShowTeamTableComponent, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  tournamentName: string
  tableTeams: {
    team: string,
    teamImage: string,
    goals: number,
    wins: number,
    loses: number,
    draw: number,
    points: number,
    games: number
    recentMatches: string[]
  }[]
  
  async ngOnInit(): Promise<void> {
    const userData = this.userService.getUser();
    if (!userData) {
      this.router.navigate(['/login']);
    }

    const table = await axios.get('http://localhost:3000/table/1')
    this.tournamentName = table.data.tournamentName
    this.tableTeams = table.data.table
  }
}
