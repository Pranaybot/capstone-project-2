//import { Component, OnInit } from '@angular/core';
// import { SignupHandler } from '../../../../shared/handlers/signup-handler';  
import { Component} from '@angular/core';
//import { ReactiveFormsModule } from '@angular/forms';
//import { LoginFormService } from '../../../../services/login-form.service';


@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [
    //ReactiveFormsModule
  ],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.scss'
})
export class SignupFormComponent {
  /*
  signupForm: FormGroup;

  constructor(
    private signupHandler: SignupHandler) {}
    // private signupFormService: SignupFormService)
    
  
  ngOnInit(): void {
    
    this.signupForm = 
      this.signupFormService.createSignupForm();
    
  }
  */
  
  signup() {
    /*
    if (this.signupForm.valid) {
      this.signupHandler.handleSignup(this.signupForm); // Delegate signup handling to SignupHandler
    }
    */
    
    console.log("success");
    
  }
    

}

