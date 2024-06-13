import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-showComments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './showComments.component.html',
  styleUrl: './showComments.component.css',
})

export class ShowCommentsComponent {
  @Input() comment: string;
  @Input() username: string;
  @Input() date: Date;
}
