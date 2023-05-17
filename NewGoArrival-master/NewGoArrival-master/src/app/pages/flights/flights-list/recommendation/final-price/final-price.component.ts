import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { Router } from '@angular/router';

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
  loginDataUser: any;
  lstFareBasis: any[] = [];
  
  @Input() lpolicies: any;
  @Input() lsections: any;
  @Input() index: any;
  @Input() recomendacion: any;
  @Input() gds: any;
  @Input() tipoVuelo: any;
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
  type: any;
  public myObject!: {id: number, myObject: {myString: string}};
  constructor(private modalService: BsModalService,private headService: HeaderService,
    private cookieServices: CookieService,private service: FlightService,private router: Router) {

    this.flagResultFamilias = 0;
   }

  ngOnInit(): void {
    this.loginDataUser = this.cookieServices.get('dwerrgfqw24423');
    this.loginDataUser = this.headService.desencriptar(this.loginDataUser);
    this.validType();
  }

  validType(){
    if (this.loginDataUser.ocompany.typeCompanyID === "CN") {
      this.type = "N";
    } else {
      this.type = "C"
    }
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
    
    let dataFamilias = {
      GDS: this.gds,
      Pseudo: this.recomen.pseudo,
      TypeSearch: this.type,
      Ocompany: this.loginDataUser.ocompany,
      Oagency: this.loginDataUser.oagency,
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


  getFlightAvailability(template: TemplateRef<any>, template2: TemplateRef<any>) {

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
 
    const price = {
      Currency: this.recomen.oprice.currency,
      TotalAmount: this.recomen.oprice.totalAmount
    }
    let dataFamilias = {
      GDS: this.gds,
      Pseudo: this.recomen.pseudo,
      TypeSearch: this.type,
      FlightNational: this.recomen.flightNational,
      UserId: this.loginDataUser.userId,
      IncludesBaggage: this.request.IncludesBaggage,
      CabinType: this.request.CabinType,
      Lusers: this.request.Lusers,
      Lpassengers: this.request.Lpassengers,
      LpseudoRepeats: this.recomen.lpseudoRepeats,
      Oprice: price,
      Ocarrier: this.recomen.ocarrier,
      Lsections: Lsections_,
      Lpolicies: this.recomen.lpolicies,
      Ocompany: this.loginDataUser.ocompany,
      Oagency: this.loginDataUser.oagency,
      token: "",
      offerID: this.recomen.offerID
    };
    this.service.fligthAvailibility(dataFamilias).subscribe(
      x=> {
        if(x.ostatus.status === 200){
          this.dataShared(x);
          
        }
        console.log(x);
      }
    )
  }

  dataShared(availa: any){
    let obj = {
      rpta: availa,
      gds: this.gds,
      typeFlight: this.tipoVuelo
    }
    let valor = this.headService.encriptar(obj);
    this.headService.addObject(2, valor).then(() => {
      this.router.navigate(["flights/passenger-data"])
    }).catch(error => {
      
    });

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
