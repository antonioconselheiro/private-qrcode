import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerateQrcodeComponent } from './pages/generate-qrcode/generate-qrcode.component';
import { ReadQrcodeComponent } from './pages/read-qrcode/read-qrcode.component';
import { DecryptQrcodeComponent } from './pages/decrypt-qrcode/decrypt-qrcode.component';

const routes: Routes = [
  {
    path: 'home',
    component: GenerateQrcodeComponent
  },

  {
    path: 'read',
    component: ReadQrcodeComponent
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
