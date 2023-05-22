import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FlightService } from 'src/app/services/flight/flight.service';
import { HeaderService } from 'src/app/services/head.service';
import { PassengerDataComponent } from './passenger-data/passenger-data.component';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.css']
})
export class PassengersComponent implements OnInit {
  @ViewChildren(PassengerDataComponent) hijos!: QueryList<PassengerDataComponent>;
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
  constructor(private router: Router,private headService: HeaderService,private cookie: CookieService,private flightService: FlightService) { }

  ngOnInit(): void {
    this.headService.ocultarSpinner();
    this.datosuser = this.cookie.get("PSG987");
    this.datosuser = this.headService.desencriptar(this.datosuser);
    this.traerData();
    this.getPaises();
  }

  traerData(){
    this.headService.getObject(2).then(object => {
      this.myObject = object;
      this.gds = this.headService.desencriptar(this.myObject.myObject.myString);
      this.typevuelo = this.gds.typeFlight;
      this.flight = this.gds.rpta;
      this.gds = this.gds.gds;
      this.validPassenger = true;
    })
  }

  obtenerValoresInputHijos() {
    this.hijos.forEach((hijo: PassengerDataComponent) => {
      const valorInputHijo = hijo.user;
      console.log(valorInputHijo);
    });
  }

  volver(){
    this.router.navigate(["flights/flight-list"]);
  }

  getPaises(){
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
