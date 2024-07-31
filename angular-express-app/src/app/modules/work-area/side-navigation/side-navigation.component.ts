import { Component } from '@angular/core';
import { LogoComponent } from './logo/logo.component';
import { NavItemComponent } from './nav-item/nav-item.component';
import { ProfileComponent } from './profile/profile.component';

@Component({
  selector: 'app-side-navigation',
  standalone: true,
  imports: [
    LogoComponent,
    NavItemComponent,
    ProfileComponent
  ],
  templateUrl: './side-navigation.component.html',
  styleUrl: './side-navigation.component.scss'
})
export class SideNavigationComponent {

  ngOnInit() {
    const sidebar = document.querySelector('.sidebar');
    const closeBtn = document.querySelector('#btn');
    const searchBtn = document.querySelector('.bx-search');

    closeBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      this.menuBtnChange();
    });

    searchBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      this.menuBtnChange();
    });
  }

  menuBtnChange() {
    const sidebar = document.querySelector('.sidebar');
    const closeBtn = document.querySelector('#btn');

    if (sidebar.classList.contains('open')) {
      closeBtn.classList.replace('bx-menu', 'bx-menu-alt-right');
    } else {
      closeBtn.classList.replace('bx-menu-alt-right', 'bx-menu');
    }
  }
  
}
