import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-decrypted-content',
  templateUrl: './decrypted-content.component.html',
  styleUrls: ['./decrypted-content.component.scss']
})
export class DecryptedContentComponent implements OnInit {

  currentState = '';

  ngOnInit(): void {
    const opened = history.state.opened;
    this.currentState = opened ? String(opened) : '';
  }
}
