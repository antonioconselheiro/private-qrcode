import { Injectable } from '@angular/core';
import { ModalService } from '@belomonte/async-modal-ngx';
import { firstValueFrom } from 'rxjs';
import { ModalScanQrcodeComponent } from './modal-scan-qrcode.component';

@Injectable({
  providedIn: 'root'
})
export class ScanQrcodeService {

  constructor(
    private modalService: ModalService
  ) { }

  async scan(): Promise<string> {
    const result = await firstValueFrom(
      this.modalService
        .createModal(ModalScanQrcodeComponent)
        .build()
    );

    return Promise.resolve(result || '');
  }
}
