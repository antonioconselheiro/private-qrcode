import { Component, OnInit } from '@angular/core';
import { toCanvas } from 'qrcode';
import { FileExporterService } from '../../shared/file-exporter/file-exporter.service';

@Component({
  selector: 'app-share-qrcode',
  templateUrl: './share-qrcode.component.html',
  styleUrls: ['./share-qrcode.component.scss']
})
export class ShareQrcodeComponent implements OnInit {

  src?: string;

  constructor(
    private fileExporterService: FileExporterService
  ) { }

  ngOnInit(): void {
    this.renderStateToCanvas();
  }

  private renderStateToCanvas(): void {
    const encrypted = history.state.encrypted;
    //  TODO: include in canvas image
    const title = history.state.title;
    const currentState = encrypted ? String(encrypted) : '';
    const canvas = document.createElement('canvas');

    if (title) {
      canvas.setAttribute('height', '750px');
      canvas.setAttribute('width', '500px');
    } else {
      canvas.setAttribute('height', '500px');
      canvas.setAttribute('width', '500px');
    }

    toCanvas(canvas, currentState, { margin: 5 }, error => {
      if (error) {
        console.error(error);
        return;
      }

      const ctx = canvas.getContext('2d');
      if (ctx && title) {
        ctx.fillStyle = '#000';
        ctx.font = '15px "Segoe UI", Roboto, "Noto Sans", Helvetica, Arial, sans-serif';
        ctx.fillText(title, 17, 15); 
      }

      setTimeout(() => this.src = canvas.toDataURL("image/png"));
    });
  }

  isSharable(): Promise<boolean> {
    return this.fileExporterService.isSharable();
  }

  private async getQrcodeAsBlob(): Promise<Blob | null> {
    if (!this.src) {
      return Promise.resolve(null);
    }

    return fetch(this.src).then(res => res.blob());
  }

  private getFileName(): string {
    let fileName = `private qrcode.png`;
    if (history.state.title) {
      fileName = `private qrcode - ${history.state.title.replace(/[,<>:"/\\|?*]/g, '')}.png`;
    }

    return fileName;
  }

  async save(): Promise<void> {
    const blob = await this.getQrcodeAsBlob();
    if (!blob) {
      return Promise.resolve();
    }

    return this.fileExporterService.save(blob, this.getFileName());
  }

  async share(): Promise<void> {
    const blob = await this.getQrcodeAsBlob();
    if (!blob) {
      return Promise.resolve();
    }

    return this.fileExporterService.share(blob, this.getFileName());
  }
}
