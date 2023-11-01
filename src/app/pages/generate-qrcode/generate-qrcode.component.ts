import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CryptService } from '../../shared/crypt/crypt.service';

@Component({
  selector: 'app-generate-qrcode',
  templateUrl: './generate-qrcode.component.html',
  styleUrls: ['./generate-qrcode.component.scss']
})
export class GenerateQrcodeComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cryptService: CryptService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    const opened = history.state.opened;
    const currentState = opened ? String(opened) : '';

    this.form = this.fb.group({
      content: [currentState, [
        Validators.required.bind(this)
      ]],
  
      key: ['', [
        Validators.required.bind(this)
      ]]
    });
  }

  onSubmit(): void {
    const raw = this.form.getRawValue();
    const encrypted = this.cryptService.encrypt(raw.content, raw.key);
    this.router.navigate(['/share'], { state: { encrypted } });
  }
}
