import { Component, OnInit } from '@angular/core';
import { SignupHandler } from '../../../../shared/handlers/signup-handler';  // Import the SignupHandler class
import { ReactiveFormsModule } from '@angular/forms';
import { SignupFormService } from '../../../../../services/signup-form.service.ts';

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
    private signupFormService: SignupFormService) {}
  
  ngOnInit(): void {
    this.signupForm = 
      this.signupFormService.createSignupForm();
  }

  signup() {
    if (this.signupForm.valid) {
      this.signupHandler.handleSignup(this.signupForm); // Delegate signup handling to SignupHandler
    }
  }

}

