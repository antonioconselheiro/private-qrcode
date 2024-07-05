import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileManagerService } from './file-manager.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    FileManagerService
  ]
})
export class FileManagerModule { }
