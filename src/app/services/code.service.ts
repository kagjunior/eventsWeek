import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CodeService {
  url = 'http://localhost:8889/api';
  constructor(private http: HttpClient) { }

  public getCodeVerify(body: any): Observable<any> {
    return this.http.post<any>(this.url + '/verify-code', body);
  }
}
