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
  @Input() lcompanyUids: any[] = [];
  @Input() lstpaises: any[] = [];
  @Input() lstDocument: any[] = [];
  @Input() lstCostCenter: any[] = [];
  tratamiento: any;
  loginData: any;
  datosuser: any;
  document: any;
  travelCode: string;
  costCenterCode: string;
  validNumberDoc: any;
  minDate: Date;
  maxDate: Date;
  bsValue: Date;
  isPhone = false;
  lstPaises: any;
  valorrow!: any;
  id: any;
  lstSelects: any[] = [];
  lstInputs: any[] = [];
  lstUidsRq: any[] = [];
  constructor(private cookieServices: CookieService, private headService: HeaderService) {
    this.bsValue = new Date();
    this.costCenterCode = "";
    this.travelCode = "";
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
    if (this.datosuser != null && this.datosuser?.length > 0) {
      this.datosuser.forEach((element: any) => {
        fecha = new Date(element.birthDate);
        this.bsValue = fecha;
      });
    }

  }

  setSelectPreUID(item: any, index: any, event: any) {
    let valor = event;
    let obj = {
      CodeUid: item.codeUid,
      PassengerId: index.toString(),
      ValueUid: valor
    }
    if (this.lstUidsRq.length === 0) {
      this.lstUidsRq.push(obj);
      this.createInput(valor, item, index)
    } else {
      const indexe = this.lstUidsRq.findIndex(x => x.CodeUid === obj.CodeUid);
      if (indexe !== -1) {
        this.lstUidsRq[indexe] = obj;
        this.createInput(valor, item, index)
      } else {
        this.createInput(valor, item, index)
        this.lstUidsRq.push(obj);
      }
    }
  }

  setBorder(id: any) {
    this.id = document.getElementById(id);
    this.id.style.border = "2px solid #DFD9D8";
    this.id.style.borderRadius = "7px";
  }

  setSelectUID(item: any, index: any, event: any) {
    let id = "select_value_" + item.codeUid + "_" + index;
    let valor = event.target.value;
    let obj = {
      CodeUid: item.codeUid,
      PassengerId: index.toString(),
      ValueUid: valor
    }
    this.user.ocostCenter = obj;
    if (this.lstUidsRq.length === 0) {
      this.lstUidsRq.push(obj);
      this.setBorder(id);
      this.createInput(valor, item, index)
    } else {
      const indexe = this.lstUidsRq.findIndex(x => x.CodeUid === obj.CodeUid);
      if (indexe !== -1) {
        this.lstUidsRq[indexe] = obj;
        this.setBorder(id);
        this.createInput(valor, item, index)
      } else {
        this.createInput(valor, item, index)
        this.setBorder(id);
        this.lstUidsRq.push(obj);
      }
    }
  }

  createInput(valor: any, item: any, indexPax: any) {
    if (valor != "OTROS") {
      item.showInput = false;
      return;
    }
    if (valor === "OTROS") {
      item.showInput = true;
    } else {
      item.showInput = false;
    }
  }

  onInputChange(codeUid: any, index: any, event: any) {
    let id = "input_" + codeUid + "_" + index;
    let valorInput = event.target.value;
    let obj = {
      CodeUid: codeUid,
      PassengerId: index.toString(),
      ValueUid: valorInput
    }
    if (this.lstUidsRq.length === 0) {
      this.setBorder(id);
      this.lstUidsRq.push(obj);
    } else {
      const indexe = this.lstUidsRq.findIndex(x => x.CodeUid === obj.CodeUid);
      if (indexe !== -1) {
        this.setBorder(id);
        this.lstUidsRq[indexe] = obj;
      } else {
        this.setBorder(id);
        this.lstUidsRq.push(obj);
      }
    }
  }

  ngOnInit(): void {
    this.validUIDS(this.lcompanyUids);
    this.precargarUids();
    console.log(this.user);
    this.headService.ocultarSpinner();
    this.loginData = this.cookieServices.get('dwerrgfqw24423');
    this.loginData = this.headService.desencriptar(this.loginData);
    this.validPassengers();
  }

  precargarUids() {
    this.lstSelects.forEach(element => {
      if (element.codeUid === 'U5' && this.user.lcostCenter?.length > 0) {
        this.costCenterCode = this.user.lcostCenter[0].id;
        const indexe = element.lcompanyUidLists.findIndex((x: any) => x.costCenterId === this.costCenterCode);
        this.costCenterCode = element.lcompanyUidLists[indexe].code;
        if(indexe != -1){
          let obj = {
            ValueUid: element.lcompanyUidLists[indexe].code
          }
          this.user.ocostCenter = obj;
        }
        this.setSelectPreUID(element, this.index, element.lcompanyUidLists[indexe].code)
      }
      if (element.codeUid === 'U9' && this.user.travelerCode != '') {
        this.travelCode = this.user.travelerCode;
        const idExiste = element.lcompanyUidLists.some((objeto: any) => objeto.code === this.travelCode);
        if (idExiste) {
          this.setSelectPreUID(element, this.index, this.user.travelerCode)
        } else {
          this.travelCode = "";
        }

      }
    });
  }

  validUIDS(lst: any) {
    if(lst?.length > 0){
      lst.forEach((element: any) => {
        if (element.isList || element.codeUid === "U5") {
          if (element.codeUid === "U5") {
            element.lcompanyUidLists = this.lstCostCenter;
          }
          this.lstSelects.push(element);
        } else {
          this.lstInputs.push(element);
        }
      });
      this.lstSelects.forEach(element => {
        element.showInput = false;
      });
    }
    
  }

  validPassengers() {
    let fecha = new Date(this.user.birthDate);
    this.bsValue = fecha;
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
    this.datosuser?.forEach(function (item: any, index: any) {
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
