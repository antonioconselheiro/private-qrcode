import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DecryptService } from '../../shared/crypt/decrypt.service';

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
    private decryptService: DecryptService
  ) { }

  ngOnInit(): void {
    this.getEncryptedFromHistoryState();
    this.initForm();
  }

  private getEncryptedFromHistoryState(): void {
    this.encrypted = history.state.encrypted;
    if (!this.encrypted) {
      this.router
        .navigate(['/home'])
        .catch(e => console.error(e));
    }
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
        this.decryptService.decrypt(this.encrypted, raw.key)
          .then(opened => {
            this.router
              .navigate(['/opened'], { state: { opened } });
          })
          .catch(e => {
            console.error(e);
            this.invalidKey = true;
          });
      } catch (e) {
        console.error(e);
        this.invalidKey = true;
      }
    }
  }
}
