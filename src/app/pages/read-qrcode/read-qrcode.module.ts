import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadQrcodeComponent } from './read-qrcode.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ReadQrcodeComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ReadQrcodeComponent
  ]
})
export class ReadQrcodeModule { }
