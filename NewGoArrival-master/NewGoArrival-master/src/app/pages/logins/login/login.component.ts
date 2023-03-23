import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/services/head.service';
import { LoginService } from 'src/app/services/login/login.service';

import * as crypto from 'crypto-js';
import { Login } from 'src/models/login/login.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  year: Date = new Date();
  numberyear: any;
  usuario: any;
  password: any;
  messageError: any;
  validError: boolean;
  showHeader = false;
  passwordCrypto = 'serviceLogin#$';
  objetoEncriptado: string;
  constructor( private router: Router, private headerService: HeaderService,
    private service: LoginService) {
    this.validError = false;
    this.showHeader = false;
    this.usuario = "";
    this.objetoEncriptado = "";
    this.password = "";
    this.headerService.ocultarEncabezado();
  }

  ngOnInit(): void {
    this.airportList();
    this.numberyear = this.year.getFullYear();
  }



 /*  guardarLogin(rpta: Login) {
    const rptaLogin: Login = {
      allowedAccess: rpta.allowedAccess,
      email: rpta.email,
      gender: rpta.gender,
      isActive: rpta.isActive,
      lcostCenter: rpta.lcostCenter,
      lmenu: rpta.lmenu,
      loginUser: rpta.loginUser,
      oagency: rpta.oagency,
      ocompany: rpta.ocompany,
      odocument: rpta.odocument,
      oerror: rpta.oerror,
      orole: rpta.orole,
      partnerClub: rpta.partnerClub,
      personId: rpta.personId,
      phoneNumber: rpta.phoneNumber,
      requiredChangePassword: rpta.requiredChangePassword,
      travelerCode: rpta.travelerCode,
      userId: rpta.userId,
      userLastName: rpta.userLastName,
      userName: rpta.userName,
      vip: rpta.vip
    };

    return rptaLogin;
  } */


  airportListPriority() {
    this.service.getAirportList(true).subscribe(
      (result: any) => {
        this.objetoEncriptado = this.headerService.encriptar(result.lairports);
        sessionStorage.setItem('ls_airportlist', this.objetoEncriptado);
        this.objetoEncriptado = this.headerService.encriptar(result.lcities);
        sessionStorage.setItem('ls_citylist', this.objetoEncriptado);
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
        /* this.objetoEncriptado = this.headerService.encriptar(result.lairports); */
        sessionStorage.setItem('ls_airportlist', JSON.stringify(result.lairports));
        /* this.objetoEncriptado = this.headerService.encriptar(result.lcities); */
        sessionStorage.setItem('ls_citylist', JSON.stringify(result.lcities));
      },

      (err) => {

      },

      () => {


      }
    );
  }




  loginUser() {
    let obj = {
      User: this.usuario,
      Password: crypto.SHA256(this.password).toString(),
      AppId: 1
    }
    this.service.login(obj).subscribe(
      rpta => {
        if (rpta.oerror != null) {
          this.messageError = rpta.oerror.message;
          this.validError = true;
          return;
        } else {
        /*   this.objetoEncriptado = this.headerService.encriptar(rpta); */
          localStorage.setItem('%$#2x5sd4e', JSON.stringify(rpta));
          this.router.navigate(["flights"]);
        }

      }
    );
  }

}
