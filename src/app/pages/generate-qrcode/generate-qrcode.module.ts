import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerateQrcodeComponent } from './generate-qrcode.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    GenerateQrcodeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    GenerateQrcodeComponent
  ]
})
export class GenerateQrcodeModule { }
