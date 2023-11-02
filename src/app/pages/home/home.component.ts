import { Component } from '@angular/core';
import QrScanner from 'qr-scanner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  uploadPicture(): void {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.addEventListener('change', event => {
      debugger;
    })
    // QrScanner.scanImage(image);
  }
}
