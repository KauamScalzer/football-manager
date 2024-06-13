import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-matchCard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './matchCard.component.html',
  styleUrl: './matchCard.component.css',
})

export class MatchCardComponent {
  @Input() homeTeamImage: string;
  @Input() awayTeamImage: string;
  @Input() matchDate: Date;
  @Input() homeTeamGoals?: number;
  @Input() awayTeamGoals?: number;
}
