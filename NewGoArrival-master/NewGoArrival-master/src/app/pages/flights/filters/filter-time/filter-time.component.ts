import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FlightService } from 'src/app/services/flight/flight.service';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-filter-time',
  templateUrl: './filter-time.component.html',
  styleUrls: ['./filter-time.component.css']
})
export class FilterTimeComponent implements OnInit {

  @Input() tipoEscala:any;
  @Input() searchFlight:any;
  @Input() request:any;
  @Output() searchFilter = new EventEmitter<any[]>();
  @Output() filterTurn = new EventEmitter<any>();
  @Output() refreshdata = new EventEmitter<any[]>();

  flagVD: any;
  flagSM: boolean;
  flagSN: boolean;
  flagVDactivo: boolean;
  flagSMactivo: boolean;
  flagSNactivo: boolean;
  dataRequestFlight: any;
  departureArrivalTimeFrom: any;
  departureArrivalTimeTo: any;
  ss_horasFrom: any;
  ss_horasTo: any;

  constructor(
    public head: HeaderService,
    private service: FlightService

  ) {
    this.flagSM = true;
    this.flagSN = true;
    this.flagVDactivo = false;
    this.flagSMactivo = false;
    this.flagSNactivo = false;
   }

  ngOnInit(): void {
    if (this.tipoEscala === '') {
      this.flagVD = true;
    } else {
      this.flagVD = false;
    }
  }

  selDirectos(tipo: any) {
    this.head.mostrarSpinner();
    if (tipo === 1) {
      this.flagVDactivo = !this.flagVDactivo;
    }


    if (this.flagVDactivo === true) {
      this.searchFlight.forEach(function(recomendacion: any, index1: any) {
        const lsections = recomendacion.lsections;
        let sectionCount = 0;
        lsections.forEach(function(section:any, index2:any) {
          const lSegments = section.lschedules;
          const lSegmentsLength = lSegments.length;
          let segmentCount = 0;
          lSegments.forEach(function(segment:any, index3:any) {
            const lSegmentGroups = segment.lsegments;
            const nroEscalas = lSegmentGroups.length - 1;
            if (nroEscalas > 0) {
              segment.isVisible = false;
              segmentCount++;
            }
          });
          if (lSegmentsLength === segmentCount) {
            section.isVisible = false;
            sectionCount++;
          }
        });
        if (sectionCount > 0) {
          recomendacion.isVisible = false;
        }
      });
      this.searchFilter.emit(this.searchFlight);
      this.refreshdata.emit(this.searchFlight);

    }
    if (this.flagVDactivo === false) {
      this.searchFlight.forEach(function(recomendacion: any, index1: any) {
        recomendacion.isVisible = true;
        const lsections = recomendacion.lsections;
        lsections.forEach(function(section:any, index2:any) {
          section.isVisible = true;
          const lSegments = section.lschedules;
          lSegments.forEach(function(segment:any, index3:any) {
            segment.isVisible = true;
          });
        });
      });
      this.searchFilter.emit(this.searchFlight);
      this.refreshdata.emit(this.searchFlight);
    }
  }

  

  selSalidaManiana(tipo: any) {
 
    this.head.mostrarSpinner();
    if (tipo === 1) {
      this.flagSMactivo = !this.flagSMactivo;
      this.flagSNactivo = false;
    }

    this.departureArrivalTimeFrom = null;
    this.departureArrivalTimeTo = null;

    let dataRequestFlight = this.request;
    let data = {
      "Lusers": dataRequestFlight.Lusers,
      "Lpassengers": dataRequestFlight.Lpassengers,
      "CabinType": dataRequestFlight.CabinType,
      "Scales": dataRequestFlight.Scales,
      "TypeSearch": 'C',
      "IncludesBaggage": dataRequestFlight.IncludesBaggage,
      "Origin": dataRequestFlight.Origin,
      "Destination": dataRequestFlight.Destination,
      "DepartureArrivalDate": dataRequestFlight.DepartureArrivalDate,
      "DepartureArrivalTimeFrom": dataRequestFlight.DepartureArrivalTimeFrom,
      "DepartureArrivalTimeTo": dataRequestFlight.DepartureArrivalTimeTo,
      "Ocompany": dataRequestFlight.Ocompany,
      "Oagency": dataRequestFlight.Oagency
    };

    if (this.flagSMactivo === true) {

      const departureArrivalTimeFrom_ = dataRequestFlight.DepartureArrivalTimeFrom;
      departureArrivalTimeFrom_[0] = '0500';
      const departureArrivalTimeTo_ = dataRequestFlight.DepartureArrivalTimeTo;
      departureArrivalTimeTo_[0] = '1159';

      data.DepartureArrivalTimeFrom = departureArrivalTimeFrom_;
      data.DepartureArrivalTimeTo = departureArrivalTimeTo_;
      this.service.searchFlight(data).subscribe(
        result => {
          this.searchFlight = result.lrecommendations;
        },
        err => {
          this.head.ocultarSpinner();
  
        },
        () => {
          dataRequestFlight = null;
          this.selDirectos(2);
        }
      );
    } else {
      const ss_horasFrom = this.request.DepartureArrivalTimeFrom;
      const ss_horasTo = this.request.DepartureArrivalTimeTo;
      data.DepartureArrivalTimeFrom = ss_horasFrom;
      data.DepartureArrivalTimeTo = ss_horasTo;

      const departureArrivalTimeFrom_ = dataRequestFlight.DepartureArrivalTimeFrom;
      departureArrivalTimeFrom_[0] = '';
      const departureArrivalTimeTo_ = dataRequestFlight.DepartureArrivalTimeTo;
      departureArrivalTimeTo_[0] = '';

      data.DepartureArrivalTimeFrom = departureArrivalTimeFrom_;
      data.DepartureArrivalTimeTo = departureArrivalTimeTo_;
      this.getObject();
    }



   
  }

