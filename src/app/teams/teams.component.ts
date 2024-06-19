import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { ShowTeamComponent } from '../showTeam/showTeam.component';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { UserService } from '../userService/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

interface Team {
  id: number;
  name: string;
  urlImage: string;
}

interface TeamResult {
  count: number;
  result: Team[];
}

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    ShowTeamComponent,
    CommonModule,
    NgxPaginationModule,
    FormsModule,
  ],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css',
})
export class TeamsComponent implements OnInit {
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  currentPage: number = 1;
  totalPages: number = 0;
  teams: Team[] = [];
  totalFilteredItems: number = 0;
  filteredTeams: Team[] = [];
  searchTerm: string = '';
  selectedTeam: number = 0;

  ngOnInit(): void {
    const userData = this.userService.getUser();
    if (!userData) {
      this.router.navigate(['/login']);
    }
    this.selectedTeam = userData?.teamId ?? 0;
    console.log(userData);
    console.log(this.selectedTeam);
    this.getTeams(this.currentPage);
  }

  async getTeams(page: number): Promise<void> {
    const itemsPerPage = 10;
    const skip = page;
    let url = 'http://localhost:3000/team';

    if (this.searchTerm.trim() !== '') {
      url += `?search=${this.searchTerm.trim()}&`;
    } else {
      url += '?';
    }

    const apiResult = await axios.get(url, {
      params: {
        skip: skip,
        take: itemsPerPage,
      },
    });
    const teams: TeamResult = apiResult.data;
    this.totalPages = teams.count;
    this.teams = teams.result;
    this.totalFilteredItems = teams.count;
    this.filteredTeams = teams.result;
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.getTeams(page);
  }

  async search(): Promise<void> {
    this.currentPage = 1;
    this.getTeams(this.currentPage);
  }

  async onSearchChange(event: any): Promise<void> {
    this.searchTerm = event.target.value;
    this.search();
  }

  async onTeamClick(team: any): Promise<void> {
    this.selectedTeam = team.id;
    await axios.patch(
      `http://localhost:3000/user/${this.userService.getUser()?.id}`,
      {
        teamId: team.id,
      }
    );
    this.userService.setTeamId(team.id);
    this.toastr.success('Time salvo com sucesso!');
  }
}
