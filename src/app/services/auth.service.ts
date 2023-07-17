import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../models/user";
import {Token} from "../models/token";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //logged = new BehaviorSubject<boolean>(false);
  url = 'https://diasporaevents.onrender.com/api';
  urlDirect = 'https://diasporaevents-3781f.web.app';
  urlDashboard = 'https://diasporaevents-3781f.web.app/dashboard';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://diasporaevents-3781f.web.app'
  });
  constructor(private http: HttpClient) { }

  public login(user: User): Observable<Token> {
    return this.http.post<Token>(this.url + '/login', user, {headers: this.headers});
  }
  public signUp(user: User): Observable<User> {
    return this.http.post<User>(this.url + '/sign-up', user, {headers: this.headers});
  }
  public sendPassword(email): Observable<any> {
    return this.http.post(this.url+'/forgotPassword', email, {headers: this.headers});
  }
  public initPassword(body): Observable<any> {
    return this.http.post(this.url+'/new-password', body, {headers: this.headers});
  }
}
