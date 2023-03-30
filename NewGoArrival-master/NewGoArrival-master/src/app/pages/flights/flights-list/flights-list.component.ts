import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HeaderService } from 'src/app/services/head.service';

declare var $: any;

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
  cookieValue: any;
  datae: any;

  public myObject!: {id: number, myObject: {myString: string}};
  constructor(private cookieServices: CookieService,private headService: HeaderService,private changeDetectorRef: ChangeDetectorRef) { 
    
  }

  ngOnInit(): void {
    this.cargar();
    this.getObject();
    this.cookieValue = this.cookieServices.get('rtsdt3298dwlou3208');
  }

   cargar(): void {
    this.headService.mostrarSpinner();
    setTimeout(() => {
      this.stopLoading();
    }, 1500); // tiempo en milisegundos
  }

  stopLoading(): void {
    this.headService.ocultarSpinner();
    this.changeDetectorRef.detectChanges();
  }

  public getObject(): void {
    this.headService.getObject(1).then(object => {
      this.myObject = object;
      this.cookieValue = this.headService.desencriptar(this.myObject.myObject.myString);
      this.setFlights();
      console.log('Objeto obtenido de la base de datos', this.myObject);
    }).catch(error => {
      console.error('Error al obtener objeto de la base de datos', error);
    });
  }

 

  setFlights(){
    this.request = this.cookieValue.request;
    if(this.cookieValue.result.status === 200){
      if(this.cookieValue.result.llowCostAirlines.length > 0){
        
        this.llowCostAirlines = this.cookieValue.result.llowCostAirlines;
      
      }
      if(this.cookieValue.result.lcalendars.length > 0){
        
        this.lstCalendar = this.cookieValue.result.lcalendars;
        this.validCalendar = true;
      }
      if(this.cookieValue.result.lrecommendations.length > 0){
        this.lstFlights = this.cookieValue.result.lrecommendations;
        this.validFlights = true;
      }
    }
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
