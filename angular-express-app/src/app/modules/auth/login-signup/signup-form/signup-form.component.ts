import { Component, OnInit } from '@angular/core';
import { SignupHandler } from '../../../../shared/handlers/signup-handler';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SignupFormService } from '../../../../services/signup-form.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {
  
  signupForm!: FormGroup;
  errorMessages: any = {};

  constructor(
    private signupHandler: SignupHandler,
    private signupFormService: SignupFormService) {}
    
  ngOnInit(): void {
    this.signupForm = this.signupFormService.createSignupForm();
  }
  
  signup() {
    if (this.signupForm.valid) {
      this.signupHandler.handleSignup(this.signupForm).subscribe({
        next: (response) => {
          // Handle successful signup
          console.log('Signup successful:', response);
          this.errorMessages = {}; // Clear any previous errors
        },
        error: (errorResponse) => {
          if (errorResponse.status === 400) {
            this.errorMessages = errorResponse.error.errors.reduce((acc: any, err: any) => {
              acc[err.param] = err.msg;
              return acc;
            }, {});
          }
        }
      });
    }
  }
}
