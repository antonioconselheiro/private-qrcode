import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalService } from '@belomonte/async-modal-ngx';
import { firstValueFrom } from 'rxjs';
import { EncryptedUriService } from '../../shared/crypt/encrypted-uri.service';
import { NostrNcryptsecService } from '../../shared/crypt/nostr-ncryptsec.service';
import { ConfigComponent } from '../config/config.component';
import { Config } from '../../domain/config.model';
import { ConfirmKeyValidator } from './confirm-key.validator';
import { NostrSecretValidator } from './nostr-secret.validator';

@Component({
  selector: 'app-generate-qrcode',
  templateUrl: './generate-qrcode.component.html',
  styleUrls: ['./generate-qrcode.component.scss']
})
export class GenerateQrcodeComponent implements OnInit {

  defaultConfigs: Config = {
    algorithm: 'aes/cbc',
    kdfHasher: 'sha256',
    kdfRounds: '32',
    saveConfig: true
  };

  config: Config | null = null;

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
    this.defaultConfigs = this.loadDefaultConfig();
    this.initForm();
  }

  getChoosenConfig(): Config | null {
    const config = this.form.getRawValue();
    console.info('config: ', config);
    if (config.config === 'default') {
      return this.defaultConfigs;
    } else if (config.config === 'customized') {
      return this.config || this.defaultConfigs;
    }

    return null;
  }

  private loadDefaultConfig(): Config {
    const serialized = localStorage.getItem('private-qrcode-config');
    if (serialized) {
      try {
        return JSON.parse(serialized);
      } catch {
      }
    }

    return {
      algorithm: 'aes/cbc',
      kdfHasher: 'sha256',
      kdfRounds: '32',
      saveConfig: true
    }
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
        .setData(this.config || this.getSavedConfigs())
        .setBindToRoute(this.router)
        .build()
    )
    .then(config => {
      if (config) {
        this.config = config;
      }
    });
  }

  getSavedConfigs(): Config {
    const serialized = localStorage.getItem('private-qrcode-config');
    if (serialized) {
      try {
        return JSON.parse(serialized);
      } catch {
      }
    }

    return this.defaultConfigs;
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

  encrypt(content: string, password: string, config: string): Promise<string> {

    if (config === 'customized' && this.config) {
      return this.encryptedUriService.encrypt(content, password, this.config);
    } else if (config === 'nostrCredential') {
      const result = this.nostrNcryptsecService.encrypt(content, password);      
      return Promise.resolve(result);
    } else {
      return this.encryptedUriService.encrypt(content, password, this.defaultConfigs);
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.valid) {
      const raw = this.form.getRawValue();
      const encrypted = this.encrypt(raw.content, raw.password, raw.config);
      this.router.navigate(['/share'], {
        state: {
          encrypted,
          title: raw.title
        }
      });
    }
  }
}
