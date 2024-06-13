import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

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
  @Input() matchId: number;

  constructor(private router: Router) {}

  openCommentsPage() {
    console.log(this.matchId)
    this.router.navigate(['/comments', this.matchId]);
  }
}
