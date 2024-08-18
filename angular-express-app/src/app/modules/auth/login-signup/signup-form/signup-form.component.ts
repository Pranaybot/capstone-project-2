import { Component, OnInit } from '@angular/core';
import { SignupHandler } from '../../../../shared/handlers/signup-handler';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SignupFormService } from '../../../../services/forms/signup-form.service';
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

  constructor(
    private signupHandler: SignupHandler,
    private signupFormService: SignupFormService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.signupFormService.createSignupForm();
  }
  
  signup() {
    if (this.signupForm.valid) {
      this.signupHandler.handleSignup(this.signupForm);
    } else {
      this.signupForm.markAllAsTouched();
      // Show validation error message
    }
  }
}
