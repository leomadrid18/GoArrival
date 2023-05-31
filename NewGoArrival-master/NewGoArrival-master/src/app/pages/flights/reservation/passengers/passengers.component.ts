import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FlightService } from 'src/app/services/flight/flight.service';
import { HeaderService } from 'src/app/services/head.service';
import { PassengerDataComponent } from './passenger-data/passenger-data.component';
import { ExtraProfileComponent } from './extra-profile/extra-profile.component';
import { BsModalRef,BsModalService } from 'ngx-bootstrap';

declare var $: any;

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.css']
})
export class PassengersComponent implements OnInit {
  @ViewChildren(PassengerDataComponent) hijos!: QueryList<PassengerDataComponent>;
  @ViewChildren(ExtraProfileComponent) hijos2!: QueryList<ExtraProfileComponent>;
  datosuser: any;
  lstpaises: any[] = [];
  lstDocument: any[] = [];
  gds: any;
  validPassenger = false;
  flight: any;
  typevuelo: any;
  reasonFlight!: any;
  profileFlight!: string;
  lapprovers: any;
  id: any;
  uids: any;
  pseudo: any;
  extraReason!: any;
  mensajeDuplicate = "";
  lextraProfiles: any;
  lstCostCenter: any[] = [];
  lstGeneral: any[] = [];
  lpolicias: any[] = [];
  loginData: any;
  profile = "";
  modalRef!: BsModalRef;
  recomendacion: any;
  ifExtraReason =  false;
  public myObject!: { id: number, myObject: { myString: string } };
  public usuarios!: { id: number, myObject: { myString: string } };
  constructor( private modalService: BsModalService,private router: Router, private headService: HeaderService, private cookie: CookieService, private flightService: FlightService) { }

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
      this.loginData = this.gds.LoginData;
      this.ifExtraReason = this.loginData.ocompany.ocompanyConfiguration.extraReasonFlight;
      this.lstCostCenter = this.gds.rpta.lcostCenters;
      this.lapprovers = this.gds.rpta.lapprovers;
      this.recomendacion = this.gds.recomen;
      this.lpolicias = this.gds.rpta.lpolicies;
      this.pseudo = this.gds.Pseudo;
      this.lextraProfiles = this.gds.rpta.lextraProfiles;
      this.typevuelo = this.gds.typeFlight;
      this.flight = this.gds.rpta;
      this.gds = this.gds.gds;
      this.validPassenger = true;
    })
  }

  obtenerValoresInputHijos(template3: any) {
    let valor = true;
    this.lstGeneral = [];
    let lstPassengers: any[] = [];
    this.hijos2.forEach((hijo2: ExtraProfileComponent) => {
     this.profile = hijo2.valor;
    });
    this.hijos.forEach((hijo: PassengerDataComponent) => {
      this.concatList(hijo.lstUidsRq);
      lstPassengers.push(hijo.user);
      valor = this.validarCampos(hijo.index, valor);
      valor = this.validarUids(hijo.lstSelects, hijo.index, valor);
      valor = this.validarUidsInputs(hijo.lstInputs, hijo.index, valor);
      valor = this.validarContacto(valor);
    });
    if (valor) {
      this.valiDuplicatePNR(lstPassengers,template3);
    }

  }

  validarUidsInputs(lst: any, index: any, valid: any) {
    lst.forEach((element: any) => {
      if (element.isMandatory) {
        let idset = "#input_" + element.codeUid + "_" + index;
        let id = "input_" + element.codeUid + "_" + index;
        let valor = $(idset).val();
        if (valor === '') {
          valid = false;
          this.setBorder(id);
        }
      }

    });
    return valid;
  }

  validarContacto(valor: any) {
    let name = $("#nombrecontacto").val();
    let correo = $("#contactocorreo").val();
    let phone = $("#contactotelefono").val();
    let extra = $('#reason').val();
    if (name === '') {
      valor = false;
      this.setBorder("nombrecontacto");
    }
    if (correo === '') {
      valor = false;
      this.setBorder("contactocorreo");
    }
    if (phone === '') {
      valor = false;
      this.setBorder("contactotelefono");
    }
    if (this.ifExtraReason === true && extra === '') {
      valor = false;
      this.setBorder("reason");
    }
    return valor;
  }

  validarUids(lst: any, index: any, valid: any) {
    lst.forEach((element: any) => {
      if (element.isMandatory) {
        let idset = "#select_value_" + element.codeUid + "_" + index;
        let id = "select_value_" + element.codeUid + "_" + index;
        let otro = "otros_" + element.codeUid + "_" + index;
        let valor = $(idset).val();
        if (valor === '') {
          valid = false;
          this.setBorder(id);
        } else if (valor === 'OTROS') {
          valid = false;
          this.setBorder(otro);
        }
      }
    });
    return valid;
  }

  setBorder(id: any) {
    this.id = document.getElementById(id);
    this.id.style.border = "2px solid #ED1C24";
    this.id.style.borderRadius = "7px";
  }

  validarCampos(index: any, valor: any) {
    let phone = $('#txttelefono_' + index).val();
    let numberDoc = $('#txtnrodocumento_' + index).val();
    let email = $('#txtcorreo_' + index).val();
    let nombre = $('#txtnombre_' + index).val();
    let apellido = $('#txtapellidos_' + index).val();
    let fecha = $('#txtfecha_' + index).val();
    
    if (phone === '') {
      valor = false;
      this.setBorder("txttelefono_" + index);
    }
    if (numberDoc === '') {
      valor = false;
      this.setBorder("txtnrodocumento_" + index);
    }
    if (email === '') {
      valor = false;
      this.setBorder("txtcorreo_" + index);
    }
    if (nombre === '') {
      valor = false;
      this.setBorder("txtnombre_" + index);
    }
    if (apellido === '') {
      valor = false;
      this.setBorder("txtapellidos_" + index);
    }
    if (fecha === '') {
      valor = false;
      this.setBorder("txtfecha_" + index);
    }
    
    return valor;
  }

  concatList(lst: any) {
    this.lstGeneral = this.lstGeneral.concat(lst);
  }

  armPassengers(lst: any) {
    let passengers: any[] = [];
    lst.forEach((element: any) => {
      let passenger = {
        Email: element.email,
        LastName: element.lastName,
        Name: element.firstName,
        PersonId: element.personId,
        Phone: element.phone,
        UserId: element.userId,
        costCenterCode: element.ocostCenter.ValueUid,
        costCenterDescription: element.ocostCenter.ValueUid
      }
      passengers.push(passenger);
    });
    return passengers;
  }


  valiDuplicatePNR(lstPassengers: any,template3: any) {
    this.headService.mostrarSpinner();
    let data = {
      "TypeSearch": this.headService.getTypeSearch(),
      "lsections": this.flight.lsections,
      "Lpassengers": this.armPassengers(lstPassengers),
      "LcompanyUids": this.lstGeneral,
      "currency": this.flight.oprice.currency,
      "totalPrice": this.flight.oprice.totalAmount,
      "Ocompany": this.headService.getCompany(),
      "Lapprover": this.lapprovers,
      "ReasonFlight": this.reasonFlight?.description,
      "ExtraReason": this.extraReason === undefined ? null : this.extraReason,
      "Pseudo": this.pseudo
    };
    this.flightService.duplicatePnr(data).subscribe(
      x => {
        if (x?.length === 0) {
          this.armarReserva(lstPassengers);
        } else {
          this.mensajeDuplicate = x;
          this.modalRef = this.modalService.show(
            template3,
            Object.assign({}, { class: 'gray modal-lg m-infraccion' })
          );
          this.headService.ocultarSpinner();
        }
      }
    )
  }

  armarPassengers(lst: any) {
    let i = 0;
    let pasajeros: any[] = [];
    lst.forEach((element: any) => {
      i++;
      let prefix;
      if (element.gender === "M") {
        prefix = "MR";
      } else {
        prefix = "MRS";
      }
      let document = {
        Id: element.lpersonDocuments[0].docTypeId,
        number: element.lpersonDocuments[0].docNumber
      }
      let costCenter = {
        code: element.ocostCenter.ValueUid,
        description: element.ocostCenter.ValueUid,
      }
      let obj = {
        BirthDate: element.birthDate.substring(0,10).replaceAll("-","/"),
        Email: element.email,
        FrequentFlyer: element.frequentFlyer,
        Gender: element.gender,
        IsVIP: element.isVIP,
        LastName: element.lastName,
        Name: element.firstName,
        OcostCenter: costCenter,
        Odocument: document,
        Orole: element.orole,
        PassengerId: i,
        PersonId: element.personId,
        PhoneNumber: element.phone,
        Prefix: prefix,
        Type: "ADT",
        UserId: element.userId
      }
      pasajeros.push(obj);
    });

    return pasajeros;
  }



  armarReserva(lstPassengers: any) {
    let objeto = {
      ConsolidatedPayment: null,
      Emission: null,
      ExtraProfile: this.lextraProfiles?.length > 1,
      ExtraReason: this.extraReason === undefined ? null : this.extraReason,
      FlightNational: this.recomendacion.flightNational,
      GDS: this.gds,
      Lapprovers: this.lapprovers,
      LcompanyUIDs: this.lstGeneral,
      Lpassengers: this.armarPassengers(lstPassengers),
      Lpolicies: this.lpolicias,
      LpseudoRepeats: this.recomendacion?.lpseudoRepeats,
      Lsections: this.flight.lsections,
      OContactInfo: {
        Email: $("#contactocorreo").val(),
        Name: $("#nombrecontacto").val(),
        Phone: $("#contactotelefono").val()
      },
      Oagency: null,
      Oancillaries: null,
      Ocarrier: this.recomendacion.ocarrier,
      Ocompany: this.headService.getCompany(),
      Odocumentation: null,
      OfferID: null,
      Oprice: this.recomendacion.oprice,
      ProfileName: this.profile,
      Pseudo: this.pseudo,
      ReasonFlight: this.reasonFlight?.description,
      ReasonFlightId: this.reasonFlight?.id,
      Token: null,
      TypeFlight: this.typevuelo,
      TypeSearch: this.headService.getTypeSearch(),
      UserFullName: this.loginData.userName + ' ' + this.loginData.userLastName,
      UserId: this.loginData.userId,
      osession: this.flight.osession
    }
    let valor = this.headService.encriptar(objeto);
    this.headService.addObject(30,valor).then(() => {
      this.router.navigate(["flights/generate-reservation"]);
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
