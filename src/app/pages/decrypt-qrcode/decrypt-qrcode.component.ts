import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private router: Router,
    private cryptService: CryptService
  ) { }

  ngOnInit(): void {
    this.getEncryptedFromHistoryState();
    this.initForm();
  }

  private getEncryptedFromHistoryState(): void {
    this.encrypted = history.state.encrypted;
  }

  private initForm(): void {
    this.form = this.fb.group({  
      key: ['', [
        Validators.required.bind(this)
      ]]
    });
  }

  unlock(): void {
    debugger;
    if (this.form.valid && this.encrypted) {
      const raw = this.form.getRawValue();
      const opened = this.cryptService.decrypt(this.encrypted, raw.key);

      this.router.navigate(['/generate'], { state: { opened } });
    }
  }
}
