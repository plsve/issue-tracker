import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = environment.backendUrl + 'auth/login';
  public user;
  public accessToken;

  constructor(private http: HttpClient) { }

  login(user) {
    this.http.post<any>(this.loginUrl, user).subscribe(
      r => {
        this.accessToken = r.access_token;
        this.user = r.user;
        console.log(r);
      },
      err => {
        console.log(err);
      }
    )
  }
}
