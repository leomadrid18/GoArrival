import { Component, OnInit, TemplateRef, Input } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-final-price',
  templateUrl: './final-price.component.html',
  styleUrls: ['./final-price.component.css']
})
export class FinalPriceComponent implements OnInit {
  modalRef!: BsModalRef;
  modalRefPoliticas!: BsModalRef;
  modalRefDsctCorp!: BsModalRef;
  modalRefSinFares!: BsModalRef;
  modalAlertPoli!: BsModalRef;
  
  @Input() lpolicies: any;
  @Input() lsections: any;
  @Input() index: any;
  @Input() gds: any;
  @Input() currency: any;
  @Input() totalFareAmount: any;
  @Input() finalAmount: any;
  @Input() fareTaxAmountByPassenger: any;
  @Input() chargesAmount: any;
  @Input() internationalPrice: any;
  @Input() recomen: any
  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  openModalPoliticas(template: any) {
    this.modalRefPoliticas = this.modalService.show(
      template,
      Object.assign({}, { class: "gray con-politicas" })
    );
  }

  getFlightAvailabilityPoli(){
    
  }

  openModalDsctCop(template: TemplateRef<any>) {
    this.modalRefDsctCorp = this.modalService.show(template);
  }

}
