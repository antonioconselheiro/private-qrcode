import { Injectable } from '@angular/core';
import { nip19 } from 'nostr-tools';
import * as nip49 from 'nostr-tools/nip49';

@Injectable({
  providedIn: 'root'
})
export class NostrNcryptsecService {

  match(encrypted: string): boolean {
    return /^ncryptsec/.test(encrypted);
  }

  encrypt(nsec: string, password: string): string {
    const decoded = nip19.decode(nsec);
    const bytes = decoded.data as Uint8Array; 

    return nip49.encrypt(bytes, password);
  }

  decrypt(encrypted: string, password: string): string {
    return nip19.nsecEncode(nip49.decrypt(encrypted, password));
  }
}
