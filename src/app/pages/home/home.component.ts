import { Component, OnInit } from '@angular/core';
import {EventService} from "../../services/event.service";
import {Events} from "../../models/event";
// @ts-ignore
import {} from '@types/googlemaps';
import { UserService } from 'src/app/services/user.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  eventsArray: Events[] = [];
  currentCity: any
  archived!: boolean
  constructor(private eventService: EventService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.getEvents();
  }

 

 /* getCityFromGeolocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          this.getCityFromCoordinates(latitude, longitude);
        },
        (error) => {
          console.error('Erreur de géolocalisation :', error);
        }
      );
    } else {
      console.error('La géolocalisation n\'est pas prise en charge par ce navigateur.');
    }
  }
  getCityFromCoordinates(latitude: number, longitude: number): void {
    // @ts-ignore
    const geocoder = new google.maps.Geocoder();
    // @ts-ignore
    const latLng = new google.maps.LatLng(latitude, longitude);

    geocoder.geocode({ 'location': latLng }, (results, status) => {
      // @ts-ignore
      if (status === google.maps.GeocoderStatus.OK && results[0]) {
        // La ville se trouve généralement dans le résultat "locality"
        const city = this.getCityFromAddressComponents(results[0].address_components);
        console.log('Ville:', city);
      } else {
        console.error('Erreur de géocodage :', status);
      }
    });
  }

  getCityFromAddressComponents(components: google.maps.GeocoderAddressComponent[]): string {
    for (const component of components) {
      if (component.types.includes('locality')) {
        return component.long_name;
      }
    }
    return '';
  } */

  public getEvents() {
    this.eventService.getEvents()
    .subscribe(res => {
      this.eventsArray = res;
      this.eventsArray.forEach(event => {
        let day1 = new Date(event.dateEnd);
        let day2 = new Date();
        if(day1 >= day2) {
          event.archived = false;
        } else {
          event.archived = true;
        }
      })
    })
  };

}
