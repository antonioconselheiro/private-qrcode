import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileExporterService } from './file-exporter.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    FileExporterService
  ]
})
export class FileExporterModule { }
