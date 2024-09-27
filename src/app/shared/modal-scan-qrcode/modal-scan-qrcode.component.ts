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
    const choosenCameraId = (this.scanning as any)._preferredCamera;
    const index = cameras.findIndex(camera => camera.id === choosenCameraId);
    const nextIndex = index + 1;
    
    let nextCamera: QrScanner.Camera;
    if (cameras[nextIndex]) {
      nextCamera = cameras[nextIndex];
    } else {
      nextCamera = cameras[0];
    }

    localStorage.setItem('privateQRcodeChoosenCameraId', nextCamera.id);
    if (this.scanning) {
      this.scanning.setCamera(nextCamera.id);
    }
  }

  private async readQRCode(video: HTMLVideoElement): Promise<void> {
    this.stopScanning();

    this.scanning = new QrScanner(
      video, result => {
        this.response.next(result.data);
        this.close();
      }, {
        preferredCamera: 'environment'
      }
    );

    this.cameras = await QrScanner.listCameras();
    const userChoosenCam = this.chooseCam(this.cameras);

    if (userChoosenCam) {
      if ((this.scanning as any)._preferredCamera !== userChoosenCam) {
        await this.scanning.setCamera(userChoosenCam);
      }
    }

    await this.scanning.start();


    // must check again
    this.cameras = await QrScanner.listCameras();

    return Promise.resolve();
  }

  private chooseCam(cameras: QrScanner.Camera[]): QrScanner.DeviceId | null {
    const choosenCameraId = localStorage.getItem('privateQRcodeChoosenCameraId');
    if (choosenCameraId) {
      return choosenCameraId;
    }

    return null;
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
