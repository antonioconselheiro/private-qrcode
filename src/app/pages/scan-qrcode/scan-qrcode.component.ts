import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import QrScanner from 'qr-scanner';

@Component({
  selector: 'app-scan-qrcode',
  templateUrl: './scan-qrcode.component.html',
  styleUrls: ['./scan-qrcode.component.scss']
})
export class ScanQrcodeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('video', { read: ElementRef })
  videoEl?: ElementRef<HTMLVideoElement>;
  scanning?: QrScanner;

  constructor(
    private router: Router
  ) { }

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
      video, result => {
        this.router.navigate([ 'open' ], {
          state: {
            data: result.data
          }
        });
      }, {});

    const cameras = await QrScanner.listCameras();
    await qrScanner.setCamera(cameras[0].id);
    await qrScanner.start();
    return Promise.resolve();
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
