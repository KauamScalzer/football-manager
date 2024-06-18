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
  @Input() showCommentsButton: boolean = true

  constructor(private router: Router) {}

  openCommentsPage() {
    console.log(this.matchId)
    this.router.navigate(['/comments', this.matchId]);
  }

  formatDate(data: Date): string {
    // Definir os dias da semana
    const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    
    // Definir os meses
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    
    // Obter o dia, mês e ano
    const dia = data.getDate();
    const mes = data.getMonth();
    const ano = data.getFullYear();
    
    // Obter o dia da semana e o mês por extenso
    const diaSemana = diasSemana[data.getDay()];
    const mesExtenso = meses[mes];
    
    // Obter a hora e o minuto
    const hora = data.getHours();
    const minuto = data.getMinutes();
    
    // Formatar a data no formato desejado
    return `${dia < 10 ? '0' + dia : dia}/${mes < 9 ? '0' + (mes + 1) : mes + 1} ${mesExtenso} ${hora}:${minuto < 10 ? '0' + minuto : minuto}`;
  }
}
