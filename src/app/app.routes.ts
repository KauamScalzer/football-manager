import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TeamsComponent } from './teams/teams.component';
import { TableComponent } from './table/table.component';
import { MatchesComponent } from './matches/matches.component';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'teams', component: TeamsComponent},
  { path: 'table', component: TableComponent},
  { path: 'matches', component: MatchesComponent}
];
