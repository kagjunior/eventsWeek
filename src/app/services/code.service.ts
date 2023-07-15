import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CodeService {
  url = 'https://diasporaevents-03872cd5beb2.herokuapp.com/api';
  constructor(private http: HttpClient) { }

  public getCodeVerify(body: any): Observable<any> {
    return this.http.post<any>(this.url + '/verify-code', body);
  }
}
