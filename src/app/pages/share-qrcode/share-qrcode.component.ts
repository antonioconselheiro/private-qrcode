import { Component, OnInit } from '@angular/core';
import { toCanvas } from 'qrcode';

@Component({
  selector: 'app-share-qrcode',
  templateUrl: './share-qrcode.component.html',
  styleUrls: ['./share-qrcode.component.scss']
})
export class ShareQrcodeComponent implements OnInit {

  src?: string;

  sharable = !!navigator.share;

  ngOnInit(): void {
    const encrypted = history.state.encrypted;
    const currentState = encrypted ? String(encrypted) : '';

    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', '500px');
    canvas.setAttribute('height', '500px');

    toCanvas(canvas, currentState, error => {
      if (error) {
        console.error(error);
        return;
      }

      setTimeout(() => this.src = canvas.toDataURL("image/png"));
    });
  }

  private async getQrcodeAsBlob(): Promise<Blob | null> {
    if (!this.src) {
      return Promise.resolve(null);
    }

    return fetch(this.src).then(res => res.blob());
  }

  async save(): Promise<void> {
    const blob = await this.getQrcodeAsBlob();
    if (!blob) {
      return Promise.resolve();
    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);

    a.href = url;
    a.download = 'private-qrcode.png';
    a.click();
    
    URL.revokeObjectURL(url);    
  }

  async share(): Promise<void> {
    const blob = await this.getQrcodeAsBlob();
    if (!blob) {
      return Promise.resolve();
    }

    return navigator.share({
      files: [<File> blob],
    });
  }
}
