import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareQrcodeComponent } from './share-qrcode.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ShareQrcodeComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ShareQrcodeModule { }
