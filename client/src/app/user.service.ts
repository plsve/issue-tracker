import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser = null;

  private usersUrl = environment.backendUrl + 'users'

  constructor(
    private authService: AuthService,
    private http: HttpClient
    ) { }

  getUsers(queryParams){
    return this.http.get<any>(this.usersUrl, {
      params: queryParams
    });
  }

  getUser(id){
    return this.http.get<any>(this.usersUrl + '/' + id);
  }
}
