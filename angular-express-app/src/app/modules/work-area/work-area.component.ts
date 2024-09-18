
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { DeleteAccountHandler } from '../../shared/handlers/delete-account-handler';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/settings/theme.service';
import { AuthService } from '@auth0/auth0-angular';
import { LoadingComponent } from '../auth/loading/loading.component;

@Component({
  selector: 'app-work-area',
  standalone: true,
  imports: [
    SideNavigationComponent,
    WorkspaceComponent,
    LoadingComponent,
    CommonModule
  ],
  templateUrl: './work-area.component.html',
  styleUrls: ['./work-area.component.scss']
})
export class WorkAreaComponent implements AfterViewInit{
  isSettingsModalOpen = false;
  isUserModalOpen = false;
  colors = ['#bb86fc', '#ff8a5c', '#a0e4f2', '#f5f5f5', '#ffcf6c'];
  currentTheme: string = 'light';

  @ViewChild(WorkspaceComponent) workspaceComponent!: WorkspaceComponent;

  constructor(
    private themeService: ThemeService, 
    private deleteAccountHandler: DeleteAccountHandler,
    public auth: AuthService
  ) { }

  ngOnInit() {
    // Load saved background color and theme
    const savedColor = this.themeService.getSavedBackgroundColor();
    if (savedColor && this.workspaceComponent) {
      this.workspaceComponent.changeBackgroundColor(savedColor);
    }

    const savedTheme = this.themeService.getSavedTheme();
    if (savedTheme) {
      this.currentTheme = savedTheme;
      this.themeService.applyTheme(savedTheme);
    }
  }

  ngAfterViewInit() {
    // Retrieve the stored background color and apply it
    const savedColor = this.themeService.getSavedBackgroundColor();
    if (savedColor) {
      this.workspaceComponent.changeBackgroundColor(savedColor);
    }
  }

  openUserModal() {
    this.isUserModalOpen = true;
  }

  closeUserModal() {
    this.isUserModalOpen = false;
  }

  deleteAccount() {
    if (confirm("Do you want to delete your account?")) {
      this.deleteAccountHandler.handleDelete();
    } 
  }

  openSettingsModal() {
    this.isSettingsModalOpen = true;
  }

  closeSettingsModal() {
    this.isSettingsModalOpen = false;
  }

  changeBackgroundColor(color: string) {
    if (this.workspaceComponent) {
      this.workspaceComponent.changeBackgroundColor(color);
      this.themeService.applyBackgroundColor(color);
      this.closeSettingsModal();
    } else {
      console.error('WorkspaceComponent is not available.');
    }
  }

  changeTheme(theme: string) {
    this.currentTheme = theme;
    this.themeService.applyTheme(theme);
  }

}
