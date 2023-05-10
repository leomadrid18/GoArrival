import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FlightService } from 'src/app/services/flight/flight.service';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.css']
})
export class PassengersComponent implements OnInit {
  datosuser: any;
  lstpaises: any[] = [];
  lstDocument: any[] = [];
  gds: any;
  constructor(private headService: HeaderService,private cookie: CookieService,private flightService: FlightService) { }

  ngOnInit(): void {
    this.datosuser = this.cookie.get("PSG987");
    this.datosuser = this.headService.desencriptar(this.datosuser);
    this.gds = this.cookie.get("DC12$&%");
    this.gds = this.headService.desencriptar(this.gds).gds;
    this.getPaises();
  }

  getPaises(){
    this.flightService.getCountries().subscribe(
      x => {
        this.lstpaises = x;
        this.getDocument();
      }
    )
  }

  getDocument() {
    this.flightService.getDocument(false).subscribe(
      x => {
        this.lstDocument = x.ldocumentTypeLists;
      }
    );
  }

}
