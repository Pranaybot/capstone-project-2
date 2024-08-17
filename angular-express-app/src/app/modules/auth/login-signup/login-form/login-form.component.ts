import { Component, OnInit } from '@angular/core';
import { LoginHandler } from '../../../../shared/handlers/login-handler';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginFormService } from '../../../../services/login-form.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.loginFormService.createLoginForm();
  }

  login() {
    if (this.loginForm.valid) {
      this.loginHandler.handleLogin(this.loginForm);
    } else {
      this.loginForm.markAllAsTouched();
      // Show validation error message
    }
  }

  onForgot() {
    this.router.navigate(['/reset_password']);
  }
}
