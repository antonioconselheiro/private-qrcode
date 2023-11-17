import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecryptQrcodeComponent } from './decrypt-qrcode.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DecryptQrcodeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    DecryptQrcodeComponent
  ]
})
export class DecryptQrcodeModule { }
