import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: {
    id: number
    username: string
    teamId?: number
  } | null = null;
  constructor() { }

}