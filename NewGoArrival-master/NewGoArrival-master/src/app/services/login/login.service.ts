import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

let httpOptions = {
  headers: new HttpHeaders()
};

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _url: string = environment.url + "Authenticate/";

  constructor(private http: HttpClient) { }

  login(datos: any): Observable<any> {
    httpOptions.headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': environment.key
    });
    return this.http.post<any>(this._url + "LoginUser", datos, httpOptions);
  }

}
