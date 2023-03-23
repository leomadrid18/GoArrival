import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { map, Observable } from 'rxjs';
import { Login } from 'src/models/login/login.model';


let httpOptions = {
  headers: new HttpHeaders()
};

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _url: string = environment.url + "Authenticate/";
  private url_airports: string = environment.url_2 + "CityAirport/";

  constructor(private http: HttpClient) { }

  login(datos: any): Observable<Login> {
    httpOptions.headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': environment.key
    });
    return this.http.post<Login>(this._url + "LoginUser", datos, httpOptions);
  }

  getAirportList(data: any): Observable<any[]> {
    httpOptions.headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': environment.key
    });
    const url = `${this.url_airports + 'GetCityAirport'}?${'priority=' + data}`;
    return this.http.get<any[]>(url, httpOptions);
  }

}
