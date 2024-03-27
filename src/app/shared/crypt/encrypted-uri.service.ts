import { Injectable } from '@angular/core';
import { EncryptedURI } from '@encrypted-uri/core';
import { Config } from '../../domain/config.model';

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
    config: Config
  ): Promise<string> {
    return EncryptedURI.encrypt({
      content,
      password,
      algorithm: config.algorithm || 'aes/cbc',
      kdf: {
        derivateKeyLength: 32,
        kdf: 'pbkdf2',
        hasher: config.kdfHasher || 'sha256',
        rounds: Number(config.kdfRounds || '32')
      }
    });
  }

  decrypt(encrypted: string, password: string): Promise<string> {
    return EncryptedURI.decrypt(encrypted, password);
  }
}
