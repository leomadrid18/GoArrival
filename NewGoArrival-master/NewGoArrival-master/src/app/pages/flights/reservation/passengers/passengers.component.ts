import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  validPassenger = false;
  flight: any;
  typevuelo: any;
  reasonFlight!: string;
  extraReason!: string;
  public myObject!: { id: number, myObject: { myString: string } };
  public usuarios!: { id: number, myObject: { myString: string } };
  constructor(private router: Router, private headService: HeaderService, private cookie: CookieService, private flightService: FlightService) { }

  ngOnInit(): void {
    /*  this.datosuser = this.cookie.get("PSG987"); */
    this.datosuser = this.headService.getObject(20).then(user => {
      this.usuarios = user;
      this.datosuser = this.headService.desencriptar(this.usuarios.myObject.myString);
      this.traerData();
      this.getPaises();
    });
  }

  traerData() {
    this.headService.getObject(2).then(object => {
      this.myObject = object;
      this.gds = this.headService.desencriptar(this.myObject.myObject.myString);
      this.typevuelo = this.gds.typeFlight;
      this.flight = this.gds.rpta;
      this.gds = this.gds.gds;
      this.validPassenger = true;
    })
  }

  volver() {
    this.router.navigate(["flights/flight-list"]);
  }

  getPaises() {
    this.flightService.getCountries().subscribe(
      x => {
        this.lstpaises = x;
        this.getDocument();
      }
    )
  }

  updateReasonFlight($event: any) {
    this.reasonFlight = $event
  }

  updateExtraReason($event: any) {
    this.extraReason = $event
  }

  getDocument() {
    this.flightService.getDocument(false).subscribe(
      x => {
        this.lstDocument = x.ldocumentTypeLists;
      }
    );
  }

}
