import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalService } from '@belomonte/async-modal-ngx';
import { CryptoJSService } from '../../shared/crypt/crypto-js.service';
import { ConfigComponent } from '../config/config.component';
import { ConfirmKeyValidator } from './confirm-key.validator';
import { firstValueFrom } from 'rxjs';
import { Config } from '../config/config.type';
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
    private cryptoJSService: CryptoJSService
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

  onSubmit(): void {
    this.submitted = true;

    if (this.form.valid) {
      const raw = this.form.getRawValue();
      const encrypted = this.cryptoJSService.encrypt(raw.content || '', raw.key || '');
      this.router.navigate(['/share'], {
        state: {
          encrypted,
          title: raw.title
        }
      });
    }
  }
}
