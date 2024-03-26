import { Injectable } from '@angular/core';
import { ModalService } from '@belomonte/async-modal-ngx';
import { ModalScanQrcodeComponent } from './modal-scan-qrcode.component';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScanQrcodeService {

  constructor(
    private modalService: ModalService
  ) { }

  scan(): Promise<string> {
    if ('cordova' in window) {
      return this.openCordovaQrcodeScanner();
    } else {
      return this.openWebQrcodeScanner();
    }
  }

  private openCordovaQrcodeScanner(): Promise<string> {
    return new Promise((resolve, reject) => {
      QRScanner.scan((err, text) => {
        if (err) {
          reject(err);
        } else {
          resolve(text);
        }
      });
  
      QRScanner.show();
    })
  }

  private async openWebQrcodeScanner(): Promise<string> {
    const result = await firstValueFrom(
      this.modalService
        .createModal(ModalScanQrcodeComponent)
        .build()
    );

    return Promise.resolve(result || '');
  }
}
