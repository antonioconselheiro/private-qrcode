import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CryptService } from 'src/app/shared/crypt/crypt.service';

@Component({
  selector: 'app-decrypt-qrcode',
  templateUrl: './decrypt-qrcode.component.html',
  styleUrls: ['./decrypt-qrcode.component.scss']
})
export class DecryptQrcodeComponent implements OnInit {

  form!: FormGroup;
  encrypted?: string;

  constructor(
    private fb: FormBuilder,
    private cryptService: CryptService
  ) { }

  ngOnInit(): void {
    this.getEncryptedFromHistoryState();
    this.initForm();
  }

  private getEncryptedFromHistoryState(): void {
    this.encrypted = history.state.opened;
  }

  private initForm(): void {
    this.form = this.fb.group({  
      key: ['', [
        Validators.required.bind(this)
      ]]
    });
  }

  unlock(): void {
    if (this.form.valid && this.encrypted) {
      const raw = this.form.getRawValue();
      this.cryptService.decrypt(this.encrypted, raw.key);
    }
  }
}
