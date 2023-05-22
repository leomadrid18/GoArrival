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
  indexTramo = 2;
  cookieValue: any;
  datae: any;
  aerolineas: any[] = [];
  flagDinData2: boolean = false;
  flagDinData;
  public myObject!: { id: number, myObject: { myString: string } };
  constructor(private cookieServices: CookieService, private headService: HeaderService, private changeDetectorRef: ChangeDetectorRef) {
    this.flagDinData = false;
  }

  ngOnInit(): void {
   /*  this.cargar(); */
    this.getObject();
    /*  this.cookieValue = this.cookieServices.get('rtsdt3298dwlou3208'); */
  }

  cargar(): void {
    this.headService.mostrarSpinner();
    setTimeout(() => {
      this.stopLoading();
    }, 1700);
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

  Datafiltrosuperior($event: any) {
    this.setLstAerolineas($event);
  }

  setLstAerolineas(searchData: any) {
    this.aerolineas = [];
    let aerolineas = this.aerolineas;
    searchData.forEach(function (reco: any, indexreco: any) {
      if (reco.isVisible === true) {
        if (indexreco === 0) {
          const dataAero = {
            carrierId: reco.ocarrier.carrierId,
            carrierName: reco.ocarrier.carrierName,
            filter: 0
          };
          aerolineas.push(dataAero);
        } else {
          let flagAero = 1;
          aerolineas.forEach(function (aerolinea: any, indexaero: any) {
            if (aerolinea.carrierId === reco.ocarrier.carrierId) {
              flagAero = 0;
            }
          });
          if (flagAero === 1) {
            const dataAeroN = {
              carrierId: reco.ocarrier.carrierId,
              carrierName: reco.ocarrier.carrierName,
              filter: 0
            };
            aerolineas.push(dataAeroN);
          }
        }
      }
    });
    this.aerolineas = aerolineas;
  }

  ocultarComponentes($event: any){
    this.validFlights = $event;
  }

  busquedaFiltros($event: any) {
    this.lstFlights = [];

    if ($event != null) {

      this.lstFlights = $event;

      let data = this.lstFlights.filter((x: any) => x.isVisible === true);
      if (data.length === 0) {
        this.flagDinData2 = true;
      } else {
        this.lstFlights = $event;
        this.flagDinData2 = false;
        this.validFlights = true;
        
      }
    } else {
      this.flagDinData2 = true;
    }

    this.headService.ocultarSpinner();
    /* this.headService.mostrarSpinner();
    setTimeout(() => {
      this.stopLoading();
    }, 500);  */

  }


  enviarAeropuertos(request_: any){
    console.log(request_);
  }


  setFlights() {
    this.request = this.cookieValue.request;
    if (this.cookieValue.result.status === 200) {
        if (this.cookieValue.result.llowCostAirlines?.length > 0) {
          this.llowCostAirlines = this.cookieValue.result.llowCostAirlines;
        }
        if (this.cookieValue.result.lcalendars?.length > 0) {
          this.lstCalendar = this.cookieValue.result.lcalendars;
          this.validCalendar = true;
        }
        if (this.cookieValue.result.lrecommendations?.length > 0) {
          this.lstFlights = this.cookieValue.result.lrecommendations;
          this.tipoVuelo = this.request.Type;
          this.setLstAerolineas(this.lstFlights);
          this.enviarAeropuertos(this.request);
        
          this.validFlights = true;
        }
    }
    this.headService.ocultarSpinner();
  }

  validShowFlights(valor: any) {
    this.request = valor.request;
    if (valor.result.status === 200) {
      this.flagDinData2 = false;
      if (valor.result.llowCostAirlines?.length > 0) {

        this.llowCostAirlines = valor.result.llowCostAirlines;

      }
      if (valor.result.lcalendars?.length > 0) {

        this.lstCalendar = valor.result.lcalendars;
        this.validCalendar = true;
      }
      if (valor.result.lrecommendations?.length > 0) {
        this.lstFlights = valor.result.lrecommendations;
        this.validFlights = true;
      }
    }
    this.headService.ocultarSpinner();
  }

  onSelectDate(fechas: any) {

  }

}
