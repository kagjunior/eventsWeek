import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TokenService} from "../../services/token.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input()
  user: any
  @Input()
  logged!: boolean;
  loading: boolean = false;
  constructor(private router: Router, private tokenService: TokenService, private authService: AuthService) { }


  ngOnInit(): void {

  }
  home() {
    this.router.navigate(['/home']);
  }
  logout() {
    this.loading = true;
    //this.authService.logged.next(false);
    setTimeout(() => {
      this.tokenService.clearToken();
      window.location.href = this.authService.urlDirect;
      this.loading = false;
      //this.cdt.detectChanges();
    }, 2000);
  }
}
