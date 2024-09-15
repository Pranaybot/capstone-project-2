import { Injectable } from '@angular/core';
import { UserService } from '../../services/forms/user.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SignupHandler {

  constructor(
    private userService: UserService,
  ) {}

  handleSignup(signupForm: FormGroup): void {
    const signupData = {
      firstName: signupForm.get('firstName')?.value,
      lastName: signupForm.get('lastName')?.value,
      username: signupForm.get('username')?.value,
      pwd: signupForm.get('pwd')?.value
    };

    this.userService.signup(signupData);
  }
}
