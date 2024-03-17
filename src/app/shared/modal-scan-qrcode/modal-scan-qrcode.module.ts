import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalScanQrcodeComponent } from './modal-scan-qrcode.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ModalScanQrcodeComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ModalScanQrcodeComponent
  ]
})
export class ModalScanQrcodeModule { }