  public getObject(): void {
    this.head.getObject(1).then(object => {
      let valor = object;
      let cokie = this.head.desencriptar(valor.myObject.myString);
      this.searchFlight = cokie.result.lrecommendations
      this.selDirectos(2);
      this.head.ocultarSpinner();
    }).catch(error => {
      console.error('Error al obtener objeto de la base de datos', error);
    });
  }

  selSalidaNoche(tipo: any) {
 
    this.head.mostrarSpinner();
    if (tipo === 1) {
      this.flagSNactivo = !this.flagSNactivo;
      this.flagSMactivo = false;
    }

    this.departureArrivalTimeFrom = null;
    this.departureArrivalTimeTo = null;

    let dataRequestFlight = this.request;
    let data = {
      "Lusers": dataRequestFlight.Lusers,
      "Lpassengers": dataRequestFlight.Lpassengers,
      "CabinType": dataRequestFlight.CabinType,
      "Scales": dataRequestFlight.Scales,
      "TypeSearch": 'C',
      "IncludesBaggage": dataRequestFlight.IncludesBaggage,
      "Origin": dataRequestFlight.Origin,
      "Destination": dataRequestFlight.Destination,
      "DepartureArrivalDate": dataRequestFlight.DepartureArrivalDate,
      "DepartureArrivalTimeFrom": dataRequestFlight.DepartureArrivalTimeFrom,
      "DepartureArrivalTimeTo": dataRequestFlight.DepartureArrivalTimeTo,
      "Ocompany": dataRequestFlight.Ocompany,
      "Oagency": dataRequestFlight.Oagency
    };

 


    if (this.flagSNactivo === true) {
 

      const departureArrivalTimeFrom_ = dataRequestFlight.DepartureArrivalTimeFrom;
      departureArrivalTimeFrom_[0] = '1900';
      const departureArrivalTimeTo_ = dataRequestFlight.DepartureArrivalTimeTo;
      departureArrivalTimeTo_[0] = '2359';

      data.DepartureArrivalTimeFrom = departureArrivalTimeFrom_;
      data.DepartureArrivalTimeTo = departureArrivalTimeTo_;
      this.service.searchFlight(data).subscribe(
        result => {
          this.searchFlight = result.lrecommendations;
        },
        err => {
          this.head.ocultarSpinner();
        },
        () => {
          dataRequestFlight = null;
          this.selDirectos(2);
        }
      );
    } else {

      const ss_horasFrom = this.request.DepartureArrivalTimeFrom;
      const ss_horasTo = this.request.DepartureArrivalTimeTo;
  
      data.DepartureArrivalTimeFrom = ss_horasFrom;
      data.DepartureArrivalTimeTo = ss_horasTo;

      const departureArrivalTimeFrom_ = dataRequestFlight.DepartureArrivalTimeFrom;
      departureArrivalTimeFrom_[0] = '';
      const departureArrivalTimeTo_ = dataRequestFlight.DepartureArrivalTimeTo;
      departureArrivalTimeTo_[0] = '';

      data.DepartureArrivalTimeFrom = departureArrivalTimeFrom_;
      data.DepartureArrivalTimeTo = departureArrivalTimeTo_;
      this.getObject();
    }

  

    
  }

  public saveObject(valor: any): void {
    this.head.addObject(1, valor).then(() => {
      console.log('Objeto guardado en la base de datos');
    }).catch(error => {
      console.error('Error al guardar objeto en la base de datos', error);
    });
  }

  cerrarVD() {
    const flagVDactivo = this.flagVDactivo;
    if (flagVDactivo === false) {
      this.flagVD = !this.flagVD;
    } else {
      this.flagVDactivo = false;
      this.flagVD = !this.flagVD;
      this.selDirectos(2);
    }
  }

  cerrarSM() {
    const flagSMactivo = this.flagSMactivo;
    if (flagSMactivo === false) {
      this.flagSM = false;
    } else {
      this.flagSMactivo = false;
      this.flagSM = false;
      this.selSalidaManiana(2);
    }
  }

  cerrarSN() {
    const flagSNactivo = this.flagSNactivo;
    if (flagSNactivo === false) {
      this.flagSN = false;
    } else {
      this.flagSNactivo = false;
      this.flagSN = false;
      this.selSalidaNoche(2);
    }
  }

}
