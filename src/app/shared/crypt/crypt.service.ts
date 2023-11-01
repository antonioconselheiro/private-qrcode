import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptService {

  private readonly initializationVector = CryptoJS.enc.Hex.parse('c2fc131ce578976a2617fd14aef014eb');
  private readonly mode = CryptoJS.mode.CBC;
  private readonly padding = CryptoJS.pad.Pkcs7;

  encrypt(content: string, pin: string): string {
    return 'encrypted:aes;' + CryptoJS.AES.encrypt(content, String(pin), {
      iv: this.initializationVector,
      mode: this.mode,
      padding: this.padding
    });
  }

  decrypt(encrypted: string, pin: string): string {
    const decrypted = CryptoJS.AES.decrypt(encrypted, pin, {
      iv: this.initializationVector,
      mode: this.mode,
      padding: this.padding
    });

    return CryptoJS.enc.Utf8.stringify(decrypted);
  }
}
