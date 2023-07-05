import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Events} from "../models/event";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  url = 'http://localhost:8889/api';
  constructor(private http: HttpClient) { }

  public addEvent(events: Events): Observable<Events> {
    return this.http.post<Events>(this.url + '/event/add-event', events);
  }
  public getEvents(): Observable<Events[]> {
    return this.http.get<Events[]>(this.url + '/list-event');
  }
  public getEventsById(id: number): Observable<Events> {
    return this.http.get<Events>(this.url + '/list-event/'+id);
  }
  public reserverEvent(body: any): Observable<any>{
    return this.http.post(this.url+'/reservation', body);
  }
  public getReservationByUserId(userId: any): Observable<any> {
    return this.http.get(this.url+'/list-reservation/'+userId);
  }
  public getEventByUserId(id: any): Observable<any> {
    return this.http.get(this.url+'/user-event/'+id);
  }
  public getTotalReservation(eventId): Observable<any> {
    return this.http.get(this.url+'/event-reservation/'+eventId);
  }
  public checkIfReserved(body): Observable<any> {
    return this.http.post(this.url+'/check-reservation', body);
  }
  public getListeReservation(eventId): Observable<any> {
    return this.http.get(this.url+'/event/reservations/' + eventId);
  }
}
