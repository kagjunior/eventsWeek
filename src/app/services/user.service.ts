import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:8889/api';
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
}
