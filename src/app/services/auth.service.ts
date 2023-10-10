import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

import { environment } from 'src/enviroments/enviroment';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.API_URL}`;

  constructor(private http: HttpClient, private TokenService: TokenService) {}

  logIn(username: string, password: string) {
    return this.http.post<Auth>(`${this.apiUrl}/auth/login`, {
      username,
      password,
    }).pipe(
      tap(response => this.TokenService.saveToken(response.token))
    );
  }

  profile(token: string) {
    // const headers = new HttpHeaders();
    // headers.set('Authorization', `Bearer ${token}`)
    return this.http.get<User>(`${this.apiUrl}/users/5`, {
      //el 5 deveria cambiar por una api que acepte token como peticion la acutal no deja
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'aplication/json',
      },
    });
  }
}
