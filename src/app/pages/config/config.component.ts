import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalableDirective } from '@belomonte/async-modal-ngx';
import { Subject } from 'rxjs';
import { Config } from '../../domain/config.model';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent extends ModalableDirective<Config, Config> {

  response = new Subject<Config | void>();

  submitted = false;

  form = this.formBuilder.group({
    algorithm: ['aes/cbc', [
      Validators.required.bind(this)
    ]],
    kdfHasher: ['sha256', [
      Validators.required.bind(this)
    ]],
    kdfRounds: ['32', [
      Validators.required.bind(this)
    ]],
    saveConfig: [true]
  });

  constructor(
    private formBuilder: FormBuilder
  ) {
    super();
  }

  override onInjectData(data: Config): void {
    this.form.setValue({
      algorithm: data.algorithm,
      kdfHasher: data.kdfHasher,
      kdfRounds: data.kdfRounds,
      saveConfig: data.saveConfig
    });
  }

  getErrors(property: string, errorName: string): boolean {
    const controls: any = this.form.controls;
    return this.submitted &&
      controls[property]?.errors &&
      controls[property].errors[errorName] || false;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid) {
      const raw = this.form.getRawValue();
      this.response.next(raw);
      this.close();
    }
  }
}
