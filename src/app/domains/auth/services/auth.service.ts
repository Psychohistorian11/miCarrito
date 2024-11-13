import { Injectable } from '@angular/core';
import { UserResponse } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  isAuthenticated(): boolean {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('user');
      return !!(token && JSON.parse(token));
    }
    return false;
  }
  
    logout(): void {
      localStorage.removeItem('user');
    }

    itsAdmin(): boolean {
      const user: UserResponse = JSON.parse(localStorage.getItem('user') || '{}');
      if (user.itsadmin){
        return true
      }else{
        return false
      }
    }

}
