import {Component, Input, OnInit} from '@angular/core';
import {Events} from "../../models/event";
import {EventService} from "../../services/event.service";
import {UserService} from "../../services/user.service";
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import {AuthService} from "../../services/auth.service";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  @Input()
  eventArrayUser!: any
  activeTab: string = 'tab1';
  usersReserved: any = [];
  data: any;
  loading: boolean = false;
  @Input()
  archived!: boolean;
  constructor(private eventService: EventService,
              private userService: UserService,
              private authService: AuthService) { }
  openTab(tabId: string) {
    this.activeTab = tabId;
  }
  ngOnInit(): void {
  }
  showModal: boolean = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
  public getReservations(id) {
    //this.usersReserved.push(['Prénom et nom'])
    this.eventService.getListeReservation(id).subscribe(res => {
      //console.log(res);
      this.usersReserved = res;
      this.generatePDF();
      });
  }

  public cancelEvent(id) {
    this.closeModal();
    this.loading = true;
    setTimeout(() => {
      this.userService.CancelEvent(id).subscribe(res => {
        if(res['msg'] === 'ok') {
          //console.log('supprimé');
          this.closeModal();
          this.loading = false;
          window.location.href = this.authService.urlDashboard;
        } else {
          //console.log('erreur');
          this.loading = false;
          this.closeModal();
          alert('Désolé ! une erreur s\'est produite');
        }
      })
    }, 2000)
  }
  generatePDF() {
    const tableData: any = [];
    tableData.push(['Prénom et Nom', 'Accompagnants']); // En-tête de la table

    this.usersReserved.forEach(user => {
      tableData.push([user.filiation, 'avec ' + ' ' + (user.nombreInvite - 1)+ ' ' + 'personne(s) ']); // Ligne de données
      //console.log(tableData);

     //


    });

    const documentDefinition = {
      content: [
        {
          text: [
            {
              text: 'Liste des participants',
              fontSize: 18,
              bold: true,
              margin: [0, 20, 0, 20],
              alignment: 'center'
            }
          ]
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*'], // Définir la largeur des colonnes
            body: tableData
          }
        }
      ]
    };

    pdfMake.createPdf(documentDefinition).open();
  }


}
