import {Component, ComponentRef, OnInit} from '@angular/core';
import {IModalDialog, IModalDialogButton, IModalDialogOptions, ModalDialogOnAction} from "ngx-modal-dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, IModalDialog {
  actionButtons!: IModalDialogButton[];

  constructor() {
    this.actionButtons = [
      {text: 'Ok, merci'},
    ];
  }
  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {
    // no processing needed
  }
  ngOnInit(): void {
  }

}
