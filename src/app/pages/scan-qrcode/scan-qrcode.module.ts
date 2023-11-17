import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScanQrcodeComponent } from './scan-qrcode.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ScanQrcodeComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ScanQrcodeComponent
  ]
})
export class ScanQrcodeModule { }
