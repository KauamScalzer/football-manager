import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css',
})
export class TeamsComponent {}
