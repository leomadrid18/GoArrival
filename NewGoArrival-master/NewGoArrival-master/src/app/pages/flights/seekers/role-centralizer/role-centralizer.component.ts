import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { FlightService } from 'src/app/services/flight/flight.service';
import * as crypto from 'crypto-js';
import { HeaderService } from 'src/app/services/head.service';
import { CookieService } from 'ngx-cookie-service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-role-centralizer',
  templateUrl: './role-centralizer.component.html',
  styleUrls: ['./role-centralizer.component.css'],
  providers: [FlightService]
})
export class RoleCentralizerComponent implements OnInit {
  tipoBusqueda: string;
  name: string;
  document: string;
  Math: Math = Math;
  passwordCrypto = 'serviceLogin#$';
  objetoDesencriptado: any = {};
  objetoEncriptado: any;
  data: any;
  lstPerson: any[] = [];
  lstPersonShow: any[] = [];
  p: any;
  modalRef!: BsModalRef;
  maxPax = 8;
  lstPasajeros: any[] = [];
  filteredList: any[] = []; // Lista filtrada
  @Output() flagCentralizado = new EventEmitter<boolean>();
  searchTerm = '';
  constructor(private service: FlightService,private head: HeaderService,private cookie: CookieService,private modalService: BsModalService) { 
    this.tipoBusqueda = 'N';
    this.name = "";
    this.document = "";
  }

  ngOnInit(): void {

   
    this.objetoDesencriptado = this.cookie.get('dwerrgfqw24423');
    this.objetoDesencriptado = this.head.desencriptar(this.objetoDesencriptado);
  }

  

  

  eliminarPasajero(pasajero: any) {
    let flagIndex = 0;
    let lstPasajeros = this.lstPasajeros;
    lstPasajeros.forEach(function(item, index) {
      if (item.userId === pasajero.userId) {
        flagIndex = index;
      }
    });

    lstPasajeros.splice(flagIndex, 1);

    this.lstPasajeros = lstPasajeros;
  }

  onSearchDoc(searchTerm: any): void {
    searchTerm = this.document;
    this.searchTerm = searchTerm;
    this.filteredList = this.lstPerson.filter(person => {
      return (
        person.lpersonDocuments[0].docNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }

  continuar(template: any) {
    if (this.lstPasajeros.length === 0) {
      this.modalRef = this.modalService.show(
        template,
        Object.assign({}, { class: 'gray modal-lg m-infraccion' })
      );
    } else {
      let passengers = this.head.encriptar(this.lstPasajeros);
      this.cookie.set("PSG987", passengers);
      /* this.sessionStorageService.store('ss_lstPasajeros', this.lstPasajeros); */
      this.flagCentralizado.emit(false);
    }
  }

  onSearch(searchTerm: any): void {
    searchTerm = this.name;
    this.searchTerm = searchTerm;
    this.filteredList = this.lstPerson.filter(person => {
      return (
        person.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }

  agregarPasajero(person: any) {
    let flagVal = 0;
    let lstPasajeros = this.lstPasajeros;
    if (lstPasajeros.length === this.maxPax) {
      return;
    }
    lstPasajeros.forEach(function(item) {
      if (item.userId === person.userId) {
        flagVal = 1;
      }
    });

    if (flagVal === 0) {
      this.lstPasajeros.push(person);
    }

    this.lstPasajeros = lstPasajeros;
  }

  search(){
    if(this.filteredList.length != 0){
      return;
    }
    this.head.mostrarSpinner();
    let freeText = '';
    const datos = {
      Ocompany: {
        Id: this.objetoDesencriptado.ocompany.companyId,
      },
      Oagency: this.objetoDesencriptado.oAgency,
      FreeText: freeText,
      UserId: this.objetoDesencriptado.userId
    };
    this.service.getUserByCompany(datos).subscribe(
      result => {
        this.lstPerson = result;
        this.filteredList = result;
        this.head.ocultarSpinner();
      },
      err => {
        
      },
      () => {
        
      }
    );

  }

  typeSearch(valor: any) {
    this.tipoBusqueda = valor;
  }

}
