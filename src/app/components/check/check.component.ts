import { Component, OnInit } from '@angular/core';
import {CodeService} from "../../services/code.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss']
})
export class CheckComponent implements OnInit {
  email!:string
  code!: number
  loading: boolean = false
  constructor(private codeService: CodeService, private router: Router) { }

  ngOnInit(): void {
  }
 public validateCheck() {
    if(this.email === undefined || this.code === undefined) {
      alert('Tous les champs sont obligatoires');
    } else {
      let body = {
        email: this.email,
        code: this.code
      };
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
      }, 2000);
    }
 }

}
