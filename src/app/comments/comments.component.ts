import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../userService/user.service';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatchCardComponent } from '../matchCard/matchCard.component';
import { ShowCommentsComponent } from '../showComments/showComments.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [
    FormsModule,
    FooterComponent,
    NavbarComponent,
    MatchCardComponent,
    ShowCommentsComponent,
    CommonModule,
  ],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent implements OnInit {
  matchId: number;

  comments: {
    comment: string;
    date: Date;
    user: {
      username: string;
    };
  }[];

  match: {
    id: number;
    date: Date;
    homeTeamGols: number;
    awayTeamGols: number;
    homeTeam: {
      urlImage: string;
    };
    awayTeam: {
      urlImage: string;
    };
  };

  newComment: string = '';

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    this.clearData();
    const userData = this.userService.getUser();
    if (!userData) {
      this.router.navigate(['/login']);
    }
    this.route.paramMap.subscribe((params) => {
      const id = params.get('matchId');
      if (id) {
        this.matchId = parseInt(id);
        console.log('Match ID:', this.matchId);
        this.getComments(this.matchId);
        this.getMatch(this.matchId);
      }
    });
  }

  clearData(): void {
    this.matchId = 0;
    this.comments = [];
    this.match = {
      id: 0,
      date: new Date(),
      homeTeamGols: 0,
      awayTeamGols: 0,
      homeTeam: { urlImage: '' },
      awayTeam: { urlImage: '' },
    };
    this.newComment = '';
  }

  async getComments(matchId: number): Promise<void> {
    try {
      const response = await axios.get(
        `http://localhost:3000/comment/by-match/${matchId}`
      );
      this.comments = response.data;
    } catch (error) {
      this.toastr.error('Erro ao buscar comentários');
      console.error(error);
    }
  }

  async getMatch(matchId: number): Promise<void> {
    try {
      const response = await axios.get(
        `http://localhost:3000/table/get-match/${matchId}`
      );
      this.match = response.data;
      console.log(response.data);
    } catch (error) {
      this.toastr.error('Erro ao buscar partida.');
      console.error(error);
    }
  }

  async addComment() {
    try {
      await axios.post(`http://localhost:3000/comment`, {
        matchId: this.matchId,
        comment: this.newComment,
        userId: this.userService.getUser().id, // Supondo que o userData tenha o ID do usuário
      });
      this.newComment = '';
      this.toastr.success('Comentário adicionado com sucesso');
      this.getComments(this.matchId);
    } catch (error) {
      this.toastr.error('Erro ao criar comentário.');
      console.error(error);
    }
  }
}
