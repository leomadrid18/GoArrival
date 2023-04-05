import { Component, OnInit, TemplateRef, Input } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { FlightService } from 'src/app/services/flight/flight.service';
import { HeaderService } from 'src/app/services/head.service';

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
  flagResultFamilias: number;
  cookieValue: any;
  lstFareBasis: any[] = [];
  
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
  @Input() recomen: any;
  @Input() request: any;
  @Input() lstRadioCheck: any;
  dataFlight: any;
  public myObject!: {id: number, myObject: {myString: string}};
  constructor(private modalService: BsModalService,private headService: HeaderService,
    private cookieServices: CookieService,private service: FlightService) {

    this.flagResultFamilias = 0;
   }

  ngOnInit(): void {
    this.cookieValue = this.cookieServices.get('dwerrgfqw24423');
    this.cookieValue = this.headService.desencriptar(this.cookieValue);
  }

 

  openModal(
    template: TemplateRef<any>,
    modalerror: any,
    templateSinFares: any
  ) {
    let Lsections_: any[] = [];
    const lstRadioCheck = this.lstRadioCheck;
    lstRadioCheck.sort((a:any, b:any) => a.sectionId_ - b.sectionId_);
    let idVal = 1;
    let lstFareBasis = this.lstFareBasis;
    lstRadioCheck.forEach(function (item:any) {
      const sectionId = item.sectionId_;
      const segmentId = item.segmentId_;
      const segmentIndex = item.segmentIndex_;
      const recommendationId = item.recommendationId_;
      const section = item.section_;
      const segment = item.segment_;

      //LsegmentGroups
      let LsegmentGroups_: any[] = [];
      segment.lsegments.forEach(function (group:any, i:any) {
        const dataGroup = {
          oorigin: group.oorigin,
          odestination: group.odestination,
          departureDate: group.departureDate,
          departureDateShow: group.departureDateShow,
          departureTime: group.departureTime,
          departureTimeShow: group.departureTimeShow,
          arrivalDate: group.arrivalDate,
          arrivalDateShow: group.arrivalDateShow,
          arrivalTime: group.arrivalTime,
          arrivalTimeShow: group.arrivalTimeShow,
          totalFlightTime: group.totalFlightTime,
          totalFlightTimeShow: group.totalFlightTimeShow,
          dateVariation: group.dateVariation,
          timeWaitAirport: group.timeWaitAirport,
          flightNumber: group.flightNumber,
          equipmentType: group.equipmentType,
          ocarrier: group.ocarrier,
          classId: group.classId,
          cabinId: group.cabinId,
          cabinDescription: group.cabinDescription,
          marriageGrp: group.marriageGrp,
          FareType: group.fareType,
          FareBasis: group.fareBasis,
          fareFamilyName: group.fareFamilyName,
          BrandId: group.brandId,
        };
        LsegmentGroups_.push(dataGroup);
        idVal++;
        lstFareBasis.push(group.fareBasis);
      });

      let Lsegments_: any[] = [];
      const lsegment = {
        TotalFlightTime: segment.totalFlightTime,
        Lsegments: LsegmentGroups_,
      };
      Lsegments_.push(lsegment);
      const lsection = {
        Oorigin: section.oorigin,
        Odestination: section.odestination,
        Oschedule: lsegment,
        departureDate: section.departureDate,
        departureDateShow: section.departureDateShow
      };
      Lsections_.push(lsection);
    });

    this.lstFareBasis = lstFareBasis;
/*     let requestFlight = this.sessionStorageService.retrieve('ss_databuscador'); */
    let type;
    if (this.cookieValue.ocompany.typeCompanyID === "CN") {
      type = "N";
    } else {
      type = "C"
    }
    let dataFamilias = {
      GDS: this.gds,
      Pseudo: this.recomen.pseudo,
      TypeSearch: type,
      Ocompany: this.cookieValue.ocompany,
      Oagency: this.cookieValue.oagency,
      LpseudoRepeats: this.recomen.lpseudoRepeats,
      Lsections: Lsections_,
      Lpassengers: this.request.Lpassengers,
    };

   
    /* this.getFareFamilyV2(dataFamilias, template, modalerror, templateSinFares); */
    this.service.getFareFamily(dataFamilias).subscribe(
      x =>{
        console.log(x);
      }
    )
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
