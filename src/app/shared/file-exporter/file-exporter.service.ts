import { Injectable } from '@angular/core';
import { Directory, Filesystem, FilesystemDirectory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

@Injectable()
export class FileExporterService {

  save(file: Blob, name: string): Promise<void> {
    if ('Capacitor' in window) {
      this.androidSave(file, name);
    } else {
      this.webSave(file, name);
    }

    return Promise.resolve();
  }

  share(file: Blob, title: string): Promise<void> {
    if ('Capacitor' in window) {
      return this.androidShare(file, title);
    } else {
      return this.webShare(file, title);
    }
  }

  private webSave(file: Blob, name: string): void {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    document.body.appendChild(a);

    a.href = url;
    a.download = name;
    a.click();
    
    URL.revokeObjectURL(url);
  }

  private async androidSave(file: Blob, name: string): Promise<void> {
    await Filesystem.writeFile({
      path: name,
      data: file,
      directory: Directory.Documents
    });

    return Promise.resolve();
  }

  private webShare(file: Blob, title: string): Promise<void> {
    return navigator.share({
      title,
      files: [
        new File([file], title, {
          type: file.type,
        })
      ]
    });
  }

  private async androidShare(file: Blob, title: string): Promise<void> {
    const result = await Filesystem.writeFile({
      path: title,
      data: file,
      directory: Directory.Cache
  });

    await Share.share({
      title,
      files: [result.uri]
    });

    return Promise.resolve();
  }

  async isSharable(): Promise<boolean> {
    if (!!navigator.share) {
      return Promise.resolve(true);
    }

    if ('Capacitor' in window && await Share.canShare()) {
      return Promise.resolve(true);
    }

    return Promise.resolve(false);
  }
}
