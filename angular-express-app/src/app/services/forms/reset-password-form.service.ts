import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordFormService { 
  constructor(private fb: FormBuilder) {}

  createResetPasswordForm(): FormGroup {
    return this.fb.group({
      username: ['', 
        [Validators.required,
         Validators.email]],
      old_pwd: ['',
        [Validators.required,
        Validators.minLength(8)]],
      new_pwd: ['',
        [Validators.required,
        Validators.minLength(8)]],
      new_pwd_match: ['',
        [Validators.required,
        Validators.minLength(8)]
      ]
    });
  }
}
