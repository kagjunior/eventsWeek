import {Component, Input, LOCALE_ID, OnInit} from '@angular/core';
import {Events} from "../../models/event";
import {DatePipe} from "@angular/common";
import { format, Locale } from 'date-fns';
import { fr } from 'date-fns/locale';
import {EventService} from "../../services/event.service";
// @ts-ignore

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }]
})
export class ListEventComponent implements OnInit {
  @Input()
  event!: Events;
  date !: any
  restant!: any
  constructor(private datePipes: DatePipe,
              private eventService: EventService) { }

  ngOnInit(): void {
    // @ts-ignore
    this.date = this.datePipes.transform(this.event.dateStart, 'EEEE d MMMM yyyy', 'fr-FR');
    this.eventService.getTotalReservation(this.event.eventId).subscribe(res => {
      //console.log(this.event.place);
     // console.log(res)
      this.restant = this.event.place - eval(res[0].total);
    })
  }

}
