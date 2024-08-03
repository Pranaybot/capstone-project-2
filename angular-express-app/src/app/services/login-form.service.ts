
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LoginFormService {
  constructor(private fb: FormBuilder) {}

  createLoginForm(): FormGroup {
    return this.fb.group({
      username: ['', 
        [Validators.required,
         Validators.email]],
      pwd: ['',
        Validators.required]
    });
  }
}

