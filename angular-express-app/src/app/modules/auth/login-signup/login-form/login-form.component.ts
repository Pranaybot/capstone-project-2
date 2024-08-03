import { Component, OnInit } from '@angular/core';
import { LoginHandler } from '../../../../shared/handlers/login-handler';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginFormService } from '../../../../services/login-form.service';

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
  
  loginForm!: FormGroup;

  constructor(
    private loginHandler: LoginHandler,
    private loginFormService: LoginFormService) {}
  
  ngOnInit(): void {
    
    this.loginForm = 
      this.loginFormService.createLoginForm();
    
  }

  login() {
    
    if (this.loginForm.valid) {
      this.loginHandler.handleLogin(this.loginForm); // Delegate login handling to LoginHandler
    } 

  }
  
}

