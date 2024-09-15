import { Injectable } from '@angular/core';
import { UserService } from '../../services/forms/user.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LoginHandler {

  constructor(
    private userService: UserService,
  ) {}

  handleLogin(loginForm: FormGroup): void {
    const loginData = {
      username: loginForm.get('username')?.value,
      pwd: loginForm.get('pwd')?.value
    };

    this.userService.login(loginData);
  }
}
