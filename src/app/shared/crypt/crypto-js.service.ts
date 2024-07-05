import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoJSService {

  private readonly mode = CryptoJS.mode.CBC;
  private readonly padding = CryptoJS.pad.Pkcs7;

  match(encrypted: string): boolean {
    return /^encrypted:aes\?iv=/.test(encrypted);
  }

  encrypt(content: string, password: string): string {
    const initializationVector = CryptoJS.enc.Hex.parse(
      CryptoJS.lib.WordArray.random(128/8).toString()
    );

    return `encrypted:aes?iv=${initializationVector};` + CryptoJS.AES.encrypt(content, String(password), {
      iv: initializationVector,
      mode: this.mode,
      padding: this.padding
    });
  }

  decrypt(encrypted: string, password: string): string {
    const parsed = this.parseEncryptedQrcode(encrypted);
    if (parsed.encrypted && parsed.type === 'aes') {
      const decrypted = CryptoJS.AES.decrypt(parsed.content, password, {
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
    if (this.match(encrypted)) {
      const iv = encrypted.replace(/(^.*iv=|;.*$)/g, '');
      const content = encrypted.replace(/^.*;/, '');
      return { encrypted: true, type: 'aes', iv: CryptoJS.enc.Hex.parse(iv), content };
    } else {
      return { encrypted: false, content: encrypted };
    }
  }
}
