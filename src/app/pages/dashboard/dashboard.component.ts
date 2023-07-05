import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";
import {TokenService} from "../../services/token.service";
import {EventService} from "../../services/event.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  eventsInfo! :any
  eventArrayUser: any[] = []
  constructor(private tokenService: TokenService,
              private eventService: EventService) { }

  ngOnInit(): void {
    const id = this.getUserId(this.tokenService.getToken());
    this.getReservation(id);
    this.getEventByUser(id);
  }
  public getReservation(id) {
    this.eventService.getReservationByUserId(id).subscribe(res => {
      this.eventsInfo = res;
     // console.log(this.eventsInfo);
    })
  }
  public getEventByUser(id) {
    this.eventService.getEventByUserId(id).subscribe(res => {
      res.forEach(event => {
        this.eventService.getTotalReservation(event.eventId).subscribe(res => {
          res.forEach(count => {
            event.total = count.total;
          })

        });
        this.eventArrayUser.push(event);
        console.log(this.eventArrayUser);
      })
    })
  }
  public getUserId(token) {
    // @ts-ignore
    return jwt_decode(token).id;
  }

}
