import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: {
    id: number;
    username: string;
    teamId?: number;
  };

  constructor() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.user = JSON.parse(savedUser);
    }
  }

  setUser(user: { id: number; username: string; teamId?: number }) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    return this.user;
  }

  setTeamId(teamId: number) {
    this.user.teamId = teamId;
    localStorage.setItem('user', JSON.stringify(this.user));
  }
}
