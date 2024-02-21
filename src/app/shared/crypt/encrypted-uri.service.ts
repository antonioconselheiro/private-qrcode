import { Injectable } from '@angular/core';
import { EncryptedURI, TEncryptedURIKDFParams } from '@encrypted-uri/core';

@Injectable({
  providedIn: 'root'
})
export class EncryptedUriService {

  match(encrypted: string): boolean {
    return EncryptedURI.matcher(encrypted);
  }

  encrypt(
    content: string,
    password: string,
    config: { algorithm: string } & TEncryptedURIKDFParams
  ): Promise<string> {
    return EncryptedURI.encrypt({
      content,
      password,
      algorithm: config.algorithm,
      kdf: config
    });
  }

  decrypt(encrypted: string, password: string): Promise<string> {
    return EncryptedURI.decrypt(encrypted, password);
  }
}
