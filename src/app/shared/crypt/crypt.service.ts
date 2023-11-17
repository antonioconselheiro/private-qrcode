import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptService {

  private readonly initializationVector = CryptoJS.enc.Hex.parse('c2fc131ce578976a2617fd14aef014eb');
  private readonly mode = CryptoJS.mode.CBC;
  private readonly padding = CryptoJS.pad.Pkcs7;

  encrypt(content: string, key: string): string {
    return `encrypted:aes?iv=${this.initializationVector};` + CryptoJS.AES.encrypt(content, String(key), {
      iv: this.initializationVector,
      mode: this.mode,
      padding: this.padding
    });
  }

  decrypt(encrypted: string, key: string): string {
    /**
     * TODO: quando for permitido customizar o iv ou houverem
     * outros apps utilizando o mesmo formato, então será urgente
     * ter a leitura do iv para decriptar e a leitura do modelo
     * de criptografia selecionado
     */
    encrypted = encrypted.replace(/^.+;/, '');
    const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
      iv: this.initializationVector,
      mode: this.mode,
      padding: this.padding
    });

    return CryptoJS.enc.Utf8.stringify(decrypted);
  }
}
