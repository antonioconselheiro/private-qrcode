import { Component, OnInit } from '@angular/core';
import { toCanvas } from 'qrcode';
import { FileManagerService } from '../../shared/file-manager/file-manager.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-share-qrcode',
  templateUrl: './share-qrcode.component.html',
  styleUrls: ['./share-qrcode.component.scss']
})
export class ShareQrcodeComponent implements OnInit {

  src?: string;

  sharable = false;

  constructor(
    private fileExporterService: FileManagerService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.renderStateToCanvas();
    this.loadSharable();
  }

  loadSharable(): void {
    this.fileExporterService.isSharable().then(sharable => this.sharable = sharable);
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

  private generateFileName(): string {
    let fileName = `private qrcode.png`;
    if (history.state.title) {
      fileName = `private qrcode - ${history.state.title.replace(/[,<>:"/\\|?*]/g, '')} - ${new Date().getTime()}.png`;
    }

    return fileName;
  }

  async save(): Promise<void> {
    const src = this.src;
    if (!src) {
      return Promise.resolve();
    }

    await this.fileExporterService.save(src, this.generateFileName());
    this.toastrService.success('File saved.');

    return Promise.resolve();
  }

  async share(): Promise<void> {
    const src = this.src;
    if (!src) {
      return Promise.resolve();
    }

    return this.fileExporterService.share(src, this.generateFileName());
  }
}
