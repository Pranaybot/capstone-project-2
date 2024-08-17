import { Component, ViewChild, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { CommonModule } from '@angular/common';
import { CookieService } from "ngx-cookie-service"; // Use a cookie service library

@Component({
  selector: 'app-work-area',
  standalone: true,
  imports: [
    SideNavigationComponent,
    WorkspaceComponent,
    CommonModule
  ],
  templateUrl: './work-area.component.html',
  styleUrls: ['./work-area.component.scss']
})
export class WorkAreaComponent implements AfterViewInit{
  isSettingsModalOpen = false;
  colors = ['#bb86fc', '#ff8a5c', '#a0e4f2', '#f5f5f5', '#ffcf6c'];
  currentTheme: string = 'light';

  @ViewChild(WorkspaceComponent) workspaceComponent!: WorkspaceComponent;

  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cookieService: CookieService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      // Load saved background color and theme
      const savedColor = this.cookieService.get('workspaceBackgroundColor');
      if (savedColor && this.workspaceComponent) {
        this.workspaceComponent.changeBackgroundColor(savedColor);
      }

      const savedTheme = this.cookieService.get('workspaceTheme');
      if (savedTheme) {
        this.currentTheme = savedTheme;
        this.applyTheme(savedTheme);
      }
    }
  }

  ngAfterViewInit() {
    // Retrieve the stored background color and apply it
    const savedColor = this.cookieService.get('workspaceBackgroundColor');
    if (savedColor) {
      this.workspaceComponent.changeBackgroundColor(savedColor);
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
      // Save the color to localStorage
      if (this.isBrowser) {
        this.cookieService.set('workspaceBackgroundColor', color);
      }
      this.closeSettingsModal();
    } else {
      console.error('WorkspaceComponent is not available.');
    }
  }

  changeTheme(theme: string) {
    this.currentTheme = theme;
    this.applyTheme(theme);
    if (this.isBrowser) {
      this.cookieService.set('workspaceTheme', theme);
    }
  }

  private applyTheme(theme: string) {
    document.body.setAttribute('data-theme', theme);
  }
}