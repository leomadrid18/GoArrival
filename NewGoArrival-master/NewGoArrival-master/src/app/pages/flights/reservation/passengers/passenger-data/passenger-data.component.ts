import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HeaderService } from 'src/app/services/head.service';


declare var $: any;

@Component({
  selector: 'app-passenger-data',
  templateUrl: './passenger-data.component.html',
  styleUrls: ['./passenger-data.component.css']
})
export class PassengerDataComponent implements OnInit {
  @Input() index: any;
  @Input() user: any;
  @Input() gds: any;
  @Input() lstpaises: any[] = [];
  @Input() lstDocument: any[] = [];

  tratamiento: any;
  loginData: any;
  datosuser: any;
  document: any;
  validNumberDoc: any;
  minDate: Date;
  maxDate: Date;
  bsValue: Date;
  isPhone = false;
  lstPaises: any;

  constructor(private cookieServices: CookieService, private headService: HeaderService) {
    this.bsValue = new Date();
    if (this.user?.type === 'Niño') {
      this.minDate = new Date(2011, 0, 1);
      this.maxDate = new Date(2020, 0, 1);
    } else if (this.user?.type === 'Infante') {
      this.minDate = new Date(2020, 3, 1);
      this.maxDate = new Date();
    } else {
      this.minDate = new Date(1915, 0, 1);
      const currentYear = new Date().getFullYear();
      this.maxDate = new Date(currentYear - 18, 11, 31);
      this.maxDate.setDate(this.maxDate.getMonth() - 216);
    }
    let fecha;
    if(this.datosuser != null && this.datosuser?.length > 0){
      this.datosuser.forEach((element: any) => {
        fecha = new Date(element.birthDate);
        this.bsValue = fecha;
      });
    }
    
   }

  ngOnInit(): void {
    this.loginData = this.cookieServices.get('dwerrgfqw24423');
    this.loginData = this.headService.desencriptar(this.loginData);
    this.validPassengers();
  }

  validPassengers() {
    if (this.user.gender === 'M') {
      this.tratamiento = 'MR';
    } else {
      this.tratamiento = 'MRS';
    }
    if (this.user.lpersonDocuments.length > 0) {
      if (this.user.lpersonDocuments[0].docTypeId === 'F3F05B20-412E-4A1A-BA31-B69B1E6D0392') {
        this.validNumberDoc = true;
      } else {
        this.validNumberDoc = false;
      }
    }
  }

  ValidarCampos() {
    this.datosuser.forEach(function (item: any, index: any) {
      if ($('#txtnombre_' + (index + 1)).val().length <= 0) {
        $('#txtnombre_' + (index + 1)).addClass('campo-invalido');
      } else {
        $('#txtnombre_' + (index + 1)).removeClass('campo-invalido');
      }
      if ($('#txtapellidos_' + (index + 1)).val().length <= 0) {
        $('#txtapellidos_' + (index + 1)).addClass('campo-invalido');
      } else {
        $('#txtapellidos_' + (index + 1)).removeClass('campo-invalido');
      }
      if ($('#txtnrodocumento_' + (index + 1)).val().length <= 0) {
        $('#txtnrodocumento_' + (index + 1)).addClass('campo-invalido');
      } else {
        $('#txtnrodocumento_' + (index + 1)).removeClass('campo-invalido');
      }
      if ($('#cbo_tipodocumento_' + (index + 1)).val().trim() === '') {
        $('#cbo_tipodocumento_' + (index + 1)).addClass('campo-invalido');
      } else {
        $('#cbo_tipodocumento_' + (index + 1)).removeClass('campo-invalido');
      }
      if ($('#cbotratamiento_' + (index + 1)).val().trim() === '') {
        $('#cbotratamiento_' + (index + 1)).addClass('campo-invalido');
      } else {
        $('#cbotratamiento_' + (index + 1)).removeClass('campo-invalido');
      }
      if ($('#txtcorreo_' + (index + 1)).val().length <= 0) {
        $('#txtcorreo_' + (index + 1)).addClass('campo-invalido');
      } else {
        $('#txtcorreo_' + (index + 1)).removeClass('campo-invalido');
      }
      if ($('#txttelefono_' + (index + 1)).val().length === 0) {
        $('#txttelefono_' + (index + 1)).addClass('campo-invalido');
      } else {
        $('#txttelefono_' + (index + 1)).removeClass('campo-invalido');
      }

    });
  }

  noespacio(valor: any) {
    $("#txtcorreo_" + valor).keyup(function () {
      var ta = $("#txtcorreo_" + valor);
      var letras = ta.val().replace(/ /g, "");
      ta.val(letras)
    });
  }

  Solotexto(event: any) {
    var regex = new RegExp("^[a-zA-Z ]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
      event.preventDefault();
      return;
    }
  }

  obtenercodigo(value: any) {
    $("#hdnTel_" + this.index).val(value);
    let valor = $('#cbopaises option:selected').attr('data-countryCode');
    if (valor === 'CO') {
      $('#txttelefono_' + this.index).attr('maxlength', '10');
    }
    if (valor === 'PA') {
      $('#txttelefono_' + this.index).attr('maxlength', '8');
    }
    if (valor === 'PE') {
      $('#txttelefono_' + this.index).attr('maxlength', '9');
    }
    if (valor === 'AR') {
      $('#txttelefono_' + this.index).attr('maxlength', '13');
    }
    if (valor === 'EC') {
      $('#txttelefono_' + this.index).attr('maxlength', '10');
    }
    if (valor === 'PY') {
      $('#txttelefono_' + this.index).attr('maxlength', '10');
    }
    if (valor === 'UY') {
      $('#txttelefono_' + this.index).attr('maxlength', '9');
    }
    if (valor === 'VE') {
      $('#txttelefono_' + this.index).attr('maxlength', '11');
    }
    if (valor === 'CL') {
      $('#txttelefono_' + this.index).attr('maxlength', '9');
    }
    if (valor === 'BR') {
      $('#txttelefono_' + this.index).attr('maxlength', '11');
    }
    if (valor === 'BO') {
      $('#txttelefono_' + this.index).attr('maxlength', '8');
    }
    if (valor === 'US') {
      $('#txttelefono_' + this.index).attr('maxlength', '10');
    }
    if (valor === 'MX') {
      $('#txttelefono_' + this.index).attr('maxlength', '13');
    }
    if (valor === 'CA') {
      $('#txttelefono_' + this.index).attr('maxlength', '10');
    }
    if (valor === 'CR') {
      $('#txttelefono_' + this.index).attr('maxlength', '8');
    }
    if (valor === 'CU') {
      $('#txttelefono_' + this.index).attr('maxlength', '9');
    }
  }

  ValidarSoloNumero(event: any) {
    // tslint:disable-next-line: max-line-length
    if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105) && event.keyCode !== 190 && event.keyCode !== 110 && event.keyCode !== 8 && event.keyCode !== 9) {
      return;
    }
  }

  setValor(valor: any) {
    if (valor === 'F3F05B20-412E-4A1A-BA31-B69B1E6D0392') {
      this.validNumberDoc = true;
    } else {
      this.validNumberDoc = false;
    }
  }

}
