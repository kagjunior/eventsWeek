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
          this.eventTab = res[0];
        this.eventService.getTotalReservation(this.eventTab.eventId).subscribe(res => {
          //console.log(this.event.place);
          // console.log(res)
          this.restant = this.eventTab.place - eval(res[0].total);
        })
          this.descriptionHtml = this.sanitizer.bypassSecurityTrustHtml(this.eventTab.description);
          this.date = this.datePipes.transform(this.eventTab.dateStart, 'EEEE d MMMM yyyy', 'fr-FR');
      })
    });
    let body = {
      userId: eval(this.getUserId(localStorage.getItem('token'))),
      eventId: this.eventId
    }
    this.eventService.checkIfReserved(body).subscribe(res => {
      console.log(res)
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
