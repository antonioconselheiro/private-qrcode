import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ModalableDirective } from '@belomonte/async-modal-ngx';
import QrScanner from 'qr-scanner';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal-scan-qrcode',
  templateUrl: './modal-scan-qrcode.component.html',
  styleUrls: ['./modal-scan-qrcode.component.scss']
})
export class ModalScanQrcodeComponent
  extends ModalableDirective<void, string>
  implements AfterViewInit, OnDestroy {

  @ViewChild('video', { read: ElementRef })
  videoEl?: ElementRef<HTMLVideoElement>;

  scanning?: QrScanner;

  response = new Subject<string | void>();

  ngAfterViewInit(): void {
    if (this.videoEl && this.videoEl.nativeElement) {
      this.readQRCode(this.videoEl.nativeElement);
    }
  }

  ngOnDestroy(): void {
    if (this.videoEl && this.videoEl.nativeElement) {
      this.stopStreaming(this.videoEl.nativeElement);
    }

    this.stopScanning();
  }

  private async readQRCode(video: HTMLVideoElement): Promise<void> {
    const qrScanner = new QrScanner(
      video, result => this.response.next(result.data), {}
    );

    const cameras = await QrScanner.listCameras();
    await qrScanner.setCamera(this.chooseCam(cameras).id);
    await qrScanner.start();
    return Promise.resolve();
  }

  private chooseCam(cameras: Array<QrScanner.Camera>): QrScanner.Camera {
    if (cameras.length === 1) {
      return cameras[0];
    }

    return cameras.find(camera => /back/.test(camera.label)) || cameras[0];
  }

  private stopScanning(): void {
    if (this.scanning) {
      this.scanning.stop();
      this.scanning.destroy();
    }
  }

  private stopStreaming(video: HTMLVideoElement | undefined): void {
    if (video) {
      const stream = video.srcObject as MediaStream | null;
      if (stream instanceof MediaStream) {
        stream.getTracks().forEach(track => track.stop());
      }
    }
  }
}
