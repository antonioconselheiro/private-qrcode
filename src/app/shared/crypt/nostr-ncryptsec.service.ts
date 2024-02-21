import { Injectable } from '@angular/core';
import * as nip49 from 'nostr-tools/lib/types/nip49';
import { nip19 } from 'nostr-tools';
import { hexToBytes } from '@noble/ciphers/utils';

@Injectable({
  providedIn: 'root'
})
export class NostrNcryptsecService {

  match(encrypted: string): boolean {
    return /^ncryptsec/.test(encrypted);
  }

  encrypt(nsec: string, password: string): string {
    return nip49.encrypt(hexToBytes(nip19.decode(nsec).data.toString()), password);
  }

  decrypt(encrypted: string, password: string): string {
    return nip19.nsecEncode(nip49.decrypt(encrypted, password));
  }
}
