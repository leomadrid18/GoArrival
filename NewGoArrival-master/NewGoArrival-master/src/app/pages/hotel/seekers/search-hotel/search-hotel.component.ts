import { Component, OnInit } from '@angular/core';
import { DatepickerDateCustomClasses } from 'ngx-bootstrap/datepicker';
import { HeaderService } from 'src/app/services/head.service';

declare var $: any;

@Component({
  selector: 'app-search-hotel',
  templateUrl: './search-hotel.component.html',
  styleUrls: ['./search-hotel.component.css']
})
export class SearchHotelComponent implements OnInit {
  objetoDesencriptado: any = {};
  objetoEncriptado: any;
  model: any = {};
  data: any[] = [];
  keyword = "name";
  destinoValue: string;
  destinoText: string;
  isOpen = false;
  lstAutocomplete: any[] = [];
  flagDinData: boolean;
  fecha1: any;
  minDateIngreso: Date;
  fecha2: any;
  valfechasalida = false;
  fechaSalida: string;
  minDateSalida: Date;
  dateCustomClasses: DatepickerDateCustomClasses[] = [];
  calendarSalidaValue: Date;
  maxDateIngreso: any;
  valfechadestino = false;
  general = "col-lg-12 col-md-12 col-sm-12 col-12 m-0 p-0"
  fechaRetorno: string;

  estrellas: string;
  textoestrellas: string = "Todas";



  constructor(private headerService: HeaderService) {
    this.destinoValue = "";
    this.destinoText = "";
    this.estrellas = "";
    this.fechaRetorno = "";
    this.flagDinData = false;
    this.fechaSalida = "";
    this.minDateSalida = new Date();
    this.minDateSalida.setDate(this.minDateSalida.getDate() + 1);
    this.calendarSalidaValue = new Date();
    this.minDateIngreso = new Date();
    this.minDateIngreso.setDate(this.minDateIngreso.getDate());
    this.calendarSalidaValue.setDate(this.calendarSalidaValue.getDate() + 1);
   }

  ngOnInit(): void {
    this.objetoDesencriptado =  localStorage.getItem('%$#2x5sd4e');
    this.objetoDesencriptado = JSON.parse(this.objetoDesencriptado);
    /* this.objetoDesencriptado = this.headerService.desencriptar(this.objetoEncriptado); */
  }

  searchHotel(){

  }

  onChangeSearch(val: string) {
    $(".x").hide();
    if (val.length >= 3) {
      const resultFilter = this.lstAutocomplete.filter(word => word.searchName.toLowerCase().search(val.toLowerCase()) >= 0);
      this.data = resultFilter;

      $(".x").hide();
    }
  }

  onFocused(e: any) {
    this.flagDinData = false;
  }

  onValueChangeIngreso(value: any): void {
    if (value[0] != null) {
      this.fecha1 = value[0];
      this.fecha2 = value[1];
      this.valfechasalida = false;
      let mes = "";
      if ((value[0].getMonth() + 1) < 10) {
        mes = "0" + (value[0].getMonth() + 1);
      } else {
        mes = "" + (value[0].getMonth() + 1);
      }

      let dia = "";
      if (value[0].getDate() < 10) {
        dia = "0" + value[0].getDate();
      } else {
        dia = "" + value[0].getDate();
      }

      $("#ingreso").removeClass("campo-invalido");
      this.fechaSalida = value[0].getFullYear() + "-" + mes + "-" + dia;

      this.minDateSalida = value[0];
      this.dateCustomClasses = [
        { date: this.minDateSalida, classes: ['bg-danger', 'text-warning'] }
      ];

      if (value[0] >= this.calendarSalidaValue) {
        $("#datesalida").val("");
      }

      this.onValueChangeSalida(value[1]);
    }
  }

  SeleccionarEstrella(codeestrella: string, texto: string) {
    this.estrellas = codeestrella;
    this.textoestrellas = texto;
  }

  validarNumeros(e: any) {
    var tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 8) return true;
    var patron = /^([0-9])*$/;
    var teclaFinal = String.fromCharCode(tecla);
    return patron.test(teclaFinal);
  }

  validarNumerosN(e: any) {
    var tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 8) return true;
    var patron = /^([])*$/;
    var teclaFinal = String.fromCharCode(tecla);
    if (tecla == 505) return false;
    return patron.test(teclaFinal);
  }

  onValueChangeSalida(value: Date): void {
    if (value != null) {
      this.calendarSalidaValue = value;
      this.maxDateIngreso = value;
      this.dateCustomClasses = [
        { date: null, classes: ['bg-danger', 'text-warning'] }
      ];
      this.valfechadestino = false;
      let mes = "";
      if ((value.getMonth() + 1) < 10) {
        mes = "0" + (value.getMonth() + 1);
      } else {
        mes = "" + (value.getMonth() + 1);
      }

      let dia = "";
      if (value.getDate() < 10) {
        dia = "0" + value.getDate();
      } else {
        dia = "" + value.getDate();
      }
      $("#salida").removeClass("campo-invalido");

      this.fechaRetorno = value.getFullYear() + "-" + mes + "-" + dia;
    }
  }


  selectEvent(item: any) {
    this.isOpen = false;
    this.destinoValue = item.iataCode;
    this.destinoText = item.name;
    $("#txtOrigen").removeClass("campo-invalido");
    setTimeout(function () {
      $(".x").hide();
    }, 1000);
  }

}
