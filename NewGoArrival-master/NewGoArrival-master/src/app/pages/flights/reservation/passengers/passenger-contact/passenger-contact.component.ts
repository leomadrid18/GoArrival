import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HeaderService } from 'src/app/services/head.service';

declare var $: any;

@Component({
  selector: 'app-passenger-contact',
  templateUrl: './passenger-contact.component.html',
  styleUrls: ['./passenger-contact.component.css']
})
export class PassengerContactComponent implements OnInit {

  @Input() lsCostCenter: any[] = [];
  @Input() document: any;
  @Output() numero1 = new EventEmitter<any>();
  inderror!: boolean;
  logindata;
  nombre;
  telefono;
  validCampos = false;
  isRuc = true;
  correo;
  valueruc = "RUC"
  validNumberDoc = true;
  validConsolidar: any;
  isPhone = false;

  constructor(private cookieServices: CookieService, private headService: HeaderService) {

    this.logindata = this.cookieServices.get('dwerrgfqw24423');
    this.logindata = this.headService.desencriptar(this.logindata);
    let valor;
    if (this.logindata.ocompany != null) {
      valor = this.logindata.ocompany.typeCompanyID;
    } else {
      valor = null;
    }

    this.nombre = this.logindata.userName + ' ' + this.logindata.userLastName;
    this.correo = this.logindata.email;
    this.telefono = this.logindata.phoneNumber;


  }

  ngOnInit(): void {
    this.validPhone();
  }

  validPhone() {
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/Windows Phone/i)) {
      this.isPhone = true;
    }
  }

  noespacio() {
    $("#contactocorreo").keyup(function () {
      var ta = $("#contactocorreo");
      var letras = ta.val().replace(/ /g, "");
      ta.val(letras)
    });
  }

  setValor(valor: any) {
    if (valor === 'F3F05B20-412E-4A1A-BA31-B69B1E6D0392') {
      this.validNumberDoc = true;
    } else {
      this.validNumberDoc = false;
    }
  }

  cip(valor:any) {
    if (valor === 'B') {
     /*  this.sessionStorageService.store("ss_isRuConfig", true); */
      this.validCampos = false;
      this.isRuc = true;
    } else {
     /*  this.sessionStorageService.store("ss_isRuConfig", false); */
      this.validCampos = true;
      this.isRuc = false;
    }
    /* this.sessionStorageService.store('chk_cnsl', valor); */
  }

  Solotexto(event: any) {
    var regex = new RegExp("^[a-zA-Z ]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
      event.preventDefault();
      return;
    }
  }

  ValidarCampos(tipo: any) {
    let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (tipo === 1) {
      if ($('#contactocorreo').val().length <= 0) {
        $('#contactocorreo').addClass('campo-invalido');
      } else {
        $('#contactocorreo').removeClass('campo-invalido');
      }

      if (regex.test($('#contactocorreo').val().trim())) {
        this.inderror = false;
      } else {
        this.inderror = true;
      }
    }

    if (tipo === 2) {
      if ($('#contactotelefono').val().length <= 0) {
        $('#contactotelefono').addClass('campo-invalido');
      } else {
        $('#contactotelefono').removeClass('campo-invalido');
      }
    }

    if (tipo === 3) {
      if ($('#nombrecontacto').val().length <= 0) {
        $('#nombrecontacto').addClass('campo-invalido');
      } else {
        $('#nombrecontacto').removeClass('campo-invalido');
      }
    }
  }

  ValidarSoloNumero(event: any) {
    const key = event.keyCode;
    if (key === 32) { // bloquea la tecla de espacio
      event.preventDefault();
    }
    // tslint:disable-next-line: max-line-length
    if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105) && event.keyCode !== 190 && event.keyCode !== 110 && event.keyCode !== 8 && event.keyCode !== 9) {
      return;
    }
  }

  obtenercodigo(value: any) {
    $("#hdnTel").val(value);
    let valor = $('#cbopaises option:selected').attr('data-countryCode');
    console.log(valor);
    if (valor === 'CO') {
      $('#contactotelefono').attr('maxlength', '10');
    }
    if (valor === 'PA') {
      $('#contactotelefono').attr('maxlength', '8');
    }
    if (valor === 'PE') {
      $('#contactotelefono').attr('maxlength', '9');
    }
    if (valor === 'AR') {
      $('#contactotelefono').attr('maxlength', '13');
    }
    if (valor === 'EC') {
      $('#contactotelefono').attr('maxlength', '10');
    }
    if (valor === 'PY') {
      $('#contactotelefono').attr('maxlength', '10');
    }
    if (valor === 'UY') {
      $('#contactotelefono').attr('maxlength', '9');
    }
    if (valor === 'VE') {
      $('#contactotelefono').attr('maxlength', '11');
    }
    if (valor === 'CL') {
      $('#contactotelefono').attr('maxlength', '9');
    }
    if (valor === 'BR') {
      $('#contactotelefono').attr('maxlength', '11');
    }
    if (valor === 'BO') {
      $('#contactotelefono').attr('maxlength', '8');
    }
    if (valor === 'US') {
      $('#contactotelefono').attr('maxlength', '10');
    }
    if (valor === 'MX') {
      $('#contactotelefono').attr('maxlength', '13');
    }
    if (valor === 'CA') {
      $('#contactotelefono').attr('maxlength', '10');
    }
    if (valor === 'CR') {
      $('#contactotelefono').attr('maxlength', '8');
    }
    if (valor === 'CU') {
      $('#contactotelefono').attr('maxlength', '9');
    }
  }

}
