import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DecryptQrcodeModule } from './pages/decrypt-qrcode/decrypt-qrcode.module';
import { GenerateQrcodeModule } from './pages/generate-qrcode/generate-qrcode.module';
import { HomeModule } from './pages/home/home.module';
import { ScanQrcodeModule } from './pages/scan-qrcode/scan-qrcode.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DecryptQrcodeModule,
    GenerateQrcodeModule,
    HomeModule,
    ScanQrcodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
