import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TeamsComponent } from './teams/teams.component';
import { TableComponent } from './table/table.component';
import { MatchesComponent } from './matches/matches.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CommentsComponent } from './comments/comments.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'table', component: TableComponent },
  { path: 'matches', component: MatchesComponent },
  { path: 'home', component: HomeComponent },
  { path: 'comments/:matchId', component: CommentsComponent }
];
