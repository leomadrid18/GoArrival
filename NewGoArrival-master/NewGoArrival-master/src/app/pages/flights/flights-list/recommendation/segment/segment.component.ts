import { Component, OnInit, Input, AfterViewInit, EventEmitter, Output } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-segment',
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.css']
})
export class SegmentComponent implements OnInit, AfterViewInit {

  @Input() section: any;
  @Input() segment: any;
  @Input() bagAllowed: any;
  @Input() indexSegment: any
  @Input() recommendationId: any
  @Input() sectionId: any
  @Input() lSectionGroups: any
  @Input() recommendationIndex: any
  @Input() bagQuantity: any
  @Output() outSegmentCheck = new EventEmitter<any>();

  carrierName: any;
  marketingCarrier: any;
  timeOfDepartureShow: any;
  timeOfArrivalShow: any;
  lSegmentGroupsLength: any;
  totalFlightTimeShow: any;
  flagSegmentId: any;
  lSegmentGroups: any[] = [];
  radioButtonName: any;
  segmentRadioSel: any;
  stringscalas: any;
  onlyOnce: boolean = true;


  constructor() {this.radioButtonName = 'radioSection'; }

  ngOnInit(): void {
    this.flagSegmentId = 'flagSegment_' + this.recommendationId + '' + this.sectionId + '' + this.segment.segmentId + '' + this.indexSegment;
    this.totalFlightTimeShow = this.segment.totalFlightTimeShow;
    this.lSegmentGroupsLength = this.segment.lsegments.length;
    const lSegmentGroupsLength = this.lSegmentGroupsLength;
    if (lSegmentGroupsLength > 0) {
      this.carrierName = this.segment.ocarrier.carrierName;
      this.marketingCarrier = this.segment.ocarrier.marketingAirline + ".png";
      this.timeOfDepartureShow = this.segment.departureTimeShow;
      this.timeOfArrivalShow = this.segment.arrivalTimeShow;
    }
  
  }




  ngAfterViewInit(): void {
    if (this.indexSegment === 1) {
      const segmentCheck = {
        indexSegment_: this.indexSegment,
        radioId_: this.radioButtonName + '_' + this.recommendationId + '_' + this.sectionId + '_' + this.segment.segmentId + '_' + this.indexSegment,
        segment_: this.segment,
        section_: this.section
      };
      this.outSegmentCheck.emit(segmentCheck);

      $("#" +
        this.radioButtonName + '_' +
        this.recommendationId + '_' +
        this.sectionId + '_' +
        this.segment.segmentId + '_' +
        this.indexSegment).prop("checked", true);
    }
  }

  listSegmentGroups(flagSegmentId: any, lSegmentGroups: any) {
    this.lSegmentGroups = lSegmentGroups;
    $("#" + flagSegmentId).show();
  }

  hideSegmentGroups(flagSegmentId: any) {
    this.lSegmentGroups = [];
    $("#" + flagSegmentId).hide();
  }

  selectRadioButton(radioId: any) {
    const segmentCheck = {
      indexSegment_: this.indexSegment,
      radioId_: radioId,
      segment_: this.segment,
      section_: this.section
    };
    this.outSegmentCheck.emit(segmentCheck);
  }

}
