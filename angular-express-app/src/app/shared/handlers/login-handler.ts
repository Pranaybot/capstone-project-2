import { Injectable } from '@angular/core';
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
      username: loginForm.get('username')?.value,
      pwd: loginForm.get('pwd')?.value
    };
    return this.userService.login(loginData);
  }
}
