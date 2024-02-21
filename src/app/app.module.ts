import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GenerateQrcodeModule } from './pages/generate-qrcode/generate-qrcode.module';
import { HomeModule } from './pages/home/home.module';
import { ScanQrcodeModule } from './pages/scan-qrcode/scan-qrcode.module';
import { ShareQrcodeModule } from './pages/share-qrcode/share-qrcode.module';
import { CryptoJSModule } from './shared/crypt/crypt.module';
import { ConfigModule } from './pages/config/config.module';
import { DecryptedContentModule } from './pages/decrypted-content/decrypted-content.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    ConfigModule,
    GenerateQrcodeModule,
    ShareQrcodeModule,
    ScanQrcodeModule,
    CryptoJSModule,
    DecryptedContentModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
