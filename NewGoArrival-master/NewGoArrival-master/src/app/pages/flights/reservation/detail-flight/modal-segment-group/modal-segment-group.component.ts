import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-modal-segment-group',
  templateUrl: './modal-segment-group.component.html',
  styleUrls: ['./modal-segment-group.component.css']
})
export class ModalSegmentGroupComponent implements OnInit {
  @Input() segmentGroup: any;
  @Input() totalFlightTimeShow: any;
  @Input() lSegmentGroupsLength: any;
  @Input() lSegmentGroupsIndex: any;
  @Input() tipo: any;
  marketingCarrier: any;
  textFlightTimeShow: any;
  constructor() { }

  ngOnInit(): void {
    console.log(this.segmentGroup);
    if (this.lSegmentGroupsLength === this.lSegmentGroupsIndex) {
      this.textFlightTimeShow = "Duración total: " + this.totalFlightTimeShow;
    } else {
      this.textFlightTimeShow = "Espera en aeropuerto: " + this.segmentGroup.timeWaitAirport.replace("00d ", "");
    }
    this.marketingCarrier = this.segmentGroup.ocarrier.carrierId + '.png';
  }

}
