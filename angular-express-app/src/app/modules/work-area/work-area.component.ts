import { Component, ViewChild } from '@angular/core';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { SettingsModalComponent } from './settings-modal/settings-modal.component';
import { UserModalComponent } from './user-modal/user-modal.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-work-area',
  standalone: true,
  imports: [
    SideNavigationComponent,
    WorkspaceComponent,
    SettingsModalComponent,
    UserModalComponent,
    ConfirmationModalComponent
  ],
  templateUrl: './work-area.component.html',
  styleUrls: ['./work-area.component.scss']
})
export class WorkAreaComponent {
  isSettingsModalOpen = false;
  isUserModalOpen = false;
  // Inside WorkAreaComponent Class
  backgroundColor: string = '#f1f2f6'; // Default background color

  @ViewChild(WorkspaceComponent) workspaceComponent!: WorkspaceComponent;

  openSettingsModal() {
    this.isSettingsModalOpen = true;
  }

  closeSettingsModal() {
    this.isSettingsModalOpen = false;
  }

  openUserModal() {
    this.isUserModalOpen = true;
  }

  closeUserModal() {
    this.isUserModalOpen = false;
  }

  // Listen for background color changes and update workspace
  onBackgroundColorChange(color: string) {
    this.backgroundColor = color;
    if(this.workspaceComponent) {
      this.workspaceComponent.changeBackgroundColor(color);
    }
  }

}
