import { Component, OnInit } from '@angular/core';
import { LoginHandler } from '../../../../shared/handlers/login-handler';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginFormService } from '../../../../services/login-form.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  
  loginForm!: FormGroup;
  errorMessages: any = {};

  constructor(
    private loginHandler: LoginHandler,
    private loginFormService: LoginFormService) {}
  
  ngOnInit(): void {
    this.loginForm = this.loginFormService.createLoginForm();
  }

  login() {
    if (this.loginForm.valid) {
      this.loginHandler.handleLogin(this.loginForm).subscribe({
        next: (response) => {
          // Handle successful login
          console.log('Login successful:', response);
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
