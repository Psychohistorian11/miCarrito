import { inject, Injectable } from '@angular/core';
import { Login, User, UserResponse } from '../domains/auth/interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAPIService {

  apiUrl = 'https://micarritoapi.onrender.com'

  http = inject(HttpClient)

 
  createUser(user: User): Observable<UserResponse>{
      const url = `${this.apiUrl}/users`
      return this.http.post<UserResponse>(url, user)
  }

  updateUser(user: User){
    const url = `${this.apiUrl}/users`
    return this.http.put(url, user)
  }

  login(data: Login): Observable<UserResponse>{
    const url = `${this.apiUrl}/users/login`
    return this.http.post<UserResponse>(url,data)
  }
}
