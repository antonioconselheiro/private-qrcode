import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GenerateQrcodeModule } from './pages/generate-qrcode/generate-qrcode.module';
import { HomeModule } from './pages/home/home.module';
import { ScanQrcodeModule } from './pages/scan-qrcode/scan-qrcode.module';
import { ShareQrcodeModule } from './pages/share-qrcode/share-qrcode.module';
import { CryptoJSModule } from './shared/crypt/crypt.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    GenerateQrcodeModule,
    ShareQrcodeModule,
    ScanQrcodeModule,
    CryptoJSModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
