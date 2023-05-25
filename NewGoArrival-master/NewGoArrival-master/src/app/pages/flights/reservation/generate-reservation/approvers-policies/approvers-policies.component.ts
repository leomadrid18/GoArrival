import { Component, OnInit,Input } from '@angular/core';
import { HeaderService } from 'src/app/services/head.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FlightService } from 'src/app/services/flight/flight.service';
declare var $: any;

@Component({
  selector: 'app-approvers-policies',
  templateUrl: './approvers-policies.component.html',
  styleUrls: ['./approvers-policies.component.css']
})
export class ApproversPoliciesComponent implements OnInit {
  @Input() lpolicies: any;
  @Input() lapprovers: any;
  @Input() currency: any;
  @Input() tipo: any;
  @Input() data: any;
  @Input() aproverValid: any;
  @Input() updateAproval: any;
  modalRefPoliticas!: BsModalRef;
  listaApprovers: any;
  listaApproversShow: any;
  p: number = 10;
  listafilter: any;
  constructor(private modalService: BsModalService,private headService: HeaderService, private service: FlightService) { }

  ngOnInit(): void {
  }

  addApprover(template: any){
    this.headService.mostrarSpinner();
    const datos = {
      CompanyID: this.data.ocompany.companyId,
      LlistApprovers: this.lapprovers
    }
    this.service.getListApproverCompany(datos).subscribe(
      x => {
        this.listaApprovers = x;
        this.listaApprovers.forEach((element: any) => {
            element.addApprover = false;
            element.fullname = element.name + element.lastName; 
        });
        this.listaApproversShow = this.listaApprovers;
        this.listafilter = this.listaApprovers;
        this.headService.ocultarSpinner();
        this.openModalPoliticas(template);
      }
    )
  }

  public change() {
    this.FiltrarNombre();
  }

  FiltrarNombre() {
    let nombre: any;
    let results;
    let listado;
    listado = this.listafilter;
    nombre = $('#nombrehotel').val();
    results = listado.filter((m: any) => m.fullname.toUpperCase().includes(nombre.toUpperCase()))

    this.listaApproversShow = results;
  }

  openModalPoliticas(template: any) {
    
    this.modalRefPoliticas = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-lg' })
    );
  }

  select(valor: any, user: any){
    this.listaApprovers.forEach((element: any) => {
      if(user === element){
        element.approverIssue = valor.target.checked;
      }
    });
  }
  
  add(valor: any, user: any){
    this.listaApprovers.forEach((element: any) => {
      if(user === element){
        element.addApprover = valor.target.checked;
      }
    });
  }

  eliminarPasajero(pasajero: any) {
    let flagIndex = 0;
    let lstPasajeros = this.lapprovers;
    lstPasajeros.forEach(function(item: any, index: any) {
      if (item.approverId === pasajero.approverId) {
        flagIndex = index;
      }
    });

    lstPasajeros.splice(flagIndex, 1);

    this.lapprovers = lstPasajeros;
  }

  actualizar(){
    let list: any[] = [];
    this.listaApprovers.forEach((element: any) => {
      if (element.addApprover === true) {
        list.push(element);
      }
    });
    this.lapprovers.forEach((element: any) => {
      list.push(element);
    });
   /*  console.log(list); */
   /*  this.messagelistado.emit(list); */
    
    this.lapprovers = list;
  /*   let priceRq = this.sessionStorageService.retrieve('ss_flightavailability_result');
    priceRq.lapprovers = this.lapprovers;
    this.sessionStorageService.store('ss_flightavailability_result', priceRq); */
    this.modalRefPoliticas.hide();
  }

  limpiar(){
    this.modalRefPoliticas.hide();
  }

}
