import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-js';
import Dexie from 'dexie';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  showHeader = true;
  showOverlay = false;
  passwordCrypto = 'serviceLogin#$';
  private db!: Dexie;

  constructor(private cookieService: CookieService) {
    this.createDatabase();
  }

  public createDatabase(): void {
    this.db = new Dexie('myDB');

    this.db.version(1).stores({
      myTable: 'id, myObject.myString'
    });

    this.db.open().catch(error => {
      console.error('Error al abrir la base de datos', error);
    });
  }

  public deleteDatabase(): Promise<void> {
    return this.db.delete();
  }

  public deleteValue(): Promise<void> {
    return this.db.table('myTable').delete(1);
  }

  public addObject(id: number, myString: string): Promise<any> {
    return this.db.table('myTable').put({id, myObject: {myString}});
  }

  public getObject(id: number): Promise<{id: number, myObject: {myString: string}}> {
    return this.db.table('myTable').get(id);
  }

  setData(key: string, value: any): void {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);
    this.cookieService.set(key, JSON.stringify(value), expirationDate, "null", "null", true, 'Strict');
  }

  clearAllCookies() {
    const cookies = document.cookie.split(";");
  
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
  }


  getData(key: string): any {
    const value = this.cookieService.get(key);
    return value !== '' ? JSON.parse(value) : null;
  }

  
  removeData(key: string): void {
    this.cookieService.delete(key);
  }

  mostrarSpinner(): void {
    this.showOverlay = true;
  }

  ocultarSpinner(): void {
    this.showOverlay = false;
  }


  mostrarEncabezado(): void {
    this.showHeader = true;
  }

  ocultarEncabezado(): void {
    this.showHeader = false;
  }

  encriptar(objeto: any): string {
    const objetoEncriptado = AES.encrypt(JSON.stringify(objeto), this.passwordCrypto).toString();
    return objetoEncriptado;
  }

  desencriptar(objetoEncriptado: string): any {
    let objetoDesencriptado = null;
    if (objetoEncriptado != ''){
      const bytes = AES.decrypt(objetoEncriptado, this.passwordCrypto);
      objetoDesencriptado = JSON.parse(bytes.toString(enc.Utf8));
    }
    
    return objetoDesencriptado;
  }
}


