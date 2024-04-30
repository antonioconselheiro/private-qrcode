import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DecryptQrcodeComponent } from './pages/decrypt-qrcode/decrypt-qrcode.component';
import { DecryptedContentComponent } from './pages/decrypted-content/decrypted-content.component';
import { GenerateQrcodeComponent } from './pages/generate-qrcode/generate-qrcode.component';
import { HomeComponent } from './pages/home/home.component';
import { ShareQrcodeComponent } from './pages/share-qrcode/share-qrcode.component';

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
    path: 'open',
    component: DecryptQrcodeComponent
  },

  {
    path: 'opened',
    component: DecryptedContentComponent
  },

  {
    path: 'share',
    component: ShareQrcodeComponent
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
