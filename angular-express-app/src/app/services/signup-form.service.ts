import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SignupFormService {
  constructor(private fb: FormBuilder) {}

  createSignupForm(): FormGroup {
    return this.fb.group({
      firstName: ['',
        Validators.required],
      lastName: ['',
        Validators.required],
      username: ['', 
        [Validators.required,
         Validators.email]],
      pwd: ['',
        Validators.required]
    });
  }
}
