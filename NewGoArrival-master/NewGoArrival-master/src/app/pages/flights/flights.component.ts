import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


import { HeaderService } from 'src/app/services/head.service';
import { LoginService } from 'src/app/services/login/login.service';


@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {


  myData: any;
  showHeader = true;
  flagCentralizador = true;
  objetoDesencriptado: any = {};
  objetoEncriptado: any;
  cookieValue: any;
  constructor(private headerService: HeaderService, private login: LoginService, private cookieServices: CookieService) {
    this.showHeader = true;
    this.headerService.mostrarEncabezado();

  }

  ngOnInit(): void {
    this.cookieValue = this.cookieServices.get('dwerrgfqw24423');
    this.objetoDesencriptado = this.headerService.desencriptar(this.cookieValue);
    this.validCentralizer();
  }

  validCentralizer() {
    if (this.objetoDesencriptado.orole.roleId === 3) {
      this.flagCentralizador = true;
    } else {
      this.flagCentralizador = false;
    }
  }






  updateCentralizador($event: boolean) {
    this.flagCentralizador = $event;
    /* const lstPasajeros = this.sessionStorageService.retrieve("ss_lstPasajeros");
    this.pasajeros = lstPasajeros.length; */
  }

}

