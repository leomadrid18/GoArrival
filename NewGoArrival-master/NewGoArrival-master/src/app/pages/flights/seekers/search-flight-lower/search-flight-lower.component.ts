import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { DatepickerDateCustomClasses } from 'ngx-bootstrap/datepicker';
import { CookieService } from 'ngx-cookie-service';
import { FlightService } from 'src/app/services/flight/flight.service';

import { HeaderService } from 'src/app/services/head.service';


declare var $: any;

@Component({
  selector: 'app-search-flight-lower',
  templateUrl: './search-flight-lower.component.html',
  styleUrls: ['./search-flight-lower.component.css']
})

export class SearchFlightLowerComponent implements OnInit {
  @Input() lstMultidestino: any;
  @Input() tipoVuelo: any;




  validMutli = false;
  general = "col-lg-12 col-md-12 col-sm-12 col-12 "
  /*  tipoVuelo: string; */
  indexTramo: number;
  lstAutocomplete: any[] = [];
  airportlist: any;
  citylist: any;
  model: any = {};
  keyword = "name";
  flights: any;
  data: any[] = [];
  isOpen = false;
  data2: any[] = [];
  valdestino = false;
  bsValue: Date;
  bsValueVuelta: Date;
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
  objetoDesencriptado: any;
  bodega: boolean = true;

  origenValue: any;
  origenText: any;
  destinoValue: any;
  destinoText: any;

  formattedDate: any;
  vueltaValue: any;
  idaValue: any;
  objRq: any;
  @Output() enviarData = new EventEmitter<any>();
  @Output() ocultar = new EventEmitter<any>();
  constructor(private service: FlightService, private head: HeaderService, private cookie: CookieService) {
    this.tipoVuelo = "";
    this.indexTramo = 2;
    this.pasajeros = 1;
    this.cabina = "";
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
    this.bsValueVuelta = new Date();
    this.dateCustomClasses = [
      { date: now, classes: ["bg-danger", "text-warning"] },
    ];
  }

  ngOnInit(): void {
    this.objetoDesencriptado = this.cookie.get('dwerrgfqw24423');
    this.objetoDesencriptado = this.head.desencriptar(this.objetoDesencriptado);
    this.objRq = this.cookie.get('euimbh235$%/mjmn');
    this.objRq = this.head.desencriptar(this.objRq);

    $(".x").hide();
    if (this.tipoVuelo === 'MC') {
      this.origenValue = this.objRq.origenAuto1;
      this.origenText = this.objRq.origentTexto1;
      this.destinoValue = this.objRq.destinoAuto1;
      this.destinoText = this.objRq.destinoTexto1;
    } else {
      this.origenValue = this.objRq.origenAuto;
      this.origenText = this.objRq.origentTexto;
      this.destinoValue = this.objRq.destinoAuto;
      this.destinoText = this.objRq.destinoTexto;
      this.bsValue = this.objRq.fechaSalidaShow;
      this.bsValueVuelta = this.objRq.fechaRetornoShow;
      this.vueltaValue = new Date(this.objRq.fechaRetorno);
      this.idaValue = new Date(this.objRq.fechaSalida);
    }
    this.bodega = this.objRq.bodega;
    this.maleta = this.objRq.maleta;
    this.objRq.origenAuto1 = this.origenValue;
    this.objRq.origentTexto1 = this.origenText;
    this.objRq.destinoAuto1 = this.destinoValue;
    this.objRq.destinoTexto1 = this.destinoText;
    this.escala = this.objRq.escala;
    this.textoEscala = this.objRq.textoEscala;
    this.cabina = this.objRq.cabina;
    this.textoCabina = this.objRq.textoCabina;
    this.llenarSearch(this.tipoVuelo);
  }


  llenarSearch(tipovuelo: any) {
    switch (tipovuelo) {
      case 'RT':
        $('#radio_b_tv_1').prop("checked", true);
        let radio = document.getElementById("radio_b_tv_1")
        $('#datepickerSalidaLower').val(this.objRq.fechaSalidaShow);
        let fecha = document.getElementById("datepickerSalidaLower");
        $('#datepickerRetornoLower').val(this.objRq.fechaRetornoShow);
        let fecha1 = document.getElementById("datepickerRetornoLower");
        break;
      case 'OW':
        $('#radio_b_tv_2').prop("checked", true);
        $('#fechasalida').val(this.objRq.fechaSalidaShow);
        let fechae = document.getElementById("fechasalida");
        break;
      case 'MC':
        $('#radio_b_tv_3').prop("checked", true);
        break;
    }
  }

