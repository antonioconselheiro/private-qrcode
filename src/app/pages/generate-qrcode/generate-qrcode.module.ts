import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerateQrcodeComponent } from './generate-qrcode.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { IconSettings } from 'angular-tabler-icons/icons';
import { AsyncModalModule } from '@belomonte/async-modal-ngx';

@NgModule({
  declarations: [
    GenerateQrcodeComponent
  ],
  imports: [
    CommonModule,
    AsyncModalModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    GenerateQrcodeComponent
  ]
})
export class GenerateQrcodeModule { }
