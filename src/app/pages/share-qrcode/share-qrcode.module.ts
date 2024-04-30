import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareQrcodeComponent } from './share-qrcode.component';
import { RouterModule } from '@angular/router';
import { FileManagerModule } from '../../shared/file-manager/file-manager.module';

@NgModule({
  declarations: [
    ShareQrcodeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FileManagerModule
  ],
  exports: [
    ShareQrcodeComponent
  ]
})
export class ShareQrcodeModule { }
