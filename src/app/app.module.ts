import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuLeftComponent } from './components/menu-left/menu-left.component';
import { FooterComponent } from './components/footer/footer.component';
import { ListEventComponent } from './components/list-event/list-event.component';
import { EventComponent } from './components/event/event.component';
import { CreateComponent } from './components/event/create/create.component';
import { CKEditorModule } from 'ng2-ckeditor';
import {FormsModule} from "@angular/forms";
import { ReservationComponent } from './components/reservation/reservation.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { DetailEventComponent } from './pages/detail-event/detail-event.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SuccessComponent } from './pages/success/success.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { OtpComponent } from './components/otp/otp.component';
import {HttpClientModule} from "@angular/common/http";
import {TokenInterceptorProvider} from "./_interceptors/token.interceptor";
import { CheckComponent } from './components/check/check.component';
import {DatePipe} from "@angular/common";
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { DialogComponent } from './components/dialog/dialog.component';
import {ModalDialogModule} from "ngx-modal-dialog";
import { ContactComponent } from './pages/contact/contact.component';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    HeaderComponent,
    MenuLeftComponent,
    FooterComponent,
    ListEventComponent,
    EventComponent,
    CreateComponent,
    ReservationComponent,
    AccueilComponent,
    DetailEventComponent,
    PaymentComponent,
    SpinnerComponent,
    SuccessComponent,
    LoginComponent,
    SignUpComponent,
    OtpComponent,
    CheckComponent,
    ForgotPasswordComponent,
    DialogComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CKEditorModule,
    HttpClientModule,
    ModalDialogModule.forRoot()
  ],
  providers: [TokenInterceptorProvider, DatePipe, { provide: LOCALE_ID, useValue: "fr-FR" }],
  bootstrap: [AppComponent]
})
export class AppModule { }
