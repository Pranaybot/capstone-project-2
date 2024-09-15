import { Injectable } from '@angular/core';
import { UserService } from '../../services/forms/user.service';
import { ThemeService } from '../../services/settings/theme.service';

@Injectable({
  providedIn: 'root'
})
export class DeleteAccountHandler {

  constructor(
    private userService: UserService,
    public themeService: ThemeService
  ) {}

  handleDelete() {
    this.userService.delete_account();
  }
}
