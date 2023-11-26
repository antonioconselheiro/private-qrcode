import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptService {

  private readonly mode = CryptoJS.mode.CBC;
  private readonly padding = CryptoJS.pad.Pkcs7;

  encrypt(content: string, key: string): string {
    const initializationVector = CryptoJS.enc.Hex.parse(
      CryptoJS.lib.WordArray.random(128/8).toString()
    );

    return `encrypted:aes?iv=${initializationVector};` + CryptoJS.AES.encrypt(content, String(key), {
      iv: initializationVector,
      mode: this.mode,
      padding: this.padding
    });
  }

  decrypt(encrypted: string, key: string): string {
    const parsed = this.parseEncryptedQrcode(encrypted);
    if (parsed.encrypted && parsed.type === 'aes') {
      const decrypted = CryptoJS.AES.decrypt(parsed.content, key, {
        iv: parsed.iv,
        mode: this.mode,
        padding: this.padding
      });
  
      return CryptoJS.enc.Utf8.stringify(decrypted);
    } else {
      return parsed.content;
    }
  }

  private parseEncryptedQrcode(encrypted: string): {
    encrypted: true;
    type: 'aes';
    iv: CryptoJS.lib.WordArray;
    content: string;
  } | {
    encrypted: false;
    content: string;
  } {
    //  pode achar feio meu parser, mas vou melhorar ele, não precisa sair perfeito de primeira
    if (/^encrypted:aes/.test(encrypted)) {
      const iv = encrypted.replace(/(^.*iv=|;.*$)/g, '');
      const content = encrypted.replace(/^.*;/, '');
      return { encrypted: true, type: 'aes', iv: CryptoJS.enc.Hex.parse(iv), content };
    } else {
      return { encrypted: false, content: encrypted };
    }
  }
}
