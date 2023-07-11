import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/contact';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contact = new Contact();
  loading: boolean = false;
  modal: boolean = false;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.modal = false;
  }
  closeModal() {
    this.router.navigate['/'];
    this.modal = false;
    
  }
  sendMessage() {
    //console.log(this.contact);
    if(this.contact.filiation === undefined || this.contact.email === undefined || this.contact.message === undefined || this.contact.objet === undefined) {
      alert('Tous les champs sont obligatoires.');
    } else {
      this.loading = true;
      setTimeout(() => {
        this.userService.contact(this.contact).subscribe(res => {
          if(res['msg'] === 'se') {
            this.loading = false;
            this.modal = true;
            this.contact = {};
          }
        })
      })
    }
  }

}
