import { Component, OnInit } from '@angular/core';
import { DatepickerDateCustomClasses } from 'ngx-bootstrap/datepicker';
import { selectOcompany, selectOrole, selectPersonId } from 'src/app/app-state/selectors/login.selector';
import { FlightService } from 'src/app/services/flight/flight.service';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app.state';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.css']
})
export class SearchFlightComponent implements OnInit {
  company$ = this.store.pipe(select(selectOcompany));
  role$ = this.store.pipe(select(selectOrole));
  personId$ = this.store.pipe(select(selectPersonId));
  general = "col-lg-12 col-md-12 col-sm-12 col-12 m-0 p-0"
  tipoVuelo: string;
  indexTramo: number;
  lstAutocomplete: any[] = [];
  airportlist: any;
  citylist: any;
  model: any = {};
  keyword = "name";
  data: any[] = [];
  origenAuto: string;
  origentTexto: string;
  isOpen = false;
  data2: any[] = [];
  destinoAuto: string;
  destinoTexto: string;
  valdestino = false;
  bsValue: Date;
  isOpendate = false;
  valfechasalida = false;
  valfechadestino = false;
  minDateSalida: Date;
  minDateRetorno: Date;
  dateCustomClasses: DatepickerDateCustomClasses[];
  calendarSalidaValue: any;
  fechaSalida: string;
  fechaRetorno: string;
  fechaSalidaShow: string;
  fechaRetornoShow: string;
  textoCabina: string;
  cabina: string;
  textoEscala: string;
  escala: string;
  pasajeros: number;
  maleta: boolean = true;
  validarPasajeros = false;
  passengerList: any;
  constructor(private service: FlightService,private store: Store<AppState>) {
    this.tipoVuelo = "";
    this.indexTramo = 2;
    this.pasajeros = 1;
    this.origenAuto = "";
    this.origentTexto = "";
    this.cabina = "";
    this.destinoAuto = "";
    this.destinoTexto = "";
    this.fechaSalida = "";
    this.textoCabina = "Todas";
    this.textoEscala = "Todas";
    this.escala = "";
    this.fechaRetorno = "";
    this.fechaSalidaShow = "";
    this.fechaRetornoShow = "";
    this.minDateSalida = new Date();
    this.minDateSalida.setDate(this.minDateSalida.getDate());
    this.minDateRetorno = new Date();
    this.minDateRetorno.setDate(this.minDateRetorno.getDate() + 1);
    const now = new Date();
    this.bsValue = new Date();
    this.dateCustomClasses = [
      { date: now, classes: ["bg-danger", "text-warning"] },
    ];
  }

  ngOnInit(): void {

  }



  searchFlight(){
    let data = {
      Lusers: null,
      Lpassengers: null,
      CabinType: null,
      Scales: null,
      TypeSearch: null,
      IncludesBaggage: null,
      Origin: null,
      Destination: null,
      DepartureArrivalDate: null,
      DepartureArrivalTimeFrom: null,
      DepartureArrivalTimeTo: null,
      Ocompany: null,
      Oagency: null
    };
    this.service.searchFlight(data).subscribe(
      x=>{ 
       
      }
    )
  }

  selection(passengers: any[]) {
    this.passengerList = passengers;
  }

  seleccionarCabina(valor:any, texto:string) {
    this.cabina = valor;
    this.textoCabina = texto;
  }

  seleccionarEscala(valor:any, texto: any) {
    this.escala = valor;
    this.textoEscala = texto;
  }



  ValidarCiudad() {
    if (this.model.origentTexto.length < 10) {
      this.model.origentTexto = "";
    }

    if (this.model.destinoTexto.length < 10) {
      this.model.destinoTexto = "";
    }
  }

  onChangeSearch(val: string) {
    this.airportlist = sessionStorage.getItem("ls_airportlist");
    this.airportlist = JSON.parse(this.airportlist);
    this.citylist = sessionStorage.getItem("ls_citylist");
    this.citylist = JSON.parse(this.citylist);
    this.lstAutocomplete = [];
    const lstAutocomplete = this.lstAutocomplete;
    this.airportlist.forEach(function (aeropuerto: any) {
      const obj1 = {
        iataCode: aeropuerto.iataCode,
        name: aeropuerto.name,
        searchName: aeropuerto.searchName,
        priority: aeropuerto.priority,
        categoryId: 1,
        categoryName: "Aeropuerto",
      };
      lstAutocomplete.push(obj1);
    });
    this.citylist.forEach(function (ciudad: any) {
      const obj1 = {
        iataCode: ciudad.iataCode,
        name: ciudad.name,
        searchName: ciudad.searchName,
        priority: ciudad.priority,
        categoryId: 2,
        categoryName: "Ciudad",
      };
      lstAutocomplete.push(obj1);
    });
    lstAutocomplete.sort((a, b) => b.priority - a.priority);
    this.lstAutocomplete = lstAutocomplete;
    $(".x").hide();
    if (val.length >= 3) {
      const resultFilter = this.lstAutocomplete.filter(
        (word) => word.searchName.toLowerCase().search(val.toLowerCase()) >= 0
      );
      this.data = resultFilter;

      $(".x").hide();
    }
  }

  onFocused(e: any) { }

