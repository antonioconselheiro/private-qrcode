import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CryptoJSService } from '../../shared/crypt/crypto-js.service';

@Component({
  selector: 'app-decrypt-qrcode',
  templateUrl: './decrypt-qrcode.component.html',
  styleUrls: ['./decrypt-qrcode.component.scss']
})
export class DecryptQrcodeComponent implements OnInit {

  form!: FormGroup;
  encrypted?: string;
  invalidKey = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cryptoJSService: CryptoJSService
  ) { }

  ngOnInit(): void {
    this.getEncryptedFromHistoryState();
    this.initForm();
  }

  private getEncryptedFromHistoryState(): void {
    this.encrypted = history.state.encrypted;
  }

  private initForm(): void {
    this.invalidKey = false;
    this.form = this.fb.group({  
      key: ['', [
        Validators.required.bind(this)
      ]]
    });
  }

  unlock(): void {
    if (this.form.valid && this.encrypted) {
      try {
        const raw = this.form.getRawValue();
        const opened = this.cryptoJSService.decrypt(this.encrypted, raw.key);
  
        this.router
          .navigate(['/generate'], { state: { opened } })
          .catch(e => console.error(e));
      } catch (e) {
        this.invalidKey = true;
      }
    }
  }
}
