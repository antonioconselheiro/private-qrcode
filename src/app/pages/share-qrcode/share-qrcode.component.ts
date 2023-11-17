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
        ctx.fillText(title, 17, 10); 
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
      files: [
        new File([blob], 'image.png', {
          type: blob.type,
        })
      ],
      title: 'private qrcode'
    });
  }
}
