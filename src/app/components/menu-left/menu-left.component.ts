import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu-left',
  templateUrl: './menu-left.component.html',
  styleUrls: ['./menu-left.component.scss']
})
export class MenuLeftComponent implements OnInit {
  @Input()
  eventInfo!: any
  @Input()
  eventArrayUser!: any
  @Input()
  archived!: boolean
  isHome: boolean = false;
  isReservation: boolean = false;
  isEvent: boolean = false;
  currentId: any
  constructor() { }

  ngOnInit(): void {
    this.isEvent = false;
    this.isHome = true;
    this.isReservation = false;
    this.choose(0);
    this.currentId = 0;
  }

  public choose(id:number) {
    if(id === 0) {
      this.isReservation = false;
      this.isEvent = false;
    } else if(id === 1) {
      this.isReservation = false;
      this.isHome = false;
      this.isEvent = true;
    } else {
      this.isReservation = true;
      this.isHome = false;
      this.isEvent = false;
    }
  }
  public chose(id) {
    this.currentId = id;
  }

}
