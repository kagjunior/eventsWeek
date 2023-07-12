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
  archived: boolean = false;
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
      this.eventsInfo.forEach(ev => {
        let day1 = new Date(ev.dateEnd);
        let day2 = new Date();
        if(day1 >= day2) {
          ev.archived = false;
        } else {
          ev.archived = true;
        }
      })
    })
  };
  public getEventByUser(id) {
    this.eventService.getEventByUserId(id).subscribe(res => {
      res.forEach(event => {
        let day1 = new Date(event.dateEnd);
        let day2 = new Date();
        this.eventService.getTotalReservation(event.eventId).subscribe(res => {
          res.forEach(count => {
            event.total = count.total;
            if(day1 >= day2) {
              event.archived = false;
            } else {
              event.archived = true;
            }
          })
        });
        this.eventArrayUser.push(event);
      })
    })
  }
  public getUserId(token) {
    // @ts-ignore
    return jwt_decode(token).id;
  }

}
