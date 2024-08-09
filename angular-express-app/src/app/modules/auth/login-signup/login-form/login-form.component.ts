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
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  private handleError(error: any) {
    const errorMessage = error?.error?.message || 'An unexpected error occured. Please try again later.';
    this.snackBar.open(errorMessage, 'Close', { duration: 3000});
  }
  
  ngOnInit(): void {
    this.loginForm = this.loginFormService.createLoginForm();
  }

  login() {
    if (this.loginForm.valid) {
      this.loginHandler.handleLogin(this.loginForm).subscribe({
        next: () => {
          // Handle successful login
          this.router.navigate(['/work_area'])
        },
        error: (errorResponse) => {
          this.handleError(errorResponse);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
      this.snackBar.open('Please fill out all required fields correctly.', 'Close', { duration: 5000 });
    }
  }
}
