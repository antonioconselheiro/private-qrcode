import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GenerateQrcodeModule } from './pages/generate-qrcode/generate-qrcode.module';
import { HomeModule } from './pages/home/home.module';
import { ModalScanQrcodeModule } from './shared/modal-scan-qrcode/modal-scan-qrcode.module';
import { ShareQrcodeModule } from './pages/share-qrcode/share-qrcode.module';
import { CryptoJSModule } from './shared/crypt/crypt.module';
import { ConfigModule } from './pages/config/config.module';
import { DecryptedContentModule } from './pages/decrypted-content/decrypted-content.module';
import { DecryptQrcodeModule } from './pages/decrypt-qrcode/decrypt-qrcode.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

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
    ModalScanQrcodeModule,
    CryptoJSModule,
    DecryptQrcodeModule,
    DecryptedContentModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
