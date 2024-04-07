import { Injectable } from '@angular/core';
import { EncryptedUriService } from './encrypted-uri.service';
import { CryptoJSService } from './crypto-js.service';
import { NostrNcryptsecService } from './nostr-ncryptsec.service';

@Injectable()
export class DecryptService {

  constructor(
    private encryptedUriService: EncryptedUriService,
    private cryptoJSService: CryptoJSService,
    private nostrNcryptsecService: NostrNcryptsecService
  ) { }

  async decrypt(encrypted: string, password: string): Promise<string> {
    if (this.cryptoJSService.match(encrypted)) {
      return Promise.resolve(
        this.cryptoJSService.decrypt(encrypted, password)
      );
    } else if (this.encryptedUriService.match(encrypted)) {
      return this.encryptedUriService.decrypt(encrypted, password);
    } else if (this.nostrNcryptsecService.match(encrypted)) {
      return Promise.resolve(
        this.nostrNcryptsecService.decrypt(encrypted, password)
      );
    } else {
      return Promise.reject(
        new Error('encryption serialization format not supported')
      );
    }
  }
}
