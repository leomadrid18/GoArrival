import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  showHeader = true;
  passwordCrypto = 'serviceLogin#$';
  private data: any;

  constructor() {}

  setData(data: string) {
    this.data = data;
  }

  getData(): string {
    return this.data;
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
    const bytes = AES.decrypt(objetoEncriptado, this.passwordCrypto);
    const objetoDesencriptado = JSON.parse(bytes.toString(enc.Utf8));
    return objetoDesencriptado;
  }
}