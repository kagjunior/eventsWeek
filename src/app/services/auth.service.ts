import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../models/user";
import {Token} from "../models/token";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //logged = new BehaviorSubject<boolean>(false);
  url = 'https://diasporaevents-03872cd5beb2.herokuapp.com/api';
  urlDirect = 'http://localhost:4200';
  urlDashboard = 'http://localhost:4200/dashboard'
  constructor(private http: HttpClient) { }

  public login(user: User): Observable<Token> {
    return this.http.post<Token>(this.url + '/login', user);
  }
  public signUp(user: User): Observable<User> {
    return this.http.post<User>(this.url + '/sign-up', user);
  }
  public sendPassword(email): Observable<any> {
    return this.http.post(this.url+'/forgotPassword', email);
  }
  public initPassword(body): Observable<any> {
    return this.http.post(this.url+'/new-password', body);
  }
}
