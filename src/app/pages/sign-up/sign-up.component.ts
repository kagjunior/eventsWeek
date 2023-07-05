import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {AuthService} from "../../services/auth.service";
import {CodeService} from "../../services/code.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  user: User = new User();
  verifyCode!: string
  loading: boolean = false;
  missingCode: boolean = false;
  constructor(private authService: AuthService,
              private codeService: CodeService,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.missingCode = false;
  }
  public SignUp() {
    if(this.user.filiation === undefined || this.user.adresse === undefined || this.user.email === undefined || this.user.telephone === undefined || this.user.codePostal === undefined || this.user.ville === undefined || this.user.password === undefined) {

    } else {
      this.loading = true;
      setTimeout(() => {
        this.authService.signUp(this.user).subscribe(res => {
          if(res['msg'] === 'code') {
            this.missingCode = true;
            this.loading = false;
          } else if(res['message'] === 'exist'){
            alert('Cet utilisateur existe déjà');
          } else {
            alert('erreur');
          }
        })
      }, 2000)
    }
  }
  public validateSignUp() {
    let body = {
      code: this.verifyCode,
      email: this.user.email
    };
    this.loading = true;
    setTimeout(() => {
      this.codeService.getCodeVerify(body).subscribe(res => {
        if(res['msg'] === 'ok') {
          this.router.navigate(['/login']);
          this.loading = false;
        } else {
          alert('code non valid');
          this.loading = false;
        }
      })
    }, 2000)
  }
  public checkCode() {
    this.router.navigate(['/check-valid']);
  }
}
