import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  @Input()
  eventArrayUser!: any
  @Input()
  eventInfo!: any
  filteredEvent!: any
  total!: any;
  price!: any
  constructor() { }

  ngOnInit(): void {
    this.eventArrayUser.forEach(event => {
        this.total = event.total;
        this.price = event.prix;
    });
  }

}
