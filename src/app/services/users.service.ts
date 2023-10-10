import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/enviroments/enviroment';
import { User, CreateUserDTo } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = `${environment.API_URL}/users`;

  constructor(private http: HttpClient) { }

  create(dto: CreateUserDTo){
    return this.http.post<User>(this.apiUrl, dto)
  }

  getAllUsers(){
    return this.http.get<User[]>(this.apiUrl)
  }
}
