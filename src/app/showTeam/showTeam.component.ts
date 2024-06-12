import { Component, Input } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-showTeam',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './showTeam.component.html',
  styleUrl: './showTeam.component.css',
})
export class ShowTeamComponent {
  @Input() teamImageUrl: string;
  @Input() teamName: string;
  @Input() isSelected: boolean = false
}