  selectEventDestino(item: any) {
    this.destinoAuto = item.iataCode;
    this.destinoTexto = item.name;
    this.valdestino = false;
    $("#txtDestino").removeClass("campo-invalido");
    $(".x").hide();
    if (this.model.origentTexto.length < 5) {
      this.model.origentTexto = "";
    }
  }

  onFocused2(e: any) { }

  handlerSalida() {
    this.isOpendate = true;
  }

  onChangeSearchDestino(val: string) {

    this.airportlist = sessionStorage.getItem("ls_airportlist");
    this.airportlist = JSON.parse(this.airportlist);
    this.citylist = sessionStorage.getItem("ls_citylist");
    this.citylist = JSON.parse(this.citylist);

    this.lstAutocomplete = [];
    const lstAutocomplete = this.lstAutocomplete;
    this.airportlist.forEach(function (aeropuerto: any) {
      const obj1 = {
        iataCode: aeropuerto.iataCode,
        name: aeropuerto.name,
        searchName: aeropuerto.searchName,
        priority: aeropuerto.priority,
        categoryId: 1,
        categoryName: "Aeropuerto",
      };
      lstAutocomplete.push(obj1);
    });
    this.citylist.forEach(function (ciudad: any) {
      const obj1 = {
        iataCode: ciudad.iataCode,
        name: ciudad.name,
        searchName: ciudad.searchName,
        priority: ciudad.priority,
        categoryId: 2,
        categoryName: "Ciudad",
      };
      lstAutocomplete.push(obj1);
    });
    lstAutocomplete.sort((a, b) => b.priority - a.priority);
    this.lstAutocomplete = lstAutocomplete;

    $(".x").hide();
    if (val.length >= 3) {
      const resultFilter = this.lstAutocomplete.filter(
        (word) => word.searchName.toLowerCase().search(val.toLowerCase()) >= 0
      );
      this.data2 = resultFilter;

      $(".x").hide();
    }
  }

  onValueChangeSalida(value: Date): void {
    this.valfechasalida = false;
    $("#txtFechaSalida").removeClass("campo-invalido");
    this.minDateRetorno = value;
    this.dateCustomClasses = [
      { date: this.minDateRetorno, classes: ["bg-danger", "text-warning"] },
    ];

    if (value != null) {
      let mes = "";
      let getMonth = value.getMonth() + 1;
      if (getMonth < 10) {
        getMonth = value.getMonth() + 1;
        mes = "0" + getMonth;
      } else {
        mes = "" + getMonth;
      }

      let dia = "";
      if (value.getDate() < 10) {
        dia = "0" + value.getDate();
      } else {
        dia = "" + value.getDate();
      }

      if (value >= this.calendarSalidaValue) {
        $("#fechadestino").val("");
        this.fechaRetorno = "";
      }
      this.fechaSalida = value.getFullYear() + "/" + mes + "/" + dia;
      this.fechaSalidaShow = dia + "/" + mes + "/" + value.getFullYear();
    }
  }

  onValueChangeRetorno(value: Date): void {
    if (value != null) {
      this.valfechadestino = false;
      this.calendarSalidaValue = value;
      
      this.dateCustomClasses = [
        { date: null, classes: ["bg-danger", "text-warning"] },
      ];
      $("#txtFechaDestino").removeClass("campo-invalido");
      let mes = "";
      let getMonth = value.getMonth() + 1;
      if (getMonth < 10) {
        getMonth = value.getMonth() + 1;
        mes = "0" + getMonth;
      } else {
        mes = "" + getMonth;
      }

      let dia = "";
      if (value.getDate() < 10) {
        dia = "0" + value.getDate();
      } else {
        dia = "" + value.getDate();
      }

      this.fechaRetorno = value.getFullYear() + "/" + mes + "/" + dia;
      this.fechaRetornoShow = dia + "/" + mes + "/" + value.getFullYear();
    }
  }


  selectEvent(item: any) {
    // do something with selected item
    this.origenAuto = item.iataCode;
    this.origentTexto = item.name;
    this.isOpen = false;
    $("#txtOrigen").removeClass("campo-invalido");
    $(".x").hide();
  }

  seleccionarTipoVuelo(valor: any) {
    this.tipoVuelo = valor;
    if (valor === "RT") {
      this.indexTramo = 2;
    }
    if (valor === "OW") {
      this.indexTramo = 1;
    }
    if (valor === "MC") {
      this.indexTramo = 2;
      this.lstAutocomplete = [];
      const lstAutocomplete = this.lstAutocomplete;
      this.airportlist.forEach(function (aeropuerto: any) {
        const obj1 = {
          iataCode: aeropuerto.iataCode,
          name: aeropuerto.name,
          searchName: aeropuerto.searchName,
          priority: aeropuerto.priority,
          categoryId: 1,
          categoryName: "Aeropuerto",
        };
        lstAutocomplete.push(obj1);
      });
      this.citylist.forEach(function (ciudad: any) {
        const obj1 = {
          iataCode: ciudad.iataCode,
          name: ciudad.name,
          searchName: ciudad.searchName,
          priority: ciudad.priority,
          categoryId: 2,
          categoryName: "Ciudad",
        };
        lstAutocomplete.push(obj1);
      });
      lstAutocomplete.sort((a, b) => b.priority - a.priority);
      this.lstAutocomplete = lstAutocomplete;
    }
  }

}
