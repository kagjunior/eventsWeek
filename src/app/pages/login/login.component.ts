import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {TokenService} from "../../services/token.service";
import {ModalDialogService} from "ngx-modal-dialog";
import {DialogComponent} from "../../components/dialog/dialog.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  error:boolean = false;
  loading: boolean = false;
  islog:boolean = false;
  constructor(private router: Router,
              private authService: AuthService,
              private tokenService: TokenService,
              private modalService: ModalDialogService,
              private view: ViewContainerRef) { }

  ngOnInit(): void {
    this.error = false;
    this.islog = false;
  }

  login() {
    if(this.user.password === '' || this.user.email === '') {
      this.error = true;
    } else {
      this.loading = true;
      setTimeout(() => {
        this.authService.login(this.user).subscribe((data) => {
          if(data['message'] === 'error') {
            this.islog = true;
            this.loading = false;
          } else if(data['msg'] === 'lid') {
            alert("Votre compte n'est pas encore validé.");
            this.loading = false;
          } else if(data['message'] === 'wordError') {
              alert('Votre mot de passe est invalide');
              this.loading = false
          } else {
            this.tokenService.saveToken(data.access_token);
            this.loading = false;
            //this.authService.logged.next(true);
          }
          //
          //console.log(data.access_token);
        })
      }, 3000);
    }
  }
  forgetPassword() {
    if(this.user.email === '') {
      alert("Saisissez d'abord votre email");
    } else {
      this.loading = true;
      setTimeout(() => {
        let body = {
          email: this.user.email
        }
        this.authService.sendPassword(body).subscribe(res =>{
            if(res['msg'] === 'notCompte') {
              alert("Cet email n'existe pas.")
              this.loading = false;
            } else if(res['msg'] === 'error') {
              alert("Something is wrong");
              this.loading = false;
            } else {
              localStorage.setItem('user', res['id']);
              this.modalService.openDialog(this.view, {
                title: 'Information',
                childComponent: DialogComponent
              });
              this.loading = false;
            }
        })
      }, 2000)
    }
  }

}
