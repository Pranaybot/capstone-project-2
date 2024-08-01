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
export class SignupFormComponent {
  
   signupData = {
    firstname: '',
    lastname: '',
    username: '',
    pwd: ''
  };

  constructor(
    private signupHandler: SignupHandler) {}

  signup() {
    this.signupHandler.handleSignup(this.signupData); // Delegate signup handling to SignupHandler
  }

}

