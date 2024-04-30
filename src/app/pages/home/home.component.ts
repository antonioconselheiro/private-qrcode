import { Component } from '@angular/core';
import { Router } from '@angular/router';
import QrScanner from 'qr-scanner';
import packageJson from 'package.json';
import { ScanQrcodeService } from '../../shared/modal-scan-qrcode/scan-qrcode.service';
import { FileManagerService } from '../../shared/file-manager/file-manager.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
  constructor(
    private router: Router,
    private fileManagerService: FileManagerService,
    private scanQrcodeService: ScanQrcodeService
  ) { }

  protected appVersion: string = packageJson.version;

  uploadPicture(): void {
    this.fileManagerService
      .load()
      .then(base64File => {
        debugger;
        QrScanner
          .scanImage(base64File, {})
          .then(encrypted => this.router.navigate(['/open'], {
            state: { encrypted }
          }))
          .catch(e => console.error(e));
      }).catch(e => console.error(e));
  }

  openQrcodeScanner(): void {
    this.scanQrcodeService
      .scan()
      .then(encrypted => this.router.navigate(['/open'], {
        state: { encrypted }
      }))
      .catch(err => console.error(err));
  }
}
