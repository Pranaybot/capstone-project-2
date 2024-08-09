import { Component, OnInit } from '@angular/core';
import { SignupHandler } from '../../../../shared/handlers/signup-handler';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SignupFormService } from '../../../../services/signup-form.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {
  
  signupForm!: FormGroup;

  constructor(
    private signupHandler: SignupHandler,
    private signupFormService: SignupFormService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
    
  ngOnInit(): void {
    this.signupForm = this.signupFormService.createSignupForm();
  }
  
  signup() {
    console.log(this.signupForm);
    if (this.signupForm.valid) {
      this.signupHandler.handleSignup(this.signupForm).subscribe({
        next: () => {
          // Handle successful signup
          this.router.navigate(['/work_area'])
        },
        error: (errorResponse) => {
          this.snackBar.open(errorResponse.error.message, 'Close', { duration: 5000 });
        }
      });
    } else {
      this.signupForm.markAllAsTouched();
      this.snackBar.open('Please fill out all required fields correctly.', 'Close', { duration: 5000 });
    }
  }
}
