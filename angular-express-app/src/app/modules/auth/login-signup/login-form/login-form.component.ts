import { Component, OnInit } from '@angular/core';
import { LoginHandler } from '../../../../shared/handlers/login-handler';  // Import the SignupHandler class
import { ReactiveFormsModule, FormsBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private loginHandler: LoginHandler, // Inject LoginHandler
    private fb: FormBuilder) {}
  
  ngOnInit(): void {
    this.loginForm = 
      this.fb.group({
        username: ['',
          [Validators.required,
           Validators.email]],
        pwd: ['' , 
          Validators.required]
      });
  }

  login() {
    if (this.loginForm.valid) {
      this.loginHandler.handleLogin(this.loginForm); // Delegate login handling to LoginHandler
    }
  }
  
}

