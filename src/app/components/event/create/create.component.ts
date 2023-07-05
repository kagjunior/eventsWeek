import { Component, OnInit } from '@angular/core';
import {Events} from "../../../models/event";
import {Token} from "@angular/compiler";
import {TokenService} from "../../../services/token.service";
import jwt_decode from "jwt-decode";
import {EventService} from "../../../services/event.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  ckeditorContent: any
  events: Events = new Events();
  loading: boolean = false
  constructor(private tokenService: TokenService,
              private eventService: EventService,
              private router: Router) { }

  ngOnInit(): void {
    this.events.userId = this.getUserId(this.tokenService.getToken());
  }
  public createEvent() {
    this.events.description = this.ckeditorContent;
    this.events.statut = 0;
    this.loading = true;
    setTimeout(() => {
      this.eventService.addEvent(this.events).subscribe(res => {
          if(res['notallowed']) {
            alert("Vous avez déjà créé un évènement qui est en cours. Nous vous prions de le préparer au maximum pour sa réussite avant de créer un autre.")
            this.loading = false;
          }
          this.router.navigate(['/dashboard']);
          this.loading = false;
      })
    }, 2000)

  }

  public getUserId(token) {
    // @ts-ignore
    return jwt_decode(token).id;
  }

}
