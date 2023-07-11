import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {CreateComponent} from "./components/event/create/create.component";
import {DetailEventComponent} from "./pages/detail-event/detail-event.component";
import {PaymentComponent} from "./pages/payment/payment.component";
import {SuccessComponent} from "./pages/success/success.component";
import {LoginComponent} from "./pages/login/login.component";
import {SignUpComponent} from "./pages/sign-up/sign-up.component";
import {AuthGuard} from "./_helpers/auth.guard";
import {CheckComponent} from "./components/check/check.component";
import {ForgotPasswordComponent} from "./pages/forgot-password/forgot-password.component";
import { ContactComponent } from './pages/contact/contact.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'dashboard', component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'event/create', component: CreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'event/:id', component: DetailEventComponent
  },
  {
    path: 'payment/:id', component: PaymentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'success/payment', component: SuccessComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'sign-up', component: SignUpComponent
  },
  {
    path: 'check-valid', component: CheckComponent
  },
  {
    path: 'init-password', component: ForgotPasswordComponent
  },
  {
    path: 'contact', component: ContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
