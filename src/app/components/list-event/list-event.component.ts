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
  timeStart!: any
  timeEnd!: any
  constructor(private datePipes: DatePipe,
              private eventService: EventService) { }

  ngOnInit(): void {
    // @ts-ignore
    this.date = this.datePipes.transform(this.event.dateStart, 'EEEE d MMMM yyyy', 'fr-FR');
    // @ts-ignore
    this.timeStart = this.event.hourStart.slice(0, 2) + 'h';
    // @ts-ignore
    this.timeEnd = this.event.hourEnd.slice(0, 2) + 'h';
    this.eventService.getTotalReservation(this.event.eventId).subscribe(res => {
      this.restant = this.event.place - eval(res[0].total);
    })
  }

}
