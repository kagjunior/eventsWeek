import {Component, Input, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import jwt_decode from "jwt-decode";
import {UserService} from "../../services/user.service";
import {EventService} from "../../services/event.service";
import { AuthService } from 'src/app/services/auth.service';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  @Input()
  eventInfo!: any
  date!: any
  lieu!: any
  id!: any
  loading: boolean = false;
  @Input()
  archived!: boolean;
  constructor(private datePipes: DatePipe,
              private userService: UserService,
              private eventService: EventService,
              private authService: AuthService) { }

  ngOnInit(): void {
  }
  archivedReservation(body) {}
  showModal: boolean = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  public getUserId(token) {
    // @ts-ignore
    return jwt_decode(token).id;
  }
  public download(id: any) {
    let date: any = '';
    let lieu: any = '';
    let idEvent: any = '';
    this.eventInfo.forEach(ev => {
      if(ev.eventId === id) {
        date = this.datePipes.transform(ev.dateStart, 'EEEE d MMMM yyyy', 'fr-FR');
        lieu = ev.lieu;
        idEvent = ev.eventId;
      }
    })
    const docDefinition = {
      content: [
        {
          // @ts-ignore
          text: (jwt_decode(localStorage.getItem('token')).filiation).toUpperCase(),
          style: 'header'
        },
        {
          text: this.eventInfo.titre,
          style: 'subheader'
        },
        {
          text: 'Date: '+date,
          style: 'subheader'
        },
        {
          text: 'Lieu: '+lieu,
          style: 'subheader'
        },
        {
          text: 'Votre billet:',
          style: 'subheader'
        },
        {
          qr: id+'_EVENT'+'_'+date,
          fit: 150,
          alignment: 'center',
          margin: [0, 20]
        }
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 20],
          color: 'green'
        },
        subheader: {
          fontSize: 16,
          bold: true,
          alignment: 'center',
          margin: [0, 10, 0, 5]
        }
      }
    };

    pdfMake.createPdf(docDefinition).open();
  };
  public cancelReservation(id: any, orderId) {
    let body = {
      orderId: orderId
    };
    //console.log(body);
    this.closeModal();
    this.loading = true;
    setTimeout(() => {
          this.loading = false;
          //console.log('remboursement effectué');
          //console.log('refund');      
          this.userService.CancelReservation(id).subscribe(res => {
            if(res['msg'] === 'nik' || res['msg'] === 'ok') {
              //console.log('supprimé');
              this.closeModal();
              this.loading = false;
              window.location.href = this.authService.urlDashboard;
            } else {
              //console.log('erreur');
              this.loading = false;
              this.closeModal();
            }
          })
    }, 2000)

  }
}
