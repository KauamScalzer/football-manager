import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TeamsComponent } from './teams/teams.component';
import { TableComponent } from './table/table.component';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'teams', component: TeamsComponent},
  { path: 'table', component: TableComponent}
];
