import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FlightService } from 'src/app/services/flight/flight.service';
import { HeaderService } from 'src/app/services/head.service';
import { PassengerDataComponent } from './passenger-data/passenger-data.component';

declare var $: any;

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
  profileFlight!: string;
  lapprovers: any;
  id: any;
  uids: any;
  pseudo: any;
  extraReason!: string;
  lextraProfiles: any;
  lstCostCenter: any[] = [];
  lstGeneral: any[] = [];
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
      this.uids = this.gds.rpta.lcompanyUids;
      this.lstCostCenter = this.gds.rpta.lcostCenters;
      this.lapprovers = this.gds.rpta.lapprovers;
      this.pseudo = this.gds.Pseudo;
      this.lextraProfiles = this.gds.rpta.lextraProfiles;
      this.typevuelo = this.gds.typeFlight;
      this.flight = this.gds.rpta;
      this.gds = this.gds.gds;
      this.validPassenger = true;
    })
  }

  obtenerValoresInputHijos() {
    this.lstGeneral = [];
    this.hijos.forEach((hijo: PassengerDataComponent) => {
      this.concatList(hijo.lstUidsRq);
      const valorInputHijo = hijo.user;
      this.validarCampos(valorInputHijo,hijo.index);
      this.validarUids(hijo.lstSelects,hijo.index);
      this.validarUidsInputs(hijo.lstInputs,hijo.index);
    });
   /*  this.valiDuplicatePNR(); */
  }

  validarUidsInputs(lst: any, index: any){
    lst.forEach((element: any) => {
      if(element.isMandatory){
        let idset = "#input_" + element.codeUid + "_" + index;
        let id = "input_" + element.codeUid + "_" + index;
        let valor = $(idset).val();
        if(valor === ''){
          this.setBorder(id);
        }
      }
      
    });
  }

  validarUids(lst: any, index: any){
    lst.forEach((element: any) => {
      if(element.isMandatory){
        let idset = "#select_value_" + element.codeUid + "_" + index;
        let id = "select_value_" + element.codeUid + "_" + index;
        let otro = "otros_"  + element.codeUid + "_" + index;
        let valor = $(idset).val();
        if(valor === ''){
          this.setBorder(id);
        } else if (valor === 'OTROS') {
          this.setBorder(otro);
        }
      }
      
    });
  }

  setBorder(id: any) {
    this.id = document.getElementById(id);
    this.id.style.border = "2px solid #ED1C24";
    this.id.style.borderRadius = "7px";
  }

  validarCampos(user: any, index: any) {
    if (user.phone === '') {
      this.setBorder("txttelefono_"+index);
    }
  }

  concatList(lst: any) {
    this.lstGeneral = this.lstGeneral.concat(lst);
  }

  armPassengers() {
    let passengers: any[] = [];
    this.datosuser.forEach((element: any) => {
      let passenger = {
        Email: element.email,
        LastName: element.lastName,
        Name: element.firstName,
        PersonId: element.personId,
        Phone: element.phone,
        UserId: element.userId,
        costCenterCode: "",
        costCenterDescription: ""
      }
      passengers.push(passenger);
    });
    return passengers;
  }


  valiDuplicatePNR() {
    let data = {
      "TypeSearch": this.headService.getTypeSearch(),
      "lsections": this.flight.lsections,
      "Lpassengers": this.armPassengers(),
      "LcompanyUids": this.lstGeneral,
      "currency": this.flight.oprice.currency,
      "totalPrice": this.flight.oprice.totalAmount,
      "Ocompany": this.headService.getCompany(),
      "Lapprover": this.lapprovers,
      "ReasonFlight": this.reasonFlight,
      "ExtraReason": this.extraReason,
      "Pseudo": this.pseudo
    };
    this.flightService.duplicatePnr(data).subscribe(
      x => {
        if (x?.length === 0) {
          this.router.navigate(["flights/generate-reservation"]);
        }
      }
    )
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

  updateProfileFlight($event: any) {
    this.profileFlight = $event
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
