import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { ShowTeamComponent } from '../showTeam/showTeam.component';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

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
    FooterComponent,
    ShowTeamComponent,
    CommonModule,
    NgxPaginationModule,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  currentPage: number = 1;
  totalPages: number = 0;
  teams: Teams[] = [];
  totalFilteredItems: number = 0;
  filteredTeams: Teams[] = [];
  searchTerm: string = '';

  ngOnInit(): void {
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
}
