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
    console.log(this.eventInfo);
    console.log(this.eventArrayUser);
    this.eventArrayUser.forEach(event => {
        this.total = event.total;
        this.price = event.prix;
      /*let day1 = new Date(event.dateEnd);
      let day2 = new Date();
      if(day1 >= day2) {
        console.log('en cours')
      } else {
        console.log('passé');
      }*/
    });
    //this.filteredEvent = this.eventArrayUser.filter(event => console.log(event));
    //console.log(this.filteredEvent);
  }

}
