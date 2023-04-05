import { Component, OnInit } from '@angular/core';
import { DatepickerDateCustomClasses } from 'ngx-bootstrap/datepicker';

import { FlightService } from 'src/app/services/flight/flight.service';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HeaderService } from 'src/app/services/head.service';


declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.css']
})
export class SearchFlightComponent implements OnInit {
  public datae: any[];
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
  objetoDesencriptado: any;
  validarPasajeros = false;
  passengerList: any;

  origenAuto1: any;
  origenAuto2: any;
  origenAuto3: any;
  origenAuto4: any;
  origenAuto5: any;
  origenAuto6: any;
  origentTexto1: any;
  origentTexto2: any;
  origentTexto3: any;
  origentTexto4: any;
  origentTexto5: any;
  origentTexto6: any;
  destinoAuto1: any;
  destinoAuto2: any;
  destinoAuto3: any;
  destinoAuto4: any;
  destinoAuto5: any;
  destinoAuto6: any;
  destinoTexto1: any;
  destinoTexto2: any;
  destinoTexto3: any;
  destinoTexto4: any;
  destinoTexto5: any;
  destinoTexto6: any;

  fechaSalida1: any;
  fechaSalida2: any;
  fechaSalida3: any;
  fechaSalida4: any;
  fechaSalida5: any;
  fechaSalida6: any;

  fechaSalidaShow1: any;
  fechaSalidaShow2: any;
  fechaSalidaShow3: any;
  fechaSalidaShow4: any;
  fechaSalidaShow5: any;
  fechaSalidaShow6: any;
  constructor(private service: FlightService, private router: Router, private cookie: CookieService, private headerService: HeaderService) {

    this.datae = [];

    this.tipoVuelo = "RT";
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
    this.objetoDesencriptado = this.cookie.get('dwerrgfqw24423');
    this.objetoDesencriptado = this.headerService.desencriptar(this.objetoDesencriptado);
   /*  this.cookie.delete("rtsdt3298dwlou3208"); */
  }




  

  llenarMulti() {
    let origen: any[] = [];
    let destino: any[] = [];
    let fechas: any[] = [];
    const indexTramo = this.indexTramo;
    switch (indexTramo) {
      case 2:
        origen.push(this.origenAuto1);
        origen.push(this.origenAuto2);

        destino.push(this.destinoAuto1);
        destino.push(this.destinoAuto2);

        fechas.push(this.fechaSalida1);
        fechas.push(this.fechaSalida2);
        break;
      case 3:
        origen.push(this.origenAuto1);
        origen.push(this.origenAuto2);
        origen.push(this.origenAuto3);

        destino.push(this.destinoAuto1);
        destino.push(this.destinoAuto2);
        destino.push(this.destinoAuto3);

        fechas.push(this.fechaSalida1);
        fechas.push(this.fechaSalida2);
        fechas.push(this.fechaSalida3);
        break;
      case 4:
        origen.push(this.origenAuto1);
        origen.push(this.origenAuto2);
        origen.push(this.origenAuto3);
        origen.push(this.origenAuto4);

        destino.push(this.destinoAuto1);
        destino.push(this.destinoAuto2);
        destino.push(this.destinoAuto3);
        destino.push(this.destinoAuto4);

        fechas.push(this.fechaSalida1);
        fechas.push(this.fechaSalida2);
        fechas.push(this.fechaSalida3);
        fechas.push(this.fechaSalida4);
        break;
      case 5:
        origen.push(this.origenAuto1);
        origen.push(this.origenAuto2);
        origen.push(this.origenAuto3);
        origen.push(this.origenAuto4);
        origen.push(this.origenAuto5);

        destino.push(this.destinoAuto1);
        destino.push(this.destinoAuto2);
        destino.push(this.destinoAuto3);
        destino.push(this.destinoAuto4);
        destino.push(this.destinoAuto5);

        fechas.push(this.fechaSalida1);
        fechas.push(this.fechaSalida2);
        fechas.push(this.fechaSalida3);
        fechas.push(this.fechaSalida4);
        fechas.push(this.fechaSalida5);
        break;
      case 6:
        origen.push(this.origenAuto1);
        origen.push(this.origenAuto2);
        origen.push(this.origenAuto3);
        origen.push(this.origenAuto4);
        origen.push(this.origenAuto5);
        origen.push(this.origenAuto6);

        destino.push(this.destinoAuto1);
        destino.push(this.destinoAuto2);
        destino.push(this.destinoAuto3);
        destino.push(this.destinoAuto4);
        destino.push(this.destinoAuto5);
        destino.push(this.destinoAuto6);

        fechas.push(this.fechaSalida1);
        fechas.push(this.fechaSalida2);
        fechas.push(this.fechaSalida3);
        fechas.push(this.fechaSalida4);
        fechas.push(this.fechaSalida5);
        fechas.push(this.fechaSalida6);
        break;
    }

    let obj = {
      orig: origen,
      dest: destino,
      fec: fechas
    }

    return obj;
  }

