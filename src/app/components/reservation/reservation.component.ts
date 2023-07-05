import {Component, Input, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import jwt_decode from "jwt-decode";
import {UserService} from "../../services/user.service";

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
  constructor(private datePipes: DatePipe,
              private userService: UserService) { }

  ngOnInit(): void {
    this.eventInfo.forEach(event => {
      this.date = this.datePipes.transform(event.dateStart, 'EEEE d MMMM yyyy', 'fr-FR');
      this.lieu = event.lieu;
      this.id = event.eventId
    })
  }
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
  public download() {
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
          text: 'Date: '+this.date,
          style: 'subheader'
        },
        {
          text: 'Lieu: '+this.lieu,
          style: 'subheader'
        },
        {
          text: 'Votre billet:',
          style: 'subheader'
        },
        {
          qr: this.id+'_EVENT'+'_'+this.date,
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
  public cancelReservation(id: any) {
    this.closeModal();
    this.loading = true;
    setTimeout(() => {
      this.userService.CancelReservation(id).subscribe(res => {
        if(res['msg'] === 'nik') {
          //console.log('supprimé');
          this.closeModal();
          this.loading = false;
        } else {
          //console.log('erreur');
          this.loading = false;
          this.closeModal();
        }
      })
    }, 2000)

  }
}
