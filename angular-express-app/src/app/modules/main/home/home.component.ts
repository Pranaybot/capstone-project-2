import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BaseComponent } from "../../layout/base/base.component";
import { ThemeService } from '../../../services/settings/theme.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    BaseComponent,
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  currentTheme: string = 'light';

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    const savedTheme = this.themeService.getSavedTheme();
    if (savedTheme) {
      this.currentTheme = savedTheme;
      this.themeService.applyTheme(savedTheme);
    }
  }

  changeTheme(theme: string) {
    this.currentTheme = theme;
    this.themeService.applyTheme(theme);
  }
}