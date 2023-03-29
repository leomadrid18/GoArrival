import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-js';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  showHeader = true;
  showOverlay = false;
  passwordCrypto = 'serviceLogin#$';
  private dataCache = new Map<string, BehaviorSubject<any>>();

  constructor() {}

  getData(key: string) {
    if (this.dataCache.has(key)) {
      return this.dataCache.get(key);
    }
    const dataSubject = new BehaviorSubject<any>(null);
    this.dataCache.set(key, dataSubject);
    return dataSubject;
  }

  setData(key: string, data: any) {
    if (this.dataCache.has(key)) {
      this.dataCache.get(key)?.next(data);
    }
    const dataSubject = new BehaviorSubject<any>(data);
    this.dataCache.set(key, dataSubject);
  }

  clearCache() {
    this.dataCache.clear();
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
    const bytes = AES.decrypt(objetoEncriptado, this.passwordCrypto);
    const objetoDesencriptado = JSON.parse(bytes.toString(enc.Utf8));
    return objetoDesencriptado;
  }
}