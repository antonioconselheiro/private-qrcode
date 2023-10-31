import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerateQrcodeComponent } from './pages/generate-qrcode/generate-qrcode.component';
import { ScanQrcodeComponent } from './pages/scan-qrcode/scan-qrcode.component';
import { DecryptQrcodeComponent } from './pages/decrypt-qrcode/decrypt-qrcode.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },

  {
    path: 'generate',
    component: GenerateQrcodeComponent
  },

  {
    path: 'read',
    component: ScanQrcodeComponent
  },

  {
    path: 'open',
    component: DecryptQrcodeComponent
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
