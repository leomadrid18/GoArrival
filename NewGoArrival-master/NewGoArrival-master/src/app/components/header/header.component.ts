import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  lista: any[] = ['vuelo', 'hoteles', 'autos', 'seguros', 'buses', 'paquete'];
  listaText: any[] = ['textVuelos', 'textHotel', 'textAutos', 'textSeguros', 'textBuses', 'textPaquetes'];
  listaImg: any[] = ['imgVuelo', 'imgHotel', 'imgAuto', 'imgSeguros', 'imgBuses', 'imgpaquete'];
  listaRojo: any[] = ['vuelorojo', 'hotelrojo', 'autorojo', 'segurojo', 'busesrojo', 'paquerojo'];
  qwe: any;
  visible: any;
  numero: number;
  prendido = "vuelosOn";
  apagado = "vuelosOff";
  constructor(private router: Router) {
    this.numero = 1;
  }

  ngOnInit(): void {
    /*  const miVariable: string | null = null;
     const valor = miVariable ?? "valor por defecto";
     console.log(valor); // Imprime "valor por defecto" */
  }

  change(on: string,off: string,number: any){
    this.qwe = document.getElementById(this.prendido);
    this.qwe.style.display = "none";
    this.qwe = document.getElementById(this.apagado);
    this.qwe.style.display = "initial";
    this.qwe = document.getElementById(off);
    this.qwe.style.display = "none";
    this.qwe = document.getElementById(on);
    this.qwe.style.display = "initial";
    this.prendido = on;
    this.apagado = off;
    switch (number) {
      case 1:
        this.router.navigate(["flights"]);
        break;
      case 2:
        this.router.navigate(["hotel"]);
        break;
      case 3:
         this.router.navigate(["cars"]);
        break;
      case 4:
         this.router.navigate(["insurance"]);
        break;
      case 5:
        /*this.router.navigate(["flights"]); */
        break;
      case 6:
        /*   this.router.navigate(["flights"]); */
        break;
    }
  }

  ocultar(id: string, text: string, img: string, rojo: string) {
    this.lista.forEach(element => {
      this.qwe = document.getElementById(element);
      this.qwe.style.visibility = "hidden";
    });
    this.listaText.forEach(texto => {
      this.qwe = document.getElementById(texto);
      this.qwe.style.color = "#767676";
    });
    this.listaImg.forEach(img => {
      this.qwe = document.getElementById(img);
      this.qwe.style.display = "initial";
    });
    this.listaRojo.forEach(rojo => {
      this.qwe = document.getElementById(rojo);
      this.qwe.style.display = "none";
    });
    this.visible = document.getElementById(id)
    this.visible.style.visibility = "visible";
    this.visible = document.getElementById(text)
    this.visible.style.color = "#ED1C24";
    this.visible = document.getElementById(img)
    this.visible.style.display = "none";
    this.visible = document.getElementById(rojo)
    this.visible.style.display = "initial";
  }

  changeOption(number: any, id: string, text: string, img: string, rojo: string) {
    if (this.numero === number) { return }
    switch (number) {
      case 1:
        this.numero = 1;
        this.ocultar(id, text, img, rojo);
        this.router.navigate(["flights"]);
        break;
      case 2:
        this.numero = 2;
        this.ocultar(id, text, img, rojo);
        this.router.navigate(["hotel"]);
        break;
      case 3:
        this.numero = 3;
        this.ocultar(id, text, img, rojo);
         this.router.navigate(["cars"]);
        break;
      case 4:
        this.numero = 4;
        this.ocultar(id, text, img, rojo);
         this.router.navigate(["insurance"]);
        break;
      case 5:
        this.numero = 5;
        this.ocultar(id, text, img, rojo);
        /*this.router.navigate(["flights"]); */
        break;
      case 6:
        this.numero = 6;
        this.ocultar(id, text, img, rojo);
        /*   this.router.navigate(["flights"]); */
        break;
    }
  }

}
