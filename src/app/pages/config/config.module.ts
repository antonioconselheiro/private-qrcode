import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfigComponent } from './config.component';

@NgModule({
  declarations: [
    ConfigComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ConfigComponent
  ]
})
export class ConfigModule { }