  llenarOirgenMulti(lst: any, number: any) {
    this.lstMultidestino.forEach((element: any) => {
      if (number === 1) {
        lst.push(element.origenIata);
      } else if (number === 2) {
        lst.push(element.destinoIata);
      } else {
        lst.push(element.salida);
      }
    });
    return lst;
  }


  searchFlight() {
    this.head.mostrarSpinner();
    this.ocultar.emit(false);
    let origen: any[] = [];
    let destino: any[] = [];
    let fechas: any[] = [];
    let horasFrom: any[] = [];
    let horasTo: any[] = [];
    let lUsers_: any[] = [];
    let lPassengers: any[] = [];


    switch (this.tipoVuelo) {
      case "RT":
        origen.push(this.objRq.origenAuto);
        origen.push(this.objRq.destinoAuto);

        destino.push(this.objRq.destinoAuto);
        destino.push(this.objRq.origenAuto);

        fechas.push(this.objRq.fechaSalida);
        fechas.push(this.objRq.fechaRetorno);
        break;

      case "OW":
        origen.push(this.objRq.origenAuto);
        destino.push(this.objRq.destinoAuto);
        fechas.push(this.objRq.fechaSalida);
        break;
      case "MC":
        origen = this.llenarOirgenMulti(origen, 1);
        destino = this.llenarOirgenMulti(destino, 2);
        fechas = this.llenarOirgenMulti(fechas, 3);
        /* this.validMutli = true; */
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
      IncludesBaggage: this.bodega,
      IncludeCarryOn: this.maleta,
      Origin: origen,
      Destination: destino,
      DepartureArrivalDate: fechas,
      DepartureArrivalTimeFrom: horasFrom,
      DepartureArrivalTimeTo: horasTo,
      Ocompany: this.objetoDesencriptado.ocompany,
      Oagency: this.objetoDesencriptado.oagency
    };
    this.objRq.bodega = this.bodega;
    this.objRq.maleta = this.maleta;
    this.objRq.escala = this.escala;
    this.objRq.textoEscala = this.textoEscala;
    this.objRq.cabina = this.cabina;
    this.objRq.textoCabina = this.textoCabina;
    this.cookie.set('euimbh235$%/mjmn', this.objRq);
    this.service.searchFlight(data).subscribe(
      x => {
       
        const obj = {
          result: x,
          request: data,
          lstMulti: this.lstMultidestino
        }
        let valor = this.head.encriptar(obj);
        this.head.addObject(1, valor);
        this.enviarData.emit(obj);
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
    if (this.objRq.origentTexto.length < 10) {
      this.objRq.origentTexto = "";
    }

    if (this.objRq.destinoTexto.length < 10) {
      this.objRq.destinoTexto = "";
    }
  }

  onChangeSearch(val: string) {
    this.airportlist = localStorage.getItem("ls_airportlist");
    this.airportlist = JSON.parse(this.airportlist);
    this.citylist = localStorage.getItem("ls_citylist");
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
    this.objRq.destinoAuto = item.iataCode;
    this.objRq.destinoTexto = item.name;
    this.valdestino = false;
    $("#txtDestino").removeClass("campo-invalido");
    $(".x").hide();
    if (this.objRq.origentTexto.length < 5) {
      this.objRq.origentTexto = "";
    }
  }

  onFocused2(e: any) { }

  handlerSalida() {
    this.isOpendate = true;
  }

  onChangeSearchDestino(val: string) {

    this.airportlist = localStorage.getItem("ls_airportlist");
    this.airportlist = JSON.parse(this.airportlist);
    this.citylist = localStorage.getItem("ls_citylist");
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
      this.objRq.fechaSalida = this.fechaSalida;
      this.objRq.fechaSalidaShow = this.fechaSalidaShow;
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
      this.objRq.fechaRetorno = this.fechaRetorno;
      this.objRq.fechaRetornoShow = this.fechaRetornoShow;
    }
  }


  selectEvent(item: any) {
    // do something with selected item
    this.objRq.origenAuto = item.iataCode;
    this.objRq.origentTexto = item.name;
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
      this.validMutli = true;

    }
  }

}
