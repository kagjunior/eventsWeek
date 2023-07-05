import { Injectable } from '@angular/core';
import {Token} from "../models/token";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router: Router, private authService: AuthService) { }

  public saveToken(token: string): void {
    localStorage.setItem('token', token);
    window.location.href = this.authService.urlDirect;
  };

  public isLogged(): boolean {
    const token = localStorage.getItem('token');
    return !! token;
  };
  public clearToken(): void {
    localStorage.removeItem('token');
  }
  public getToken(): string | null {
   return localStorage.getItem('token');
  }
  public clearTokenExpired(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
