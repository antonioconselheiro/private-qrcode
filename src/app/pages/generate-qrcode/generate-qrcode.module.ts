import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerateQrcodeComponent } from './generate-qrcode.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { IconSettings } from 'angular-tabler-icons/icons';

@NgModule({
  declarations: [
    GenerateQrcodeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TablerIconsModule.pick({
      IconSettings
    }),
  ],
  exports: [
    GenerateQrcodeComponent
  ]
})
export class GenerateQrcodeModule { }
