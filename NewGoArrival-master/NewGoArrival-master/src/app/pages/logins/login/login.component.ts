import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/services/head.service';
import { LoginService } from 'src/app/services/login/login.service';
import * as crypto from 'crypto-js';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Passenger } from 'src/models/flight/passenger.model';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})


export class LoginComponent implements OnInit {
  @ViewChild('spinner') spinnerse: any;
  year: Date = new Date();
  numberyear: any;
  usuario: any;
  showOverlay = false;
  password: any;
  messageError: any;
  validError: boolean;
  showHeader = false;
  passwordCrypto = 'serviceLogin#$';
  objetoEncriptado: string;
  widgets$!: Observable<any[]>;
  lstAirports: any;
  constructor( private router: Router, private headerService: HeaderService, 
    private service: LoginService,private cookieServices: CookieService) {
    this.validError = false;
    this.showHeader = false;
    this.usuario = "";
    this.objetoEncriptado = "";
    this.password = "";
    this.headerService.ocultarEncabezado();
  }

  ngOnInit(): void {
    localStorage.clear();
    this.headerService.clearAllCookies();
    this.lstAirports = sessionStorage.getItem("ls_airportlist")
    if(this.lstAirports === null){
      this.airportListPriority();
    }
    this.numberyear = this.year.getFullYear();
  }






  airportListPriority() {
    this.service.getAirportList(true).subscribe(
      (result: any) => {
        localStorage.setItem('ls_airportlist', JSON.stringify(result.lairports));
        localStorage.setItem('ls_citylist', JSON.stringify(result.lcities));
        this.airportList();
      },

      (err) => {
        /*   this.spinner.hide();
          this.modalError = this.modalService.show(ModalErrorServiceComponent, this.config); */
      },

      () => {


      }
    );
  }

  airportList() {
    this.service.getAirportList(false).subscribe(
      (result: any) => {
        localStorage.setItem('ls_airportlist', JSON.stringify(result.lairports));
        localStorage.setItem('ls_citylist', JSON.stringify(result.lcities));
      },

      (err) => {

      },

      () => {


      }
    );
  }


  validAutogestion(rpta: any){
    let LPassenger = [];
    let pasajero!: Passenger;
    let documents  = [];
    let obj = {
      docNumber: rpta.odocument.documentNumber,
      docTypeId:rpta.odocument.docTypeId
    }
    documents.push(obj);
    if(rpta.orole.roleId === 1){

      pasajero = {
        age:0,
        birthDate: rpta.birthDate,
        countryIataCode: rpta.ocompany.countryCode,
        createdDatePerson : "",
        createdDateUser : "",
        email : rpta.email,
        firstName : rpta.userName,
        frequentFlyer : "",
        gender : rpta.gender,
        isVIP : rpta.vip,
        lastName : rpta.userLastName,
        lcostCenter : rpta.lcostCenter,
        loginUser : rpta.loginUser,
        lpersonDocuments : documents,
        message : null,
        nationality : "",
        orole : rpta.orole,
        personId : rpta.personId,
        phone : rpta.phoneNumber,
        travelerCode : rpta.travelerCode,
        userId : rpta.userId,
      }
    }
    LPassenger.push(pasajero);
    let passengers = this.headerService.encriptar(LPassenger);
    this.headerService.addObject(20,passengers);
  }





   loginUser() {
    this.headerService.mostrarSpinner();
    let obj = {
      User: this.usuario,
      Password: crypto.SHA256(this.password).toString(),
      AppId: 1
    }
    this.service.login(obj).subscribe(
      rpta => {
        if (rpta.oerror != null) {
          this.headerService.ocultarSpinner();
          this.messageError = rpta.oerror.message;
          this.validError = true;
        } else {
          this.cookieServices.delete("dwerrgfqw24423");
          this.validAutogestion(rpta);
          let valor = this.headerService.encriptar(rpta);
          this.cookieServices.set('dwerrgfqw24423', valor);
          this.router.navigate(["flights"]);
        }
        
      }
    );
  }

}
