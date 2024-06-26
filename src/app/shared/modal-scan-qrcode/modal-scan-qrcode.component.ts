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
  cameras: QrScanner.Camera[] = [];

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

  flipCamera(): void {
    const cameras = this.cameras;
    const choosenCameraId = localStorage.getItem('privateQRcodeChoosenCameraId');
    const index = cameras.findIndex(camera => camera.id === choosenCameraId);
    const nextIndex = index + 1;
    
    let choosenCamera: QrScanner.Camera; 
    if (cameras[nextIndex]) {
      choosenCamera = cameras[nextIndex];
    } else {
      choosenCamera = cameras[0];
    }

    localStorage.setItem('privateQRcodeChoosenCameraId', choosenCamera.id);
    if (this.scanning) {
      this.scanning.setCamera(choosenCamera.id);
    }
  }

  private async readQRCode(video: HTMLVideoElement): Promise<void> {
    this.stopScanning();

    this.scanning = new QrScanner(
      video, result => {
        this.response.next(result.data);
        this.close();
      }, {}
    );

    this.cameras = await QrScanner.listCameras();
    await this.scanning.setCamera(this.chooseCam(this.cameras).id);
    await this.scanning.start();

    // must check again
    this.cameras = await QrScanner.listCameras();

    return Promise.resolve();
  }

  private chooseCam(cameras: QrScanner.Camera[]): QrScanner.Camera {
    if (cameras.length === 1) {
      return cameras[0];
    }

    const choosenCameraId = localStorage.getItem('privateQRcodeChoosenCameraId');
    if (choosenCameraId) {
      return { id: choosenCameraId } as QrScanner.Camera;
    }

    const backCamera = cameras.find(camera => /back/.test(camera.label)) || cameras[0];
    localStorage.setItem('privateQRcodeChoosenCameraId', backCamera.id);

    return backCamera;
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
