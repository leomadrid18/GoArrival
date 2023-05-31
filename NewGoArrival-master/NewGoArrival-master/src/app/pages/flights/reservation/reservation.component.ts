import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/services/head.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  isReservation = true;
  modalRef!: BsModalRef;
  messageReservation = "";
  pnrInformation!: any;
  datosuser: any;
  public myObject!: { id: number, myObject: { myString: string } };
  constructor(private router: Router,private headService: HeaderService,private modalservice: BsModalService) { }

  ngOnInit(): void {
    this.headService.getObject(31).then(object => {
      this.myObject = object;
      this.pnrInformation = this.headService.desencriptar(this.myObject.myObject.myString);
      if(this.pnrInformation != null && this.pnrInformation != undefined){
        this.traerPassenger();
      }
    })
  
  }

  traerPassenger(){
    this.datosuser = this.headService.getObject(20).then(user => {
      let usuario = user;
      this.datosuser = this.headService.desencriptar(usuario.myObject.myString);
      this.isReservation = false;
      this.headService.ocultarSpinner();
    });
  }

  showInfoReservation(valor: any,template: any) {
    if(valor.ostatus?.status === 500){
      this.isReservation = true;
      this.messageReservation = valor.ostatus?.message; 
      this.headService.ocultarSpinner();
      this.modalRef = this.modalservice.show(
        template,
        Object.assign({}, { class: 'gray modal-lg m-infraccion' })
      );
    } else {
      this.pnrInformation = valor;
      let cripto = this.headService.encriptar(valor);
      this.headService.addObject(31,cripto).then(() => {
        this.isReservation= false;
        this.traerPassenger();
      })
    }
    
  }

  regresarB() {
    this.router.navigate(['/flights']);
  }

}
