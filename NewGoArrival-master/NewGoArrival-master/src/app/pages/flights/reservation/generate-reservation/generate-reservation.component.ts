import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-generate-reservation',
  templateUrl: './generate-reservation.component.html',
  styleUrls: ['./generate-reservation.component.css']
})
export class GenerateReservationComponent implements OnInit {
  flight: any;
  validPassenger= false;
  datosuser: any;
  lapprovers: any;
  lpolicies: any;
  updateAproval: any;
  company: any;
  currency: any;
  public myObject!: { id: number, myObject: { myString: string } };
  constructor(private router: Router,private headService: HeaderService,private cookieServices: CookieService) { }

  ngOnInit(): void {
    this.traerPassenger();
  }

  traerData() {
    this.headService.getObject(2).then(object => {
      this.myObject = object;
      this.flight = this.headService.desencriptar(this.myObject.myObject.myString);
      this.flight = this.flight.rpta;
      this.currency = this.flight.oprice.currency;
      this.lpolicies = this.flight.lpolicies;
      this.lapprovers = this.flight.lapprovers;
      this.traerLogin();
     
    })
  }

  traerLogin(){
    this.company = this.cookieServices.get('dwerrgfqw24423');
    this.company = this.headService.desencriptar(this.company);
    this.updateAproval = this.company.ocompany?.ocompanyConfiguration?.updateApprovals;
    this.validPassenger = true;
  }

  traerPassenger(){
    this.datosuser = this.headService.getObject(20).then(user => {
      let usuario = user;
      this.datosuser = this.headService.desencriptar(usuario.myObject.myString);
      this.traerData();
    });
  }

  volver() {
    this.router.navigate(["flights/passenger-data"]);
  }

}
