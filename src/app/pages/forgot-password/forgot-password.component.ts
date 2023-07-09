import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  password!: string
  loading: boolean = false;
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }
  public initPassword() {
    if(this.password === '') {
      alert('Mot de passe obligatoire')
    } else {
      this.loading = true;
      setTimeout(() => {

        let body = {
          password: this.password,
          // @ts-ignore
          id: eval(localStorage.getItem('user'))
        }
        this.authService.initPassword(body).subscribe(res => {
          if(res['msg'] === 'top') {
            this.loading = false;
            this.router.navigate(['/login']);
            localStorage.removeItem('user');
          } else {
            alert('Une erreur est survenue');
            this.loading = false;
          }
        })
      }, 2000)
    }
  }

}
