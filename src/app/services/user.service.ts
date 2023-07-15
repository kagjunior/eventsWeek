import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'https://diasporaevents-03872cd5beb2.herokuapp.com/api';
  constructor(private http: HttpClient) { }

  public getUserById(id): Observable<any> {
    return this.http.get(this.url+'/user/'+id);
  }
  public CancelReservation(id): Observable<any> {
    return this.http.get(this.url+'/cancel-reservation/'+id);
  }
  public CancelEvent(id): Observable<any> {
    return this.http.get(this.url+'/cancel-event/'+id);
  }
  public getCurrentCity(): Observable<any> {
    return this.http.get('https://ipapi.co/json');
  }
  public contact(body: Contact): Observable<any> {
    return this.http.post(this.url+'/contact', body);
  }
}
