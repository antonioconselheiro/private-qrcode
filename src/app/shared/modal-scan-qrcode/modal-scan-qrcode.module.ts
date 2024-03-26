import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalScanQrcodeComponent } from './modal-scan-qrcode.component';
import { ScanQrcodeService } from './scan-qrcode.service';
import { RouterModule } from '@angular/router';
import { AsyncModalModule } from '@belomonte/async-modal-ngx';

@NgModule({
  declarations: [
    ModalScanQrcodeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AsyncModalModule
  ],
  exports: [
    ModalScanQrcodeComponent
  ],
  providers: [
    ScanQrcodeService
  ]
})
export class ModalScanQrcodeModule { }
