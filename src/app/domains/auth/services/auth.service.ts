import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  isAuthenticated(): boolean {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      return !!localStorage.getItem('token');
    }
    return false;
  }
  
    login(token: string): void {
      localStorage.setItem('authToken', token);
    }
  
    logout(): void {
      localStorage.removeItem('authToken');
    }
}
