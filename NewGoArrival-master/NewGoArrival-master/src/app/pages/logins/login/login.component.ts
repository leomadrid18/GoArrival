import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/services/head.service';
import { LoginService } from 'src/app/services/login/login.service';

import * as crypto from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  year: Date = new Date();
  numberyear: any;
  usuario: any;
  password: any;
  messageError: any;
  validError: boolean;
  showHeader = false;
  passwordCrypto = 'serviceLogin#$';
  objetoEncriptado: string;
  constructor(private router: Router, private headerService: HeaderService,
    private service: LoginService) { 
    this.validError = false;
    this.showHeader = false;
    this.usuario = "";
    this.objetoEncriptado = "";
    this.password = "";
    this.headerService.ocultarEncabezado();
  }

  ngOnInit(): void {
    this.numberyear = this.year.getFullYear();
  }

  


  loginUser() {
    let obj = {
      User: this.usuario,
      Password: crypto.SHA256(this.password).toString(),
      AppId: 1
    }
    this.service.login(obj).subscribe(
      rpta => {
        if(rpta.oerror != null){
          this.messageError = rpta.oerror.message;
          this.validError = true;
          return;
        } else {
         /*  this.headerService.setData(rpta); */
          this.objetoEncriptado = this.headerService.encriptar(rpta);
          localStorage.setItem('%$#2x5sd4e', this.objetoEncriptado);
          this.router.navigate(["flights"]);
        }
        
      }
    );
  }

}
