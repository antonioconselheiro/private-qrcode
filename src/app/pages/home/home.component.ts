import { Component } from '@angular/core';
import { Router } from '@angular/router';
import QrScanner from 'qr-scanner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
  constructor(
    private router: Router
  ) { }

  uploadPicture(): void {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.addEventListener('change', event => {
      const file = input.files && input.files[0] || null;

      if (file) {
        QrScanner
          .scanImage(file)
          .then(encrypted => this.router.navigate(['/open'], { state: { encrypted } }))
          .catch(e => console.error(e));
      }
    })
  }
}
