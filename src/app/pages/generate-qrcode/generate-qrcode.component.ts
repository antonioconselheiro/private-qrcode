import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CryptService } from '../../shared/crypt/crypt.service';

@Component({
  selector: 'app-generate-qrcode',
  templateUrl: './generate-qrcode.component.html',
  styleUrls: ['./generate-qrcode.component.scss']
})
export class GenerateQrcodeComponent implements OnInit {

  form!: FormGroup<{
    title: FormControl<string | null>;
    content: FormControl<string | null>;
    key: FormControl<string | null>;
  }>;

  submitted = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cryptService: CryptService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    const opened = history.state.opened;
    const currentState = opened ? String(opened) : '';

    this.form = this.fb.group({
      title: [''],

      content: [currentState, [
        Validators.required.bind(this)
      ]],
  
      key: ['', [
        Validators.required.bind(this)
      ]]
    }) as FormGroup;
  }

  getErrorFromField(fieldName: string, errorType = 'required'): boolean {
    if (!this.submitted) {
      return false;
    }

    const control = (this.form.controls as any)[fieldName];
    if (control && control.errors && control.errors[errorType]) {
      return true;
    }

    return false;
  }

  onSubmit(): void {
    this.submitted = true;

    if(this.form.valid){
      const raw = this.form.getRawValue();
      const encrypted = this.cryptService.encrypt(raw.content || '', raw.key || '');
      this.router.navigate(['/share'], { state: { encrypted, title: raw.title } });
    }
  }
}
