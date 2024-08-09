import { Injectable } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupHandler {
  constructor(private userService: UserService) {}

  handleSignup(signupForm: FormGroup): Observable<any> {
    const signupData = {
      firstName: signupForm.get('firstName')?.value,
      lastName: signupForm.get('lastName')?.value,
      username: signupForm.get('username')?.value,
      pwd: signupForm.get('pwd')?.value
    };
    return this.userService.signup(signupData);
  }
}
