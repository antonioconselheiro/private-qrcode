import { Injectable } from '@angular/core';
import * as nip19 from 'nostr-tools/lib/esm/nip49';

@Injectable({
  providedIn: 'root'
})
export class NostrNcryptsecService {

  constructor() { }

  match(encrypted: string): boolean {
    return /^ncryptsec/.test(encrypted);
  }

  encrypt(nsec: string, password: string): string {
    return nip19.encrypt(new Uint8Array(), password);
  }

  decrypt(encrypted: string, password: string): string {
    return nip19.decrypt(encrypted, password);
  }
}
