import { Component } from '@angular/core';
import { SignupHandler } from '../../../../shared/handlers/signup-handler';  // Import the SignupHandler class

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.scss'
})
export class SignupFormComponent {
  
   signupData = {
    firstname: '',
    lastname: '',
    username: '',
    pwd: ''
  };

  constructor(
    private router: Router,
    private userService: UserService,
    private signupHandler: SignupHandler // Inject SignupHandler
  ) {}

  signup() {
    this.signupHandler.handleSignup(this.signupData); // Delegate signup handling to SignupHandler
  }

}

