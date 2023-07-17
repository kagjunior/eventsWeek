import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'https://diasporaevents.onrender.com/api';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://diasporaevents-3781f.web.app'
  });
  constructor(private http: HttpClient) { }

  public getUserById(id): Observable<any> {
    return this.http.get(this.url+'/user/'+id, {headers: this.headers});
  }
  public CancelReservation(id): Observable<any> {
    return this.http.get(this.url+'/cancel-reservation/'+id, {headers: this.headers});
  }
  public CancelEvent(id): Observable<any> {
    return this.http.get(this.url+'/cancel-event/'+id, {headers: this.headers});
  }
  public getCurrentCity(): Observable<any> {
    return this.http.get('https://ipapi.co/json', {headers: this.headers});
  }
  public contact(body: Contact): Observable<any> {
    return this.http.post(this.url+'/contact', body, {headers: this.headers});
  }
}
