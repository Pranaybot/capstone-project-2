import { Injectable } from '@angular/core';
import { UserService } from '../../services/forms/user.service';
import { AuthHandlerService } from './auth-handler';

@Injectable({
  providedIn: 'root'
})
export class DeleteAccountHandler {

  constructor(
    private userService: UserService,
    private authHandlerService: AuthHandlerService
  ) {}

  handleDelete(): void {
    this.userService.delete_account().subscribe({
      next: () => {
        this.authHandlerService.handleDeleteAccountSuccess();
      },
      error: (errorResponse: any) => {
        this.authHandlerService.handleAuthError(errorResponse);
      }
    });
  }
}
