import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent {

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
    ]]
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

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

    }
  }
}
