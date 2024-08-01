import { Component, OnInit } from '@angular/core';
import { SignupHandler } from '../../../../shared/handlers/signup-handler';  // Import the SignupHandler class
import { ReactiveFormsModule, FormsBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.scss'
})
export class SignupFormComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private signupHandler: SignupHandler,
    private fb: FormBuilder) {}
  
  ngOnInit(): void {
    this.signupForm = 
      this.fb.group({
        firstname: ['',
          Validators.required],
        lastname: ['',
          Validators.required],
        username: ['',
          [Validators.required,
           Validators.email]],
        pwd: ['' , 
          Validators.required]
      });
  }

  signup() {
    if (this.signupForm.valid) {
      this.signupHandler.handleSignup(this.signupData); // Delegate signup handling to SignupHandler
    }
  }

}

