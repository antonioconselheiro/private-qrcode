import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-decrypted-content',
  templateUrl: './decrypted-content.component.html',
  styleUrls: ['./decrypted-content.component.scss']
})
export class DecryptedContentComponent implements OnInit {

  currentState = '';

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    const opened = history.state.opened;
    this.currentState = opened ? String(opened) : '';
  }

  close(): void {
    this.router.navigate(['/home']);
  }
}
