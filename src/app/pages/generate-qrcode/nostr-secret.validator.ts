import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { nip19 } from "nostr-tools";

export class NostrSecretValidator {
  static getValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const config = group.get('config')?.value;
      const nsec = group.get('content')?.value;

      //  check nsec just if nostr credential is choose
      if (config !== 'nostrCredential') {
        return null;
      }

      //  I'm not the 'required' validator
      if (!nsec) {
        return null;
      }
  
      try {
        const { type } = nip19.decode(nsec);
  
        if (type === 'npub') {
          return {
            invalidNostrPublicGivenInstead: true
          }
        } else if (type === 'nsec') {
          return null;
        }
  
        return {
          invalidNostrSecret: true
        };
      } catch {
        return {
          invalidNostrSecret: true
        };
      }
    };
  }
}
