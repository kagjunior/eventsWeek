import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import jwt_decode from "jwt-decode";
import {TokenService} from "./services/token.service";
import {User} from "./models/user";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user!: unknown
  title = 'eventsWeek';
  logged: boolean = false;

  constructor(private tokenService: TokenService, private cdt: ChangeDetectorRef) {
  }
  ngOnInit() {
    this.getUser();
  }

  public getUser() {
    const tokenJwt = this.tokenService.getToken();
    if(tokenJwt) {
      const decodeJwt = jwt_decode(tokenJwt);
      this.logged = true;
      this.user = decodeJwt;
    } else {
      this.logged = false;
    }
    // @ts-ignore

  }

}