  public saveObject(valor: any): void {
    this.headerService.addObject(1, valor).then(() => {
      console.log('Objeto guardado en la base de datos');
    }).catch(error => {
      console.error('Error al guardar objeto en la base de datos', error);
    });
  }



  searchFlight() {
    this.headerService.mostrarSpinner();
    let origen: any[] = [];
    let destino: any[] = [];
    let fechas: any[] = [];
    let horasFrom: any[] = [];
    let horasTo: any[] = [];
    let lUsers_: any[] = [];
    let lPassengers: any[] = [];

    switch (this.tipoVuelo) {
      case "RT":
        origen.push(this.origenAuto);
        origen.push(this.destinoAuto);

        destino.push(this.destinoAuto);
        destino.push(this.origenAuto);

        fechas.push(this.fechaSalida);
        fechas.push(this.fechaRetorno);
        break;

      case "OW":
        origen.push(this.origenAuto);
        destino.push(this.destinoAuto);
        fechas.push(this.fechaSalida);
        break;
      case "MC":
        let valor = this.llenarMulti();
        origen = valor.orig;
        destino = valor.dest;
        fechas = valor.fec
        break;
    }



    fechas.forEach(function (fe) {
      horasFrom.push("");
      horasTo.push("");
    });
    lUsers_.push(
      {
        "RoleId": this.objetoDesencriptado.orole.roleId,
        "CostCenterId": null,
        "UserId": this.objetoDesencriptado.userId
      }
    );
    const passenger = {
      Quantity: this.pasajeros,
      TypePassenger: 'ADT'
    }

    lPassengers.push(passenger);
    let data = {
      Lusers: lUsers_,
      Lpassengers: lPassengers,
      CabinType: this.cabina,
      Scales: this.escala,
      TypeSearch: "C",
      IncludesBaggage: this.maleta,
      Origin: origen,
      Destination: destino,
      DepartureArrivalDate: fechas,
      DepartureArrivalTimeFrom: horasFrom,
      DepartureArrivalTimeTo: horasTo,
      Ocompany: this.objetoDesencriptado.ocompany,
      Oagency: this.objetoDesencriptado.oagency,
      Type: this.tipoVuelo
    };
    this.service.searchFlight(data).subscribe(
      x => {
        this.headerService.ocultarSpinner();
        const obj = {
          result: x,
          request: data
        }
        let valor = this.headerService.encriptar(obj);
        this.saveObject(valor)
        this.router.navigate(["flights/flight-list"])
      }
    )
  }

  selection(passengers: any[]) {
    this.passengerList = passengers;
  }

  seleccionarCabina(valor: any, texto: string) {
    this.cabina = valor;
    this.textoCabina = texto;
  }

  seleccionarEscala(valor: any, texto: any) {
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
