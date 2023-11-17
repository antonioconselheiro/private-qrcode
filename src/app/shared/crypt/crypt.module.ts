import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptService } from './crypt.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    CryptService
  ]
})
export class CryptModule { }
