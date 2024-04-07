import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoJSService } from './crypto-js.service';
import { EncryptedUriService } from './encrypted-uri.service';
import { NostrNcryptsecService } from './nostr-ncryptsec.service';
import { DecryptService } from './decrypt.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    CryptoJSService,
    EncryptedUriService,
    NostrNcryptsecService,
    DecryptService
  ]
})
export class CryptoJSModule { }
