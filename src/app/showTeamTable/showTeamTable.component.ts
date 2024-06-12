import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-showTeamTable',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './showTeamTable.component.html',
  styleUrl: './showTeamTable.component.css',
})

export class ShowTeamTableComponent {
  @Input() position: number;
  @Input() name: string;
  @Input() imageUrl: string;
  @Input() points: number;
  @Input() victories: number;
  @Input() defeats: number;
  @Input() draws: number;
  @Input() games: number;
  @Input() goals: number;
  @Input() recentMatches: string[]
}
