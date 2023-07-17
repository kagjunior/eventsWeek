import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CodeService {
  url = 'https://diasporaevents.onrender.com/api';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://diasporaevents-3781f.web.app'
  });
  constructor(private http: HttpClient) { }

  public getCodeVerify(body: any): Observable<any> {
    return this.http.post<any>(this.url + '/verify-code', body, {headers: this.headers});
  }
}
