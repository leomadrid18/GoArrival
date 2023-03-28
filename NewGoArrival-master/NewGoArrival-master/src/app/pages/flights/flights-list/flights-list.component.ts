import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flights-list',
  templateUrl: './flights-list.component.html',
  styleUrls: ['./flights-list.component.css']
})
export class FlightsListComponent implements OnInit {
  llowCostAirlines: any;
  lstCalendar: any;
  request: any;
  validCalendar = false;
  validFlights = false;
  lstFlights: any;
  tipoVuelo = "RT";
  constructor() { }

  ngOnInit(): void {
  }

  validShowFlights(valor: any){
    this.request = valor.request;
    if(valor.result.status === 200){
      if(valor.result.llowCostAirlines.length > 0){
        
        this.llowCostAirlines = valor.result.llowCostAirlines;
      
      }
      if(valor.result.lcalendars.length > 0){
        
        this.lstCalendar = valor.result.lcalendars;
        this.validCalendar = true;
      }
      if(valor.result.lrecommendations.length > 0){
        this.lstFlights = valor.result.lrecommendations;
        this.validFlights = true;
      }
    }
  }

  onSelectDate(fechas: any) {
   
  }

}
