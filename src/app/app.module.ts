import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DecryptQrcodeModule } from './pages/decrypt-qrcode/decrypt-qrcode.module';
import { GenerateQrcodeModule } from './pages/generate-qrcode/generate-qrcode.module';
import { HomeModule } from './pages/home/home.module';
import { ScanQrcodeModule } from './pages/scan-qrcode/scan-qrcode.module';
import { CryptModule } from './shared/crypt/crypt.module';
import { ShareQrcodeModule } from './pages/share-qrcode/share-qrcode.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    DecryptQrcodeModule,
    GenerateQrcodeModule,
    ShareQrcodeModule,
    ScanQrcodeModule,
    CryptModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
