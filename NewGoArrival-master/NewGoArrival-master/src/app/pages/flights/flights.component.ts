import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
  showHeader = true;
  flagCentralizador = true;
  objetoDesencriptado: any = {};
  objetoEncriptado: any;
  constructor(private headerService: HeaderService) { 
    this.showHeader = true;
    this.headerService.mostrarEncabezado();
  }

  ngOnInit(): void {
    this.objetoEncriptado = localStorage.getItem('%$#2x5sd4e');
    this.objetoDesencriptado = this.headerService.desencriptar(this.objetoEncriptado);
  }

  updateCentralizador($event: boolean) {
    this.flagCentralizador = $event;
    /* const lstPasajeros = this.sessionStorageService.retrieve("ss_lstPasajeros");
    this.pasajeros = lstPasajeros.length; */
  }

}
