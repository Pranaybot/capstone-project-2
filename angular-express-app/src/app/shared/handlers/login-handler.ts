import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginHandler {
  constructor(private userService: UserService) {}

  handleLogin(loginForm: FormGroup): Observable<any> {
    const loginData = {
      username: signupForm.get('username')?.value,
      pwd: signupForm.get('pwd')?.value
    };
    return this.userService.login(loginData);
  }
}
