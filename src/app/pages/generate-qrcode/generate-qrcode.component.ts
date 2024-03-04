import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalService } from '@belomonte/async-modal-ngx';
import { firstValueFrom } from 'rxjs';
import { EncryptedUriService } from '../../shared/crypt/encrypted-uri.service';
import { NostrNcryptsecService } from '../../shared/crypt/nostr-ncryptsec.service';
import { ConfigComponent } from '../config/config.component';
import { Config } from '../config/config.type';
import { ConfirmKeyValidator } from './confirm-key.validator';
import { NostrSecretValidator } from './nostr-secret.validator';

@Component({
  selector: 'app-generate-qrcode',
  templateUrl: './generate-qrcode.component.html',
  styleUrls: ['./generate-qrcode.component.scss']
})
export class GenerateQrcodeComponent implements OnInit {

  readonly defaultConfigs: Config = {
    algorithm: 'aes/cbc',
    kdfHasher: 'sha256',
    kdfRounds: '32'
  };

  config: Config | null = this.defaultConfigs;

  form!: FormGroup;

  submitted = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private modalService: ModalService,
    private encryptedUriService: EncryptedUriService,
    private nostrNcryptsecService: NostrNcryptsecService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    const opened = history.state.opened;
    const currentState = opened ? String(opened) : '';

    this.form = this.fb.group({
      title: [''],

      config: [ 'default' ],

      content: [currentState, [
        Validators.required.bind(this)
      ]],

      key: ['', [
        Validators.required.bind(this)
      ]],

      confirmKey: ['', [
        Validators.required.bind(this)
      ]]
    });

    this.form.addValidators(ConfirmKeyValidator.getValidator());
    this.form.addValidators(NostrSecretValidator.getValidator());
  }

  customizeConfigs(): void {
    firstValueFrom(
      this.modalService
        .createModal(ConfigComponent)
        .setData(this.config || this.defaultConfigs)
        .setBindToRoute(this.router)
        .build()
    )
    .then(config => {
      if (config) {
        this.config = config;
      }
    });
  }

  getErrorFromForm(errorType: string): boolean {
    if (!this.submitted) {
      return false;
    }

    return !!(this.form.errors && this.form.errors[errorType]);
  }

   getErrorFromField(fieldName: string, errorType = 'required'): boolean {
    if (!this.submitted) {
      return false;
    }

    const control = this.form.controls[fieldName];
    if (control && control.errors && control.errors[errorType]) {
      return true;
    }

    return false;
  }

  encrypt(content: string, password: string): Promise<string> {
    if (this.config) {
      return this.encryptedUriService.encrypt(content, password, this.config);
    } else {
      const result = this.nostrNcryptsecService.encrypt(content, password);
      return Promise.resolve(result);
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.valid) {
      const raw = this.form.getRawValue();
      const encrypted = this.encrypt(raw.content, raw.password);
      this.router.navigate(['/share'], {
        state: {
          encrypted,
          title: raw.title
        }
      });
    }
  }
}
