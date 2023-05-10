import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


let httpOptions = {
  headers: new HttpHeaders()
};

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  key: string;

  private _url5: string = environment.url_5 + "User/";
  private _url3: string = environment.url_2 + "Search/";
  private url_bookingTemp: string = environment.url_2 + "Booking/";
  private url_countries: string = environment.url_2 + "Country/";
  private url_document: string = environment.url_5 + 'DocumentType/';



  constructor(private http: HttpClient) {
    this.key = environment.key;
   }

  getUserByCompany(data: any): Observable<any> {
    httpOptions.headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    return this.http.post<any[]>(this._url5 + "GetUserByFreeText", data, httpOptions);
  }

  getCountries(): Observable<any> {
    httpOptions.headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });

    return this.http.get<any>(this.url_countries + 'GetCountry', httpOptions);
  }

  getDocument(data: boolean): Observable<any> {
    httpOptions.headers = new HttpHeaders({
      
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    const url = `${this.url_document + 'GetDocumentTypeList'}?${'isAdministrator=' + data}`;
    return this.http.get<any>(url, httpOptions);
  }

 

  getFareFamily(dataPost:any): Observable<any> {
    httpOptions.headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });

    return this.http.post<any>(this._url3 + 'GetFamilyDescription', dataPost, httpOptions);
  }

  searchFlight(data: any): Observable<any> {
    httpOptions.headers = new HttpHeaders({
       'Content-Type': "application/json",
       'Ocp-Apim-Subscription-Key': this.key
     });
     return this.http.post<any>(this._url3 + "SearchFlight", data, httpOptions);
   }

   fligthAvailibility(data: any): Observable<any> {
    httpOptions.headers = new HttpHeaders({
      
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    return this.http.post<any>(this.url_bookingTemp + "GetFlightAvailability", data, httpOptions);
  }
 
}
