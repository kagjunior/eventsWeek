import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Events} from "../models/event";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  url = 'https://diasporaevents.onrender.com/api';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://diasporaevents-3781f.web.app'
  });
  constructor(private http: HttpClient) { }

  public addEvent(events: Events): Observable<Events> {
    return this.http.post<Events>(this.url + '/event/add-event', events, {headers: this.headers});
  }
  public getEvents(): Observable<Events[]> {
    return this.http.get<Events[]>(this.url + '/list-event', {headers: this.headers});
  }
  public getEventsById(id: number): Observable<Events> {
    return this.http.get<Events>(this.url + '/list-event/'+id, {headers: this.headers});
  }
  public reserverEvent(body: any): Observable<any>{
    return this.http.post(this.url+'/reservation', body, {headers: this.headers});
  }
  public getReservationByUserId(userId: any): Observable<any> {
    return this.http.get(this.url+'/list-reservation/'+userId, {headers: this.headers});
  }
  public getEventByUserId(id: any): Observable<any> {
    return this.http.get(this.url+'/user-event/'+id, {headers: this.headers});
  }
  public getTotalReservation(eventId): Observable<any> {
    return this.http.get(this.url+'/event-reservation/'+eventId, {headers: this.headers});
  }
  public checkIfReserved(body): Observable<any> {
    return this.http.post(this.url+'/check-reservation', body, {headers: this.headers});
  }
  public getListeReservation(eventId): Observable<any> {
    return this.http.get(this.url+'/event/reservations/' + eventId, {headers: this.headers});
  }
  public getRefund(orderId): Observable<any> {
    return this.http.post(this.url+'/refund', orderId, {headers: this.headers});
  }
  public archived(body): Observable<any>{
    return this.http.post(this.url+'/archive-event', body, {headers: this.headers});
  }
}
