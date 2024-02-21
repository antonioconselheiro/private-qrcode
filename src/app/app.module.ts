import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DecryptQrcodeModule } from './pages/decrypt-qrcode/decrypt-qrcode.module';
import { GenerateQrcodeModule } from './pages/generate-qrcode/generate-qrcode.module';
import { HomeModule } from './pages/home/home.module';
import { ScanQrcodeModule } from './pages/scan-qrcode/scan-qrcode.module';
import { CryptoJSModule } from './shared/crypt/crypt.module';
import { ShareQrcodeModule } from './pages/share-qrcode/share-qrcode.module';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    DecryptQrcodeModule,
    GenerateQrcodeModule,
    ShareQrcodeModule,
    ScanQrcodeModule,
    CryptoJSModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
