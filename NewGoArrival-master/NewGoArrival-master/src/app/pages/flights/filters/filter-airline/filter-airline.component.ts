import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-filter-airline',
  templateUrl: './filter-airline.component.html',
  styleUrls: ['./filter-airline.component.css']
})
export class FilterAirlineComponent implements OnInit {
  @Input() lstAerolineas: any;
  @Input() searchFlight: any[] = [];
  @Output() searchFlightFilter = new EventEmitter<any[]>();
  resultFilter: any[] = [];
  checkAll: any;
  check: any;
  constructor() { }

  ngOnInit(): void {
  }

  filtrarAerolinea(carrierId: any,eve: any){
    if (carrierId === 'all') {
      if (this.checkAll === true) {
        this.lstAerolineas.forEach(function(aerolinea: any) {
          $("#" + aerolinea.carrierId).prop("checked", false);
          aerolinea.filter = 0;
        });

        this.searchFlight.forEach(function(item: any) {
          item.isVisible = true;
        });

        this.searchFlightFilter.emit(this.searchFlight);
      } else {}
    } else {
      if (eve.target.checked) {
        this.checkAll = false;
        this.searchFlight.forEach(function(item: any) {
          item.isVisible = false;
        });

        this.lstAerolineas.forEach(function(aerolinea: any) {
          if (aerolinea.carrierId === carrierId) {
            aerolinea.filter = 1;
          }
        });

        const lstAerolineas = this.lstAerolineas;

        this.searchFlight.forEach(function(item: any) {
          lstAerolineas.forEach(function(item2: any) {
            if (item.ocarrier.carrierId === item2.carrierId) {
              if (item2.filter === 1) {
                item.isVisible = true;
              }
            }
          });
        });

        this.searchFlightFilter.emit(this.searchFlight);
      } else {
        this.searchFlight.forEach(function(item: any) {
          item.isVisible = false;
        });

        this.lstAerolineas.forEach(function(aerolinea: any) {
          if (aerolinea.carrierId === carrierId) {
            aerolinea.filter = 0;
          }
        });

        const lstAerolineas = this.lstAerolineas;

        this.searchFlight.forEach(function(item: any) {
          lstAerolineas.forEach(function(item2: any) {
            if (item.ocarrier.carrierId === item2.carrierId) {
              if (item2.filter === 1) {
                item.isVisible = true;
              }
            }
          });
        });
        this.searchFlightFilter.emit(this.searchFlight);
      }
    }
  }

}
