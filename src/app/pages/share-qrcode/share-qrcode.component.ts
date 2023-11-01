import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { toCanvas } from 'qrcode';

@Component({
  selector: 'app-share-qrcode',
  templateUrl: './share-qrcode.component.html',
  styleUrls: ['./share-qrcode.component.scss']
})
export class ShareQrcodeComponent implements OnInit {

  src?: string;

  ngOnInit(): void {
    const encrypted = history.state.encrypted;
    const currentState = encrypted ? String(encrypted) : '';

    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', '250px');
    canvas.setAttribute('height', '250px');

    toCanvas(canvas, currentState, error => {
      if (error) {
        console.error(error);
        return;
      }

      setTimeout(() => this.src = canvas.toDataURL("image/png"));
    })
  }
}
