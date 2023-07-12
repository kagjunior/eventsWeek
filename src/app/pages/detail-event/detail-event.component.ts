import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Events} from "../../models/event";
import {EventService} from "../../services/event.service";
import {DomSanitizer} from "@angular/platform-browser";
import {DatePipe} from "@angular/common";
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrls: ['./detail-event.component.scss']
})
export class DetailEventComponent implements OnInit {
  loading: boolean = false;
  eventId!: any
  eventTab!: any
  descriptionHtml!: any
  date!: any
  reserved: boolean = false;
  restant!: any
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private eventService: EventService,
              private sanitizer: DomSanitizer,
              private datePipes: DatePipe) { }

  ngOnInit(): void {
   this.activatedRoute.paramMap.subscribe(param => {
      this.eventId = param.get('id');
      this.eventService.getEventsById(this.eventId).subscribe(res => {
          this.eventTab = res;
        this.eventService.getTotalReservation(this.eventTab[0].eventId).subscribe(re => {
          console.log(re)
          this.eventTab.forEach(ev => {
            this.restant = ev.place - eval(re[0].total);
            let day1 = new Date(ev.dateEnd);
            let day2 = new Date();
            if(day1 >= day2) {
              ev.archived = false;
            } else {
              ev.archived = true;
            }
          });
          console.log(this.eventTab);

        })
          this.descriptionHtml = this.sanitizer.bypassSecurityTrustHtml(this.eventTab[0].description);
          this.date = this.datePipes.transform(this.eventTab[0].dateStart, 'EEEE d MMMM yyyy', 'fr-FR');
      })
    });
    let body = {
      userId: eval(this.getUserId(localStorage.getItem('token'))),
      eventId: this.eventId
    }
    this.eventService.checkIfReserved(body).subscribe(res => {
      this.reserved = res['msg'] !== 'notReserved';
    });

  }

  public getUserId(token) {
    // @ts-ignore
    return jwt_decode(token).id;
  }

  public buyTicket() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['/payment/'+this.eventTab.eventId]);
      this.loading = false;
    }, 2000)
  }
}
