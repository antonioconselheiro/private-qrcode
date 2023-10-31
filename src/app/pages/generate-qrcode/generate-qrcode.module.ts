import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerateQrcodeComponent } from './generate-qrcode.component';

@NgModule({
  declarations: [
    GenerateQrcodeComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GenerateQrcodeComponent
  ]
})
export class GenerateQrcodeModule { }
