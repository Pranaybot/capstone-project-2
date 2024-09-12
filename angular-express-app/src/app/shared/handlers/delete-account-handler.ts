import { Injectable } from '@angular/core';
import { UserService } from '../../services/forms/user.service';
import { AuthHandlerService } from './auth-handler';
import { ThemeService } from '../../services/settings/theme.service';

@Injectable({
  providedIn: 'root'
})
export class DeleteAccountHandler {

  constructor(
    private userService: UserService,
    private authHandlerService: AuthHandlerService,
    public themeService: ThemeService
  ) {}

  handleDelete(): void {
    this.userService.delete_account().subscribe({
      next: () => {
        this.authHandlerService.handleDeleteAccountSuccess();

        // Set the subjects to reflect the logged-out state
        this.themseService.setLoggedInState(false); // Update login status
        this.themeService.setHomeState(true);     // Navigate to home
        this.themeService.deleteUserId('userId'); // Remove user ID from cookie on logout
      },
      error: (errorResponse: any) => {
        this.authHandlerService.handleAuthError(errorResponse);
      }
    });
  }
}
