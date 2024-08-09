import { Component, OnInit } from '@angular/core';
import { LoginHandler } from '../../../../shared/handlers/login-handler';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginFormService } from '../../../../services/login-form.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(
    private loginHandler: LoginHandler,
    private loginFormService: LoginFormService,
    private snackBar: MatSnackBar) {}
  
  ngOnInit(): void {
    this.loginForm = this.loginFormService.createLoginForm();
  }

  login() {
    if (this.loginForm.valid) {
      this.loginHandler.handleLogin(this.loginForm).subscribe({
        next: (response) => {
          // Handle successful login
          this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
        },
        error: (errorResponse) => {
          if (errorResponse.status === 400) {
            this.snackBar.open('Signup failed: ' + errorResponse.error.message, 'Close', { duration: 5000 });
          } else {
            this.snackBar.open('An unexpected error occurred. Please try again.', 'Close', { duration: 5000 });
          }
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
      this.snackBar.open('Please fill out all required fields correctly.', 'Close', { duration: 5000 });
    }
  }
}
