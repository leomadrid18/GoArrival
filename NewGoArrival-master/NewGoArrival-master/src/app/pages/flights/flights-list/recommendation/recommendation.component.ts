import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {
  flagResultFamilias: number;
  flagMsgErrorSelFam: boolean;
  lst_rol_autogestion;
  lst_rol_autorizador;
  lst_rol_centralizador;
  defaultValue = null;
  outSegmentCheck: any;
  lstRadioCheck: any[] = [];


  @Input() index: any;
  @Input() recomen: any;
  @Input() currency: any;
  @Input() totalFareAmount: any;
  @Input() totalTaxAmount: any;
  @Input() fareAmountByPassenger: any;
  @Input() fareTaxAmountByPassenger: any;
  @Input() carrierId: any;
  @Input() numberPassengers: any;
  @Input() pseudo: any;
  @Input() gds: any;
  @Input() lsections: any;
  @Input() lsectionLength: any;
  @Input() lpolicies: any;
  @Input() recommendationId: any;
  @Input() tipoVuelo: any;
  @Input() pseudoRepeat: any;
  @Input() flightNational: any;
  @Input() isVisible: any;
  @Input() internationalPrice: any;

  constructor() { 
    this.flagResultFamilias = 0;
    this.flagMsgErrorSelFam = false;
    this.lst_rol_autogestion = environment.cod_rol_autogestion;
    this.lst_rol_autorizador = environment.cod_rol_autorizador;
    this.lst_rol_centralizador = environment.cod_rol_centralizador;
  }

  ngOnInit(): void {
  
  }

  setearRadioId($event: any) {
    this.outSegmentCheck = $event;

    const recommendationId = this.recommendationId;
    const indexSegment = this.outSegmentCheck.indexSegment_;
    const radioId = this.outSegmentCheck.radioId_;
    const segment = this.outSegmentCheck.segment_;
    const section = this.outSegmentCheck.section_;

    const dataRadioSel = {
      recommendationId_: recommendationId,
      sectionId_: section.sectionId,
      segmentId_: segment.segmentId,
      segmentIndex_: indexSegment,
      section_: section,
      segment_: segment,
      flag: 1,
    };

    if (this.lstRadioCheck.length === 0) {
      this.lstRadioCheck.push(dataRadioSel);
    } else {
      this.lstRadioCheck.forEach(function (item) {
        if (
          item.recommendationId_ === recommendationId &&
          item.sectionId_ === section.sectionId
        ) {
          item.flag = 0;
        }
      });

      this.lstRadioCheck.push(dataRadioSel);
      this.lstRadioCheck = this.lstRadioCheck.filter((x) => x.flag === 1);
    }
  }

}
