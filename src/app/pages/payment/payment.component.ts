import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {render} from "creditcardpayments/creditCardPayments";
import {ActivatedRoute, Router} from "@angular/router";
import {EventService} from "../../services/event.service";
import jwt_decode from "jwt-decode";
import {TokenService} from "../../services/token.service";
import * as events from "events";
import {DatePipe} from "@angular/common";
import {User} from "../../models/user";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  isClicked: boolean = false;
  loading: boolean = false;
  events!: any
  id!: any
  nombre!: number
  total!: number
  inputs: any[] = [];
  users: User[] = [];
  // @ts-ignore
  userFiliation = jwt_decode(localStorage.getItem('token')).filiation
  @ViewChild('inputContainer', { static: true }) inputContainer!: ElementRef;
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private eventService: EventService,
              private  tokenService: TokenService,
              private datePipes: DatePipe) { }

  ngOnInit(): void {
    this.isClicked = false;
    this.activatedRoute.paramMap.subscribe(res => {
      this.id = res.get('id');
        this.eventService.getEventsById(this.id).subscribe(re => {
          this.events = re[0];
          //console.log(this.events);
        })
    })
  };
  generateInputs(): void {
    this.inputs = [];
    const numberOfInputs = this.nombre - 1; // Nombre donné d'inputs
    for (let i = 0; i < numberOfInputs; i++) {
      this.inputs.push({ value: 'Votre div ' + (i + 1) });
    }
  }


  public getUserId(token) {
    // @ts-ignore
    return jwt_decode(token).id;
  }
  handleClick() {
    this.isClicked = true;
    this.total = this.nombre * this.events.prix;
    this.generateInputs();
  }
  modify() {
    this.isClicked = false;
  }
  payer() {
    /*let newUser: User = {
      filiation:'',
      email: '',
      telephone: ''
    }
    this.users.push(newUser);
    console.log(this.users);*/
    let body = {
      userId: this.getUserId(this.tokenService.getToken()),
      eventId: this.id,
      statut: 1,
      createdAt: this.datePipes.transform(new Date(), 'EEEE d MMMM yyyy', 'fr-FR'),
      nombreInvite: this.nombre
    }
    render({
      id: '#paypal',
      currency: 'EUR',
      // @ts-ignore
      value: this.total,
      onApprove: details => {
        this.loading = true;
        //console.log(details);
        setTimeout(() => {
          this.eventService.reserverEvent(body).subscribe(res => {
            if(res['msg'] === 'tik') {
              this.loading = false;
              this.router.navigate(['/success/payment'])
            } else {
              this.loading = false;
              alert("erreur lors du paiement. Vous n'êtes débités.")
            }
          })
        }, 1500);
      }
    })
  }
}
