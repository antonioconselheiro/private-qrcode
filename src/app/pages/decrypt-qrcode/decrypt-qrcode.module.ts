import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecryptQrcodeComponent } from './decrypt-qrcode.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    DecryptQrcodeComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    DecryptQrcodeComponent
  ]
})
export class DecryptQrcodeModule { }
