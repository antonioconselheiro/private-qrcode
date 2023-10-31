import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-decrypt-qrcode',
  templateUrl: './decrypt-qrcode.component.html',
  styleUrls: ['./decrypt-qrcode.component.scss']
})
export class DecryptQrcodeComponent implements OnInit {

  encrypted?: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.encrypted = history.state.data;
    if (!this.encrypted) {
      this.router.navigate(['home']);
    }
  }
}
