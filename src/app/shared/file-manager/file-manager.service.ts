import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { base64 } from '@scure/base';

@Injectable()
export class FileManagerService {

  private base64ToBlob(base64File: string, type = 'image/png'): Blob {
    const binary = base64.decode(base64File);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary[i]);
    }
    return new Blob([new Uint8Array(array)], { type: type });
  }

  private blobToBase64(blobFile: Blob): Promise<string> {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = event => {
        const arrayBuffer = event.target?.result;
        if (!arrayBuffer) {
          return resolve('');
        }
  
        const uint8Array = new Uint8Array(arrayBuffer as ArrayBuffer);
        return resolve(`data:${blobFile.type || 'image/png'};base64,` + base64.encode(uint8Array));
      };
  
      reader.readAsArrayBuffer(blobFile);
    });
  }

  save(base64File: string, name: string): Promise<void> {
    if (Capacitor.getPlatform() === 'web') {
      this.webSave(this.base64ToBlob(base64File), name);
    } else {
      this.androidSave(base64File, name);
    }

    return Promise.resolve();
  }

  share(base64File: string, title: string): Promise<void> {
    if (Capacitor.getPlatform() === 'web') {
      return this.webShare(this.base64ToBlob(base64File), title);
    } else {
      return this.androidShare(base64File, title);
    }
  }

  async load(type = 'image/*'): Promise<string> {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', type);
    input.click();

    const file = await new Promise<File | null>(resolve => {
      input.addEventListener('change', () => {
        const file = input.files && input.files[0] || null;
        return resolve(file)
      });
    });

    if (!file) {
      return Promise.resolve('');
    }

    if (Capacitor.getPlatform() === 'web') {
      return this.webLoad(file);
    } else {
      return this.androidLoad(file);
    }
  }

  private webSave(base64File: Blob, name: string): void {
    const url = URL.createObjectURL(base64File);
    const a = document.createElement('a');
    document.body.appendChild(a);

    a.href = url;
    a.download = name;
    a.click();

    URL.revokeObjectURL(url);
  }

  private async androidSave(base64File: string, name: string): Promise<void> {
    await Filesystem.requestPermissions();
    await Filesystem.writeFile({
      path: name,
      data: base64File,
      directory: Directory.Documents
    });

    return Promise.resolve();
  }

  private webShare(base64File: Blob, title: string): Promise<void> {
    return navigator.share({
      title,
      files: [
        new File([base64File], title, {
          type: base64File.type,
        })
      ]
    });
  }

  private async androidShare(base64File: string, title: string): Promise<void> {
    await Filesystem.requestPermissions();
    const result = await Filesystem.writeFile({
      path: title,
      data: base64File,
      directory: Directory.Cache
    });

    await Share.share({
      title,
      files: [result.uri]
    });

    return Promise.resolve();
  }

  private webLoad(file: File): Promise<string> {
    return this.blobToBase64(file);
  }

  private async androidLoad(file: File): Promise<string> {
    await Filesystem.requestPermissions();
    const result = await Filesystem.readFile({
      path: file.webkitRelativePath
    });

    return Promise.resolve(result.data as string);
  }

  async isSharable(): Promise<boolean> {
    if (!!navigator.share) {
      return Promise.resolve(true);
    }

    const canShare = await Share.canShare();
    if ('Capacitor' in window && canShare.value) {
      return Promise.resolve(true);
    }

    return Promise.resolve(false);
  }
}
