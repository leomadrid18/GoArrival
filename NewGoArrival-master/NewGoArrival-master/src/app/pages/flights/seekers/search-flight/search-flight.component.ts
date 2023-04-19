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
  
  isOpen = false;
  data2: any[] = [];
 
  valdestino = false;
  bsValue: Date;
  isOpendate = false;
  valfechasalida = false;
  valfechadestino = false;
  minDateSalida: Date;
  minDateRetorno: Date;
  dateCustomClasses: DatepickerDateCustomClasses[];
  calendarSalidaValue: any;
  
  textoCabina: string;
  cabina: string;
  textoEscala: string;
  escala: string;
  pasajeros: number;
  maleta: boolean = true;
  objetoDesencriptado: any;
  validarPasajeros = false;
  passengerList: any;


  datosEnvira = {
  origenAuto:  "",
  origentTexto: "",
  destinoAuto: "",
  destinoTexto: "",
  fechaSalida: "",
  fechaRetorno: "",
  fechaSalidaShow: "",
  fechaRetornoShow: "",
  origenAuto1: "",
  origenAuto2: "",
  origenAuto3: "",
  origenAuto4: "",
  origenAuto5: "",
  origenAuto6: "",
  origentTexto1: "",
  origentTexto2: "",
  origentTexto3: "",
  origentTexto4: "",
  origentTexto5: "",
  origentTexto6: "",
  destinoAuto1: "",
  destinoAuto2: "",
  destinoAuto3: "",
  destinoAuto4: "",
  destinoAuto5: "",
  destinoAuto6: "",
  destinoTexto1: "",
  destinoTexto2: "",
  destinoTexto3: "",
  destinoTexto4: "",
  destinoTexto5: "",
  destinoTexto6: "",

  fechaSalida1: "",
  fechaSalida2: "",
  fechaSalida3: "",
  fechaSalida4: "",
  fechaSalida5: "",
  fechaSalida6: "",

  fechaSalidaShow1: "",
  fechaSalidaShow2: "",
  fechaSalidaShow3: "",
  fechaSalidaShow4: "",
  fechaSalidaShow5: "",
  fechaSalidaShow6: "",
}

  constructor(private service: FlightService, private router: Router, 
    private cookie: CookieService, private headerService: HeaderService,
    private cookieServices: CookieService) {

    this.datae = [];

    this.tipoVuelo = "RT";
    this.indexTramo = 2;
    this.pasajeros = 1;
 
    this.cabina = "";

    this.textoCabina = "Todas";
    this.textoEscala = "Todas";
    this.escala = "";
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
        origen.push(this.datosEnvira.origenAuto1);
        origen.push(this.datosEnvira.origenAuto2);

        destino.push(this.datosEnvira.destinoAuto1);
        destino.push(this.datosEnvira.destinoAuto2);

        fechas.push(this.datosEnvira.fechaSalida1);
        fechas.push(this.datosEnvira.fechaSalida2);
        break;
      case 3:
        origen.push(this.datosEnvira.origenAuto1);
        origen.push(this.datosEnvira.origenAuto2);
        origen.push(this.datosEnvira.origenAuto3);

        destino.push(this.datosEnvira.destinoAuto1);
        destino.push(this.datosEnvira.destinoAuto2);
        destino.push(this.datosEnvira.destinoAuto3);

        fechas.push(this.datosEnvira.fechaSalida1);
        fechas.push(this.datosEnvira.fechaSalida2);
        fechas.push(this.datosEnvira.fechaSalida3);
        break;
      case 4:
        origen.push(this.datosEnvira.origenAuto1);
        origen.push(this.datosEnvira.origenAuto2);
        origen.push(this.datosEnvira.origenAuto3);
        origen.push(this.datosEnvira.origenAuto4);

        destino.push(this.datosEnvira.destinoAuto1);
        destino.push(this.datosEnvira.destinoAuto2);
        destino.push(this.datosEnvira.destinoAuto3);
        destino.push(this.datosEnvira.destinoAuto4);

        fechas.push(this.datosEnvira.fechaSalida1);
        fechas.push(this.datosEnvira.fechaSalida2);
        fechas.push(this.datosEnvira.fechaSalida3);
        fechas.push(this.datosEnvira.fechaSalida4);
        break;
      case 5:
        origen.push(this.datosEnvira.origenAuto1);
        origen.push(this.datosEnvira.origenAuto2);
        origen.push(this.datosEnvira.origenAuto3);
        origen.push(this.datosEnvira.origenAuto4);
        origen.push(this.datosEnvira.origenAuto5);

        destino.push(this.datosEnvira.destinoAuto1);
        destino.push(this.datosEnvira.destinoAuto2);
        destino.push(this.datosEnvira.destinoAuto3);
        destino.push(this.datosEnvira.destinoAuto4);
        destino.push(this.datosEnvira.destinoAuto5);

        fechas.push(this.datosEnvira.fechaSalida1);
        fechas.push(this.datosEnvira.fechaSalida2);
        fechas.push(this.datosEnvira.fechaSalida3);
        fechas.push(this.datosEnvira.fechaSalida4);
        fechas.push(this.datosEnvira.fechaSalida5);
        break;
      case 6:
        origen.push(this.datosEnvira.origenAuto1);
        origen.push(this.datosEnvira.origenAuto2);
        origen.push(this.datosEnvira.origenAuto3);
        origen.push(this.datosEnvira.origenAuto4);
        origen.push(this.datosEnvira.origenAuto5);
        origen.push(this.datosEnvira.origenAuto6);

        destino.push(this.datosEnvira.destinoAuto1);
        destino.push(this.datosEnvira.destinoAuto2);
        destino.push(this.datosEnvira.destinoAuto3);
        destino.push(this.datosEnvira.destinoAuto4);
        destino.push(this.datosEnvira.destinoAuto5);
        destino.push(this.datosEnvira.destinoAuto6);

        fechas.push(this.datosEnvira.fechaSalida1);
        fechas.push(this.datosEnvira.fechaSalida2);
        fechas.push(this.datosEnvira.fechaSalida3);
        fechas.push(this.datosEnvira.fechaSalida4);
        fechas.push(this.datosEnvira.fechaSalida5);
        fechas.push(this.datosEnvira.fechaSalida6);
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
        origen.push(this.datosEnvira.origenAuto);
        origen.push(this.datosEnvira.destinoAuto);

        destino.push(this.datosEnvira.destinoAuto);
        destino.push(this.datosEnvira.origenAuto);

        fechas.push(this.datosEnvira.fechaSalida);
        fechas.push(this.datosEnvira.fechaRetorno);
        break;

      case "OW":
        origen.push(this.datosEnvira.origenAuto);
        destino.push(this.datosEnvira.destinoAuto);
        fechas.push(this.datosEnvira.fechaSalida);
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
    let valor = this.headerService.encriptar(this.datosEnvira);
    this.cookieServices.set('euimbh235$%/mjmn', valor);
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
    this.datosEnvira.destinoAuto = item.iataCode;
    this.datosEnvira.destinoTexto = item.name;
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
        this.datosEnvira.fechaRetorno = "";
      }
      this.datosEnvira.fechaSalida = value.getFullYear() + "/" + mes + "/" + dia;
      this.datosEnvira.fechaSalidaShow = dia + "/" + mes + "/" + value.getFullYear();
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

      this.datosEnvira.fechaRetorno = value.getFullYear() + "/" + mes + "/" + dia;
      this.datosEnvira.fechaRetornoShow = dia + "/" + mes + "/" + value.getFullYear();
    }
  }


  selectEvent(item: any) {
    // do something with selected item
    this.datosEnvira.origenAuto = item.iataCode;
    this.datosEnvira.origentTexto = item.name;
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
