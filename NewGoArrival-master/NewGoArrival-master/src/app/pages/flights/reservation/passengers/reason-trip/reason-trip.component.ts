import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HeaderService } from 'src/app/services/head.service';

declare var $: any;

@Component({
  selector: 'app-reason-trip',
  templateUrl: './reason-trip.component.html',
  styleUrls: ['./reason-trip.component.css']
})
export class ReasonTripComponent implements OnInit {
  @Input() lsReasonflight: any[] = [];
  @Output() reasonFlightEvent = new EventEmitter<string>();
  @Output() extraReasonEvent = new EventEmitter<string>();
  reason: any;
  @Input() ifExtraReason: any;
  valorExtra = "";
  constructor(private cookieServices: CookieService, private headService: HeaderService) { }

  ngOnInit(): void {
    if (this.lsReasonflight && this.lsReasonflight.length > 0){
      this.reasonFlightEvent.emit(this.lsReasonflight[0]);
      /* this.extraReasonEvent.emit(this.valor); */
    }
  }

  getValues() {
    return { reason: $('#cbomotivo').val(), valor: $('#reason').val()}
  }

  saveDescription(valor: any){
   /*  this.sessionStorageService.store('ss_motivo', valor); */
  }

  reasonSelected(id: any) {
    let reason = this.lsReasonflight.find(x => x.id == id);
    this.reasonFlightEvent.emit(reason);
  }

  onInputChange(event: any) {
    this.extraReasonEvent.emit(this.valorExtra);
  }

}
